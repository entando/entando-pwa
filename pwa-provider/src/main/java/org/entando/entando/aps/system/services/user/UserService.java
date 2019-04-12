package org.entando.entando.aps.system.services.user;

import com.agiletec.aps.system.services.authorization.IAuthorizationManager;
import com.agiletec.aps.system.services.user.IAuthenticationProviderManager;
import org.entando.entando.aps.system.exception.ResourceNotFoundException;
import org.entando.entando.aps.system.services.user.model.UserAuthorityDto;
import org.entando.entando.aps.system.services.user.model.UserDto;
import org.entando.entando.plugins.keycloak.aps.KeycloakConfiguration;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.entando.web.user.model.UserAuthoritiesRequest;
import org.entando.entando.web.user.model.UserAuthority;
import org.entando.entando.web.user.model.UserPasswordRequest;
import org.entando.entando.web.user.model.UserRequest;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;

public class UserService implements IUserService {

    private static final String ERRCODE_USER_NOT_FOUND = "1";

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final RealmResource realmResource;
    private final String clientId;

    @Autowired
    public UserService(final KeycloakConfiguration configuration) {
        final Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(configuration.getAuthUrl())
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .realm(configuration.getRealm())
                .clientId(configuration.getClientId())
                .clientSecret(configuration.getClientSecret())
                .build();
        this.realmResource = keycloak.realm(configuration.getRealm());
        this.clientId = configuration.getClientId();
    }

    @Override
    public List<UserAuthorityDto> getUserAuthorities(final String username) {
        try {
            final UserRepresentation user = getUserRepresentation(username);
            final String group = Optional.ofNullable(user.getGroups())
                    .map(list -> list.stream().findFirst().orElse(null))
                    .orElse(null);
            final List<String> roles = user.getClientRoles().get(clientId);
            return roles.stream().map(role -> new UserAuthorityDto(group, role))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error while trying to execute getUserAuthorities", e);
            throw e;
        }
    }

    @Override
    public List<UserAuthorityDto> addUserAuthorities(final String username, final UserAuthoritiesRequest request) {
        final ClientRepresentation client = realmResource.clients().findByClientId(clientId)
                .stream().findFirst().orElseThrow(RuntimeException::new);
        final UserRepresentation user = getUserRepresentation(username);
        final List<String> roles = user.getClientRoles().get(clientId);
        final List<RoleRepresentation> newRoles = request.stream()
                .map(UserAuthority::getRole)
                .filter(role -> !roles.contains(role))
                .map(realmResource.clients().get(clientId).roles()::get)
                .map(RoleResource::toRepresentation)
                .collect(Collectors.toList());

        realmResource.users().get(user.getId()).roles().clientLevel(client.getId()).add(newRoles);
        return getUserAuthorities(username);
    }

    @Override
    public List<UserAuthorityDto> updateUserAuthorities(final String username, final UserAuthoritiesRequest request) {
        deleteUserAuthorities(username);
        return addUserAuthorities(username, request);
    }

    @Override
    public void deleteUserAuthorities(final String username) {
        final UserRepresentation user = getUserRepresentation(username);
        final ClientRepresentation client = realmResource.clients().findByClientId(clientId)
                .stream().findFirst().orElseThrow(RuntimeException::new);
        final List<String> roles = user.getClientRoles().get(clientId);
        final List<RoleRepresentation> toRemoveRoles = roles.stream()
                .map(realmResource.clients().get(clientId).roles()::get)
                .map(RoleResource::toRepresentation)
                .collect(Collectors.toList());
        realmResource.users().get(user.getId()).roles().clientLevel(client.getId()).remove(toRemoveRoles);
    }

    @Override
    public PagedMetadata<UserDto> getUsers(final RestListRequest requestList, final String withProfile) {
       try {
           log.info("Listing Users");
           final int offset = (requestList.getPage() - 1) * requestList.getPageSize();
           final Integer count = realmResource.users().count();
           final List<UserDto> list = realmResource.users().list(offset, requestList.getPageSize()).stream()
                   .map(KeycloakUserMapper::convert)
                   .collect(Collectors.toList());
           return new PagedMetadata<>(requestList, list, count);
       } catch (Exception e) {
           log.error("Error while trying to execute getUsers", e);
           throw e;
       }
    }

    @Override
    public UserDto getUser(final String username) {
        return KeycloakUserMapper.convert(getUserRepresentation(username));
    }

    private UserRepresentation getUserRepresentation(final String username) {
        return realmResource.users().search(username).stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(ERRCODE_USER_NOT_FOUND, "user", username));
    }

    @Override
    public UserDto updateUser(final UserRequest userRequest) {
        final UserRepresentation user = getUserRepresentation(userRequest.getUsername());
        ofNullable(userRequest.getStatus()).map(IUserService.STATUS_ACTIVE::equals).ifPresent(user::setEnabled);
        ofNullable(userRequest.getPassword())
                .ifPresent(password -> updateUserPassword(user.getId(), password, true));
        realmResource.users().get(user.getId()).update(user);
        return KeycloakUserMapper.convert(user);
    }

    @Override
    public UserDto addUser(final UserRequest userRequest) {
        try {
            UserRepresentation user = new UserRepresentation();
            user.setUsername(userRequest.getUsername());
            user.setEnabled(IUserService.STATUS_ACTIVE.equals(userRequest.getStatus()));

            final Response response = realmResource.users().create(user);
            log.info("Response Status {}", response.getStatus());
            final String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            updateUserPassword(userId, userRequest.getPassword(), true);
            return KeycloakUserMapper.convert(user);
        } catch (Exception e) {
            log.error("Error while trying to execute addUser", e);
            throw e;
        }
    }

    @Override
    public void removeUser(final String username) {
        realmResource.users().get(getUserRepresentation(username).getId()).remove();
    }

    @Override
    public UserDto updateUserPassword(final UserPasswordRequest passwordRequest) {
        final UserRepresentation user = getUserRepresentation(passwordRequest.getUsername());
        // TODO validate user current password
        updateUserPassword(user.getId(), passwordRequest.getNewPassword(), false);
        return KeycloakUserMapper.convert(user);
    }

    private void updateUserPassword(final String userId, final String password, final boolean temporary) {
        final CredentialRepresentation credentials = new CredentialRepresentation();
        credentials.setValue(password);
        credentials.setTemporary(temporary);
        credentials.setType("password");
        realmResource.users().get(userId).resetPassword(credentials);
    }

    public void setAuthorizationManager(IAuthorizationManager authorizationManager) {}
    public void setAuthenticationProvider(IAuthenticationProviderManager authenticationProvider) {}

}

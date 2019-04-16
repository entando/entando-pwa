package org.entando.entando.aps.system.services.role;

import com.agiletec.aps.system.services.authorization.IAuthorizationService;
import com.agiletec.aps.system.services.role.IRoleManager;
import com.agiletec.aps.system.services.role.Permission;
import org.entando.entando.aps.system.exception.ResourceNotFoundException;
import org.entando.entando.aps.system.services.IDtoBuilder;
import org.entando.entando.aps.system.services.keycloak.KeycloakConfiguration;
import org.entando.entando.aps.system.services.keycloak.KeycloakMapper;
import org.entando.entando.aps.system.services.keycloak.KeycloakService;
import org.entando.entando.aps.system.services.role.model.PermissionDto;
import org.entando.entando.aps.system.services.role.model.RoleDto;
import org.entando.entando.aps.system.services.user.model.UserDto;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.entando.web.role.model.RoleRequest;
import org.keycloak.admin.client.resource.GroupResource;
import org.keycloak.admin.client.resource.RoleScopeResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;

@Service
public class RoleService implements IRoleService {

    private static final Logger log = LoggerFactory.getLogger(RoleService.class);

    private final KeycloakService keycloakService;
    private final KeycloakConfiguration keycloakConfiguration;

    @Autowired
    public RoleService(final KeycloakService keycloakService, final KeycloakConfiguration keycloakConfiguration) {
        this.keycloakService = keycloakService;
        this.keycloakConfiguration = keycloakConfiguration;
    }

    @Override
    public PagedMetadata<RoleDto> getRoles(final RestListRequest requestList) {
        try {
            log.info("Listing Roles");
            final int offset = (requestList.getPage() - 1) * requestList.getPageSize();
            final List<RoleDto> list = keycloakService.getRealmResource().groups().groups(offset, requestList.getPageSize()).stream()
                    .map(KeycloakMapper::convertRole)
                    .collect(Collectors.toList());
            final int count = list.size();
            return new PagedMetadata<>(requestList, list, count);
        } catch (Exception e) {
            log.error("Error while trying to execute getRoles", e);
            throw e;
        }
    }

    @Override
    public RoleDto getRole(final String roleCode) {
        final RoleDto roleDto = KeycloakMapper.convertRole(getGroupRepresentation(roleCode));
        final String clientId = getClientUuid();

        final List<RoleRepresentation> allRoles = keycloakService.getRealmResource().clients().get(clientId)
                .roles().list();
        final Set<String> actualRoles = keycloakService.getRealmResource().groups()
                .group(roleCode).roles().clientLevel(clientId).listAll()
                .stream().map(RoleRepresentation::getName).collect(Collectors.toSet());
        final Map<String, Boolean> permissions = new HashMap<>(allRoles.size());
        allRoles.stream().map(RoleRepresentation::getName)
                .forEach(role -> permissions.put(role, actualRoles.contains(role)));

        roleDto.setPermissions(permissions);
        return roleDto;
    }

    @Override
    public PagedMetadata<UserDto> getRoleReferences(final String roleCode, final RestListRequest requestList) {
        final int offset = (requestList.getPage() - 1) * requestList.getPageSize();
        final List<UserDto> list = keycloakService.getRealmResource().groups().group(roleCode)
                .members(offset, requestList.getPageSize())
                .stream()
                .map(KeycloakMapper::convertUser)
                .collect(Collectors.toList());
        final int count = list.size();
        return new PagedMetadata<>(requestList, list, count);
    }

    @Override
    public PagedMetadata<PermissionDto> getPermissions(final RestListRequest requestList) {
        // will this be necessary?
        return new PagedMetadata<>(requestList, Collections.emptyList(), 0);
    }

    private GroupRepresentation getGroupRepresentation(final String groupCode) {
        return ofNullable(keycloakService.getRealmResource().groups().group(groupCode))
                .map(GroupResource::toRepresentation)
                .orElseThrow(() -> new ResourceNotFoundException("1", "role", groupCode));
    }

    @Override
    public RoleDto updateRole(RoleRequest request) {
        final GroupRepresentation group = getGroupRepresentation(request.getCode());
        group.setName(request.getName());
        keycloakService.getRealmResource().groups().group(request.getCode()).update(group);
        syncGroupRoles(group, request);
        return KeycloakMapper.convertRole(group);
    }

    private void syncGroupRoles(final GroupRepresentation group, final RoleRequest request) {
        final String clientId = getClientUuid();
        final RoleScopeResource roleScopeResource = keycloakService.getRealmResource().groups()
                .group(group.getId()).roles().clientLevel(clientId);

        final List<RoleRepresentation> allRoles = keycloakService.getRealmResource().clients().get(clientId)
                .roles().list();
        final List<RoleRepresentation> actualGroupRoles = roleScopeResource.listAll();

        final List<RoleRepresentation> toRemove = actualGroupRoles.stream()
                .filter(role -> Boolean.FALSE.equals(request.getPermissions().get(role.getName())))
                .collect(Collectors.toList());
        final List<RoleRepresentation> toAdd = allRoles.stream()
                .filter(role -> Boolean.TRUE.equals(request.getPermissions().get(role.getName())))
                .filter(role -> !actualGroupRoles.contains(role))
                .collect(Collectors.toList());

        roleScopeResource.add(toAdd);
        roleScopeResource.remove(toRemove);
    }

    @Override
    public RoleDto addRole(final RoleRequest request) {
        final GroupRepresentation group = new GroupRepresentation();
        group.setName(request.getName());
        final Response response = keycloakService.getRealmResource().groups().add(group);
        final String groupId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        group.setId(groupId);
        syncGroupRoles(group, request);
        return KeycloakMapper.convertRole(group);
    }

    @Override
    public void removeRole(final String roleCode) {
        getGroupRepresentation(roleCode);
        keycloakService.getRealmResource().groups().group(roleCode).remove();
    }

    private String getClientUuid() {
        return keycloakService.getRealmResource().clients().findByClientId(keycloakConfiguration.getClientId())
                .stream()
                .map(ClientRepresentation::getId)
                .findFirst().orElse(null);
    }

    public void setRoleManager(IRoleManager roleManager) {}
    public void setDtoBuilder(RoleDtoBuilder dtoBuilder) {}
    public void setAuthorizationService(IAuthorizationService authorizationService) {}
    public void setPermissionDtoBuilder(IDtoBuilder<Permission, PermissionDto> permissionDtoBuilder) {}
}

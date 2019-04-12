package org.entando.entando.aps.system.services.user;

import org.entando.entando.aps.system.services.user.model.UserDto;
import org.keycloak.representations.idm.UserRepresentation;

public class KeycloakUserMapper {

    public static UserDto convert(final UserRepresentation userRepresentation) {
        return new UserDto(userRepresentation);
    }

}

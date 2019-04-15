package org.entando.entando.aps.system.services.user;

import org.entando.entando.aps.system.services.group.model.GroupDto;
import org.entando.entando.aps.system.services.user.model.UserDto;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

public class KeycloakMapper {

    public static UserDto convertUser(final UserRepresentation userRepresentation) {
        return new UserDto(userRepresentation);
    }

    public static GroupDto convertGroup(final GroupRepresentation groupRepresentation) {
        final GroupDto group = new GroupDto();
        group.setCode(groupRepresentation.getId());
        group.setName(groupRepresentation.getName());
        return group;
    }

}

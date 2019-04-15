package org.entando.entando.aps.system.services.user;

import org.entando.entando.aps.system.exception.ResourceNotFoundException;
import org.entando.entando.aps.system.services.group.IGroupService;
import org.entando.entando.aps.system.services.group.model.GroupDto;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.entando.web.group.model.GroupRequest;
import org.entando.entando.web.group.validator.GroupValidator;
import org.keycloak.admin.client.resource.GroupResource;
import org.keycloak.representations.idm.GroupRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;

@Service
public class GroupService implements IGroupService {

    private static final Logger log = LoggerFactory.getLogger(GroupService.class);

    private final KeycloakService keycloakService;

    @Autowired
    public GroupService(final KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    @Override
    public PagedMetadata<GroupDto> getGroups(final RestListRequest requestList) {
        try {
            log.info("Listing Groups");
            final int offset = (requestList.getPage() - 1) * requestList.getPageSize();
            final Integer count = keycloakService.getRealmResource().users().count();
            final List<GroupDto> list = keycloakService.getRealmResource().groups().groups(offset, requestList.getPageSize()).stream()
                    .map(KeycloakMapper::convertGroup)
                    .collect(Collectors.toList());
            return new PagedMetadata<>(requestList, list, count);
        } catch (Exception e) {
            log.error("Error while trying to execute getGroups", e);
            throw e;
        }
    }

    @Override
    public GroupDto getGroup(final String groupCode) {
        return KeycloakMapper.convertGroup(getGroupRepresentation(groupCode));
    }

    private GroupRepresentation getGroupRepresentation(final String groupCode) {
        return ofNullable(keycloakService.getRealmResource().groups().group(groupCode))
                .map(GroupResource::toRepresentation)
                .orElseThrow(() -> new ResourceNotFoundException(GroupValidator.ERRCODE_GROUP_NOT_FOUND, "group", groupCode));
    }

    @Override
    public GroupDto updateGroup(final String groupCode, final String descr) {
        final GroupRepresentation group = getGroupRepresentation(groupCode);
        group.setName(descr);
        keycloakService.getRealmResource().groups().group(groupCode).update(group);
        return KeycloakMapper.convertGroup(group);
    }

    @Override
    public GroupDto addGroup(final GroupRequest groupRequest) {
        final GroupRepresentation group = new GroupRepresentation();
        group.setName(groupRequest.getName());
        keycloakService.getRealmResource().groups().add(group);
        return KeycloakMapper.convertGroup(group);
    }

    @Override
    public void removeGroup(final String groupCode) {
        getGroupRepresentation(groupCode);
        keycloakService.getRealmResource().groups().group(groupCode).remove();
    }

    @Override
    public PagedMetadata<?> getGroupReferences(final String groupCode,
                                               final String managerName,
                                               final RestListRequest restListRequest) {
        return null;
    }
}

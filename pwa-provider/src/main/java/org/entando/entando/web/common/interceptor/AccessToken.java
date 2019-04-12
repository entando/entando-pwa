package org.entando.entando.web.common.interceptor;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

import static java.util.Optional.ofNullable;

public class AccessToken {

    private String name;
    private String username;
    private String email;

    private boolean active;

    @JsonProperty("resource_access")
    private Map<String, ResourceAccess> resourceAccess;

    public boolean hasResourceAccess(final String clientId, final String role) {
        return ofNullable(resourceAccess.get(clientId))
                .map(ResourceAccess::getRoles)
                .map(roles -> roles.contains(role))
                .orElse(false);
    }

    @Override
    public String toString() {
        return String.format("{name=%s, username=%s, email=%s, active=%s}", name, username, email, active);
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(final boolean active) {
        this.active = active;
    }

    public Map<String, ResourceAccess> getResourceAccess() {
        return resourceAccess;
    }

    public void setResourceAccess(final Map<String, ResourceAccess> resourceAccess) {
        this.resourceAccess = resourceAccess;
    }

    public static class ResourceAccess {
        private List<String> roles;

        public List<String> getRoles() {
            return roles;
        }

        public void setRoles(final List<String> roles) {
            this.roles = roles;
        }
    }

}

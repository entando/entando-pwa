package org.entando.pwa.system.services.notification.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author eu
 */
public class PwaNotificationDto extends NotificationDto {

    private String title;
    private String body;
    private Map<String, String> properties = new HashMap<>();
    private List<String> categories = new ArrayList<>();
    private boolean requiresAuth;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public boolean isRequiresAuth() {
        return requiresAuth;
    }

    public void setRequiresAuth(boolean requiresAuth) {
        this.requiresAuth = requiresAuth;
    }

}

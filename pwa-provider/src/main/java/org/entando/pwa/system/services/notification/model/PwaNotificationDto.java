package org.entando.pwa.system.services.notification.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

/**
 *
 * @author eu
 */
public class PwaNotificationDto extends NotificationDto {

    private String title;
    private String body;

    @JsonInclude(value = JsonInclude.Include.NON_EMPTY)
    private List<String> categories;

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

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

}

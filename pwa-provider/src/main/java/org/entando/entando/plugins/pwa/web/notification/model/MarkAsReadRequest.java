/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.entando.plugins.pwa.web.notification.model;

import java.util.List;

public class MarkAsReadRequest {

    private List<String> objectIds;

    public List<String> getObjectIds() {
        return objectIds;
    }

    public void setObjectIds(List<String> objectId) {
        this.objectIds = objectId;
    }

}

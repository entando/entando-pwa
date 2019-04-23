/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.api;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSeeAlso;

import org.entando.entando.aps.system.services.api.model.AbstractApiResponseResult;
import org.entando.entando.aps.system.services.api.model.ListResponse;

@XmlSeeAlso({JAXBNotification.class})
public class NotificationListResponseResult extends AbstractApiResponseResult {

    @XmlElement(name = "items", required = false)
    public ListResponse<JAXBNotification> getResult() {
        if (this.getMainResult() instanceof Collection) {
            List<JAXBNotification> notifications = new ArrayList<JAXBNotification>();
            notifications.addAll((Collection<JAXBNotification>) this.getMainResult());
            ListResponse<JAXBNotification> entity = new ListResponse<JAXBNotification>(notifications) {
            };
            return entity;
        }
        return null;
    }

}

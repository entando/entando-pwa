/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.api;

import javax.xml.bind.annotation.XmlElement;

import org.entando.entando.aps.system.services.api.model.AbstractApiResponseResult;

public class NotificationResponseResult extends AbstractApiResponseResult {

    @Override
    @XmlElement(name = "notification", required = false)
    public JAXBNotification getResult() {
        return (JAXBNotification) this.getMainResult();
    }

}

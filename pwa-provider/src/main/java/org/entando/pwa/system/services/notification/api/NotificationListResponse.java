/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.api;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.entando.entando.aps.system.services.api.model.AbstractApiResponse;
import org.entando.entando.aps.system.services.api.model.AbstractApiResponseResult;

@XmlRootElement(name = "response")
public class NotificationListResponse extends AbstractApiResponse {

    @Override
    @XmlElement(name = "result", required = true)
    public NotificationListResponseResult getResult() {
        return (NotificationListResponseResult) super.getResult();
    }

    @Override
    protected AbstractApiResponseResult createResponseResultInstance() {
        return new NotificationListResponseResult();
    }

}

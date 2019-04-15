/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.pwa.system.services.notification.model.NotificationDto;
import org.entando.pwa.web.notification.model.NotificationRequest;

public interface INotificationService {

    public String BEAN_NAME = "pwanotificationNotificationService";

    public PagedMetadata<NotificationDto> getNotifications(RestListRequest requestList);

    public NotificationDto updateNotification(NotificationRequest notificationRequest);

    public NotificationDto addNotification(NotificationRequest notificationRequest);

    public void removeNotification(int id);

    public NotificationDto getNotification(int id);

}

/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import org.entando.entando.plugins.pwa.web.notification.model.MarkAsReadRequest;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.pwa.system.services.notification.model.NotificationDto;
import org.entando.entando.plugins.pwa.web.notification.model.NotificationRequest;
import org.entando.pwa.system.services.notification.model.PwaNotificationDto;
import org.springframework.validation.BindingResult;

public interface INotificationService {

    public String BEAN_NAME = "pwanotificationNotificationService";

    public PagedMetadata<NotificationDto> getNotifications(RestListRequest requestList);

    public PagedMetadata<PwaNotificationDto> getNotificationsByUser(RestListRequest requestList, String username);

    //public NotificationDto updateNotification(NotificationRequest notificationRequest);
    public NotificationDto addNotification(NotificationRequest notificationRequest);

    public void removeNotification(int id);

    public NotificationDto getNotification(int id);

    public void markAsRead(MarkAsReadRequest request, String type, String username, BindingResult bindingResult);

}

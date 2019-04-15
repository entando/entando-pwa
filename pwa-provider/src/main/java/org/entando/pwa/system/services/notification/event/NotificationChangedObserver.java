/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.event;

import com.agiletec.aps.system.common.notify.ObserverService;

public interface NotificationChangedObserver extends ObserverService {

    public void updateFromNotificationChanged(NotificationChangedEvent event);

}

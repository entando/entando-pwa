/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.event;

import com.agiletec.aps.system.common.IManager;
import com.agiletec.aps.system.common.notify.ApsEvent;
import org.entando.pwa.system.services.notification.Notification;

public class NotificationChangedEvent extends ApsEvent {

    @Override
    public void notify(IManager srv) {
        ((NotificationChangedObserver) srv).updateFromNotificationChanged(this);
    }

    @Override
    public Class getObserverInterface() {
        return NotificationChangedObserver.class;
    }

    public int getOperationCode() {
        return _operationCode;
    }

    public void setOperationCode(int operationCode) {
        this._operationCode = operationCode;
    }

    public Notification getNotification() {
        return _notification;
    }

    public void setNotification(Notification notification) {
        this._notification = notification;
    }

    private Notification _notification;
    private int _operationCode;

    public static final int INSERT_OPERATION_CODE = 1;
    public static final int REMOVE_OPERATION_CODE = 2;
    public static final int UPDATE_OPERATION_CODE = 3;

}

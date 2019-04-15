/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import java.util.List;
import com.agiletec.aps.system.common.FieldSearchFilter;

public interface INotificationDAO {

    public List<Integer> searchNotifications(FieldSearchFilter[] filters);

    public Notification loadNotification(int id);

    public List<Integer> loadNotifications();

    public void removeNotification(int id);

    public void updateNotification(Notification notification);

    public void insertNotification(Notification notification);

    public int countNotifications(FieldSearchFilter[] filters);
}

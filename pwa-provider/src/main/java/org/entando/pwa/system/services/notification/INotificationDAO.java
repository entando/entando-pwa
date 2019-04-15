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

    public List<Notification> searchNotificationsByUser(FieldSearchFilter[] filters, String username);

    public Notification loadNotification(int id);

    public List<Integer> loadNotifications();

    public void removeNotification(int id);

    //public void updateNotification(Notification notification);
    public void insertNotification(Notification notification);

    public void addUserReading(String username, String objectId, String type);

    public int countNotifications(FieldSearchFilter[] filters);

}

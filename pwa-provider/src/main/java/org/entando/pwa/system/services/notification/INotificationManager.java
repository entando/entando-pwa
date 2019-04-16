/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import java.util.List;
import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.aps.system.common.model.dao.SearcherDaoPaginatedResult;
import com.agiletec.aps.system.common.FieldSearchFilter;

public interface INotificationManager {

    public static final String TYPE_CONTENT = "cms-content";

    public Notification getNotification(int id) throws ApsSystemException;

    public List<Integer> getNotifications() throws ApsSystemException;

    public List<Integer> searchNotifications(FieldSearchFilter filters[]) throws ApsSystemException;

    public List<Notification> searchNotificationsByUser(FieldSearchFilter[] filters, String username) throws ApsSystemException;

    public void addNotification(Notification notification) throws ApsSystemException;

    public void markAsRead(String username, String objectId, String type) throws ApsSystemException;

    //public void updateNotification(Notification notification) throws ApsSystemException;
    public void deleteNotification(int id) throws ApsSystemException;

    public SearcherDaoPaginatedResult<Notification> getNotifications(List<FieldSearchFilter> fieldSearchFilters) throws ApsSystemException;

    public SearcherDaoPaginatedResult<Notification> getNotifications(List<FieldSearchFilter> fieldSearchFilters, String username) throws ApsSystemException;

}

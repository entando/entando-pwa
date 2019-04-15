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

    public Notification getNotification(int id) throws ApsSystemException;

    public List<Integer> getNotifications() throws ApsSystemException;

    public List<Integer> searchNotifications(FieldSearchFilter filters[]) throws ApsSystemException;

    public void addNotification(Notification notification) throws ApsSystemException;

    //public void updateNotification(Notification notification) throws ApsSystemException;
    public void deleteNotification(int id) throws ApsSystemException;

    public SearcherDaoPaginatedResult<Notification> getNotifications(List<FieldSearchFilter> fieldSearchFilters) throws ApsSystemException;

}

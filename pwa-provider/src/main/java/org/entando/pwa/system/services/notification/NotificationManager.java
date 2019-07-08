/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import com.agiletec.aps.system.SystemConstants;
import com.agiletec.aps.system.common.AbstractService;
import com.agiletec.aps.system.common.FieldSearchFilter;
import com.agiletec.aps.system.common.model.dao.SearcherDaoPaginatedResult;
import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.aps.system.services.user.UserDetails;
import com.agiletec.plugins.jacms.aps.system.services.content.event.PublicContentChangedEvent;
import com.agiletec.plugins.jacms.aps.system.services.content.event.PublicContentChangedObserver;

import java.util.*;

import org.entando.pwa.system.services.notification.event.NotificationChangedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.entando.pwa.system.services.EntandoListUtils.subList;

public class NotificationManager extends AbstractService implements INotificationManager, PublicContentChangedObserver {

    private static final Logger logger = LoggerFactory.getLogger(NotificationManager.class);

    private INotificationDAO notificationDAO;

    @Override
    public void init() throws Exception {
        logger.debug("{} ready.", this.getClass().getName());
    }

    @Override
    public void updateFromPublicContentChanged(PublicContentChangedEvent pcce) {
        try {
            switch (pcce.getOperationCode()) {
                case PublicContentChangedEvent.INSERT_OPERATION_CODE:
                    Notification notification = new Notification();
                    notification.setType(INotificationManager.TYPE_CONTENT);
                    notification.setObjectId(pcce.getContent().getId());
                    notification.setDate(new Date());
                    this.addNotification(notification);
                    break;
                case PublicContentChangedEvent.REMOVE_OPERATION_CODE:
                    this.getNotificationDAO().removeNotification(TYPE_CONTENT, pcce.getContent().getId());
                    break;
                case PublicContentChangedEvent.UPDATE_OPERATION_CODE:
                    // nothing to do
                    break;
                default:
                    // nothing to do
                    break;
            }
        } catch (Exception e) {
            logger.error("Error notification with id '{}'", e);
        }
    }

    @Override
    public Notification getNotification(int id) throws ApsSystemException {
        Notification notification = null;
        try {
            notification = this.getNotificationDAO().loadNotification(id);
        } catch (Throwable t) {
            logger.error("Error loading notification with id '{}'", id, t);
            throw new ApsSystemException("Error loading notification with id: " + id, t);
        }
        return notification;
    }

    @Override
    public List<Integer> getNotifications() throws ApsSystemException {
        List<Integer> notifications = new ArrayList<>();
        try {
            notifications = this.getNotificationDAO().loadNotifications();
        } catch (Throwable t) {
            logger.error("Error loading Notification list", t);
            throw new ApsSystemException("Error loading Notification ", t);
        }
        return notifications;
    }

    @Override
    public List<Integer> searchNotifications(FieldSearchFilter filters[]) throws ApsSystemException {
        List<Integer> notifications = new ArrayList<>();
        try {
            notifications = this.getNotificationDAO().searchNotifications(filters);
        } catch (Throwable t) {
            logger.error("Error searching Notifications", t);
            throw new ApsSystemException("Error searching Notifications", t);
        }
        return notifications;
    }

    @Override
    public List<Notification> searchNotificationsByUser(FieldSearchFilter[] filters, UserDetails userDetails) throws ApsSystemException {
        List<Notification> notifications = new ArrayList<>();
        try {
            String username = (null != userDetails && !userDetails.getUsername().equals(SystemConstants.GUEST_USER_NAME)) ? userDetails.getUsername() : null;
            notifications = this.getNotificationDAO().searchNotificationsByUser(filters, username);
        } catch (Throwable t) {
            logger.error("Error searching Notifications", t);
            throw new ApsSystemException("Error searching Notifications", t);
        }
        return notifications;
    }

    @Override
    public void addNotification(Notification notification) throws ApsSystemException {
        try {
            this.getNotificationDAO().insertNotification(notification);
            this.notifyNotificationChangedEvent(notification, NotificationChangedEvent.INSERT_OPERATION_CODE);
        } catch (Throwable t) {
            logger.error("Error adding Notification", t);
            throw new ApsSystemException("Error adding Notification", t);
        }
    }

    @Override
    public void markAsRead(String username, String objectId, String type) throws ApsSystemException {
        try {
            this.getNotificationDAO().markAsRead(username, objectId, type);
        } catch (Throwable t) {
            logger.error("Error on markAsRead", t);
            throw new ApsSystemException("Error on markAsRead", t);
        }
    }

    @Override
    public void deleteNotification(int id) throws ApsSystemException {
        try {
            Notification notification = this.getNotification(id);
            this.getNotificationDAO().removeNotification(id);
            this.notifyNotificationChangedEvent(notification, NotificationChangedEvent.REMOVE_OPERATION_CODE);
        } catch (Throwable t) {
            logger.error("Error deleting Notification with id {}", id, t);
            throw new ApsSystemException("Error deleting Notification with id:" + id, t);
        }
    }

    private void notifyNotificationChangedEvent(Notification notification, int operationCode) {
        NotificationChangedEvent event = new NotificationChangedEvent();
        event.setNotification(notification);
        event.setOperationCode(operationCode);
        this.notifyEvent(event);
    }

    @SuppressWarnings("rawtypes")
    public SearcherDaoPaginatedResult<Notification> getNotifications(FieldSearchFilter[] filters) throws ApsSystemException {
        return this.getNotifications(filters, null);
    }

    @SuppressWarnings("rawtypes")
    public SearcherDaoPaginatedResult<Notification> getNotifications(FieldSearchFilter[] filters, UserDetails userDetails) throws ApsSystemException {
        SearcherDaoPaginatedResult<Notification> pagedResult = null;
        try {
            String username = (null != userDetails && !userDetails.getUsername().equals(SystemConstants.GUEST_USER_NAME)) ? userDetails.getUsername() : null;
            int count = this.getNotificationDAO().countNotifications(filters);
            List<Notification> notifications = this.getNotificationDAO().searchNotificationsByUser(filters, username);
//            notifications = subList(notifications, filters);
            pagedResult = new SearcherDaoPaginatedResult<>(count, notifications);
        } catch (Throwable t) {
            logger.error("Error searching notifications", t);
            throw new ApsSystemException("Error searching notifications", t);
        }
        return pagedResult;
    }

    @Override
    public SearcherDaoPaginatedResult<Notification> getNotifications(List<FieldSearchFilter> filters) throws ApsSystemException {
        return this.getNotifications(filters, null);
    }

    @Override
    public SearcherDaoPaginatedResult<Notification> getNotifications(List<FieldSearchFilter> filters, UserDetails userDetails) throws ApsSystemException {
        FieldSearchFilter[] array = null;
        if (null != filters) {
            array = filters.toArray(new FieldSearchFilter[filters.size()]);
        }
        return this.getNotifications(array, userDetails);
    }


    public void setNotificationDAO(INotificationDAO notificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    protected INotificationDAO getNotificationDAO() {
        return notificationDAO;
    }

}

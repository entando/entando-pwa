/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import com.agiletec.aps.system.common.AbstractService;
import com.agiletec.aps.system.common.FieldSearchFilter;
import com.agiletec.aps.system.common.model.dao.SearcherDaoPaginatedResult;
import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.plugins.jacms.aps.system.services.content.event.PublicContentChangedEvent;
import com.agiletec.plugins.jacms.aps.system.services.content.event.PublicContentChangedObserver;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import javax.ws.rs.core.Response;
import org.entando.entando.aps.system.services.api.IApiErrorCodes;
import org.entando.entando.aps.system.services.api.model.ApiException;
import org.entando.pwa.system.services.notification.api.JAXBNotification;
import org.entando.pwa.system.services.notification.event.NotificationChangedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NotificationManager extends AbstractService implements INotificationManager, PublicContentChangedObserver {

    private static final Logger logger = LoggerFactory.getLogger(NotificationManager.class);

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
                    notification.setObjectId(pcce.getContent().getId());
                    this.addNotification(notification);
                    break;
                case PublicContentChangedEvent.REMOVE_OPERATION_CODE:
                    // code block
                    break;
                default:
                    // code block
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
    public List<Notification> searchNotificationsByUser(FieldSearchFilter[] filters, String username) throws ApsSystemException {
        List<Notification> notifications = new ArrayList<>();
        try {
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

    /*
    @Override
    public void updateNotification(Notification notification) throws ApsSystemException {
        try {
            this.getNotificationDAO().updateNotification(notification);
            this.notifyNotificationChangedEvent(notification, NotificationChangedEvent.UPDATE_OPERATION_CODE);
        } catch (Throwable t) {
            logger.error("Error updating Notification", t);
            throw new ApsSystemException("Error updating Notification " + notification, t);
        }
    }
     */
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

    /**
     * GET http://localhost:8080/<portal>/api/rs/en/notifications?
     *
     * @param properties
     * @return
     * @throws Throwable
     */
    public List<JAXBNotification> getNotificationsForApi(Properties properties) throws Throwable {
        List<JAXBNotification> list = new ArrayList<>();
        List<Integer> idList = this.getNotifications();
        if (null != idList && !idList.isEmpty()) {
            Iterator<Integer> notificationIterator = idList.iterator();
            while (notificationIterator.hasNext()) {
                int currentid = notificationIterator.next();
                Notification notification = this.getNotification(currentid);
                if (null != notification) {
                    list.add(new JAXBNotification(notification));
                }
            }
        }
        return list;
    }

    /**
     * GET http://localhost:8080/<portal>/api/rs/en/notification?id=1
     *
     * @param properties
     * @return
     * @throws Throwable
     */
    public JAXBNotification getNotificationForApi(Properties properties) throws Throwable {
        String idString = properties.getProperty("id");
        int id = 0;
        JAXBNotification jaxbNotification = null;
        try {
            id = Integer.parseInt(idString);
        } catch (NumberFormatException e) {
            throw new ApiException(IApiErrorCodes.API_PARAMETER_VALIDATION_ERROR, "Invalid Integer format for 'id' parameter - '" + idString + "'", Response.Status.CONFLICT);
        }
        Notification notification = this.getNotification(id);
        if (null == notification) {
            throw new ApiException(IApiErrorCodes.API_VALIDATION_ERROR, "Notification with id '" + idString + "' does not exist", Response.Status.CONFLICT);
        }
        jaxbNotification = new JAXBNotification(notification);
        return jaxbNotification;
    }

    /**
     * POST Content-Type: application/xml
     * http://localhost:8080/<portal>/api/rs/en/notification
     *
     * @param jaxbNotification
     * @throws ApiException
     * @throws ApsSystemException
     */
    public void addNotificationForApi(JAXBNotification jaxbNotification) throws ApiException, ApsSystemException {
        if (null != this.getNotification(jaxbNotification.getId())) {
            throw new ApiException(IApiErrorCodes.API_VALIDATION_ERROR, "Notification with id " + jaxbNotification.getId() + " already exists", Response.Status.CONFLICT);
        }
        Notification notification = jaxbNotification.getNotification();
        this.addNotification(notification);
    }

    /*
    public void updateNotificationForApi(JAXBNotification jaxbNotification) throws ApiException, ApsSystemException {
        if (null == this.getNotification(jaxbNotification.getId())) {
            throw new ApiException(IApiErrorCodes.API_VALIDATION_ERROR, "Notification with id " + jaxbNotification.getId() + " does not exist", Response.Status.CONFLICT);
        }
        Notification notification = jaxbNotification.getNotification();
        this.updateNotification(notification);
    }
     */
    /**
     * DELETE http://localhost:8080/<portal>/api/rs/en/notification?id=1
     *
     * @param properties
     * @throws ApiException
     * @throws ApsSystemException
     */
    public void deleteNotificationForApi(Properties properties) throws Throwable {
        String idString = properties.getProperty("id");
        int id = 0;
        try {
            id = Integer.parseInt(idString);
        } catch (NumberFormatException e) {
            throw new ApiException(IApiErrorCodes.API_PARAMETER_VALIDATION_ERROR, "Invalid Integer format for 'id' parameter - '" + idString + "'", Response.Status.CONFLICT);
        }
        this.deleteNotification(id);
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
    public SearcherDaoPaginatedResult<Notification> getNotifications(FieldSearchFilter[] filters, String username) throws ApsSystemException {
        SearcherDaoPaginatedResult<Notification> pagedResult = null;
        try {
            int count = this.getNotificationDAO().countNotifications(filters);
            List<Notification> notifications = this.getNotificationDAO().searchNotificationsByUser(filters, username);
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
    public SearcherDaoPaginatedResult<Notification> getNotifications(List<FieldSearchFilter> filters, String username) throws ApsSystemException {
        FieldSearchFilter[] array = null;
        if (null != filters) {
            array = filters.toArray(new FieldSearchFilter[filters.size()]);
        }
        return this.getNotifications(array, username);
    }

    public void setNotificationDAO(INotificationDAO notificationDAO) {
        this._notificationDAO = notificationDAO;
    }

    protected INotificationDAO getNotificationDAO() {
        return _notificationDAO;
    }

    private INotificationDAO _notificationDAO;

}

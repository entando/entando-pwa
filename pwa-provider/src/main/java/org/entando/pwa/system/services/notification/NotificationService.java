/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import com.agiletec.aps.system.common.FieldSearchFilter;
import com.agiletec.aps.system.common.entity.model.attribute.ITextAttribute;
import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.aps.system.common.model.dao.SearcherDaoPaginatedResult;
import com.agiletec.plugins.jacms.aps.system.JacmsSystemConstants;
import com.agiletec.plugins.jacms.aps.system.services.content.IContentManager;
import com.agiletec.plugins.jacms.aps.system.services.content.model.Content;
import org.entando.entando.aps.system.exception.RestServerError;
import org.entando.entando.web.common.exceptions.ValidationGenericException;
import org.entando.entando.aps.system.services.DtoBuilder;
import org.entando.entando.aps.system.services.IDtoBuilder;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.entando.aps.system.exception.ResourceNotFoundException;
import org.entando.entando.plugins.pwa.web.notification.NotificationController;
import org.entando.entando.plugins.pwa.web.notification.model.MarkAsReadRequest;
import org.entando.pwa.system.services.notification.model.NotificationDto;
import org.entando.entando.plugins.pwa.web.notification.model.NotificationRequest;
import org.entando.entando.plugins.pwa.web.notification.validator.NotificationValidator;
import org.entando.pwa.system.services.notification.model.PwaNotificationDto;
import org.springframework.validation.BeanPropertyBindingResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

public class NotificationService implements INotificationService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private INotificationManager notificationManager;

    @Autowired
    private IContentManager contentManager;

    private IDtoBuilder<Notification, NotificationDto> dtoBuilder;

    private IDtoBuilder<Notification, PwaNotificationDto> dtoPwaBuilder;

    @PostConstruct
    public void onInit() {
        this.setDtoBuilder(new DtoBuilder<Notification, NotificationDto>() {
            @Override
            protected NotificationDto toDto(Notification src) {
                NotificationDto dto = new NotificationDto();
                BeanUtils.copyProperties(src, dto);
                return dto;
            }
        });
        this.setDtoPwaBuilder(new DtoBuilder<Notification, PwaNotificationDto>() {
            @Override
            protected PwaNotificationDto toDto(Notification src) {
                PwaNotificationDto dto = new PwaNotificationDto();
                dto.setDate(src.getDate());
                dto.setId(src.getId());
                dto.setObjectId(src.getObjectId());
                dto.setType(src.getType());
                return dto;
            }
        });
    }

    @Override
    public PagedMetadata<NotificationDto> getNotifications(RestListRequest requestList) {
        try {
            List<FieldSearchFilter> filters = new ArrayList<>(requestList.buildFieldSearchFilters());
            filters.stream().filter(i -> i.getKey() != null)
                    .forEach(i -> i.setKey(NotificationDto.getEntityFieldName(i.getKey())));
            SearcherDaoPaginatedResult<Notification> notifications = this.getNotificationManager().getNotifications(filters);
            List<NotificationDto> dtoList = dtoBuilder.convert(notifications.getList());
            PagedMetadata<NotificationDto> pagedMetadata = new PagedMetadata<>(requestList, notifications);
            pagedMetadata.setBody(dtoList);
            return pagedMetadata;
        } catch (Throwable t) {
            logger.error("error in search notifications", t);
            throw new RestServerError("error in search notifications", t);
        }
    }

    @Override
    public PagedMetadata<PwaNotificationDto> getNotificationsByUser(RestListRequest requestList, String username) {
        try {
            List<FieldSearchFilter> filters = new ArrayList<>(requestList.buildFieldSearchFilters());
            filters.stream().filter(i -> i.getKey() != null)
                    .forEach(i -> i.setKey(NotificationDto.getEntityFieldName(i.getKey())));
            FieldSearchFilter filterType = new FieldSearchFilter("notiftype", INotificationManager.TYPE_CONTENT, false);
            filters.add(filterType);
            SearcherDaoPaginatedResult<Notification> notifications = this.getNotificationManager().getNotifications(filters, username);
            List<PwaNotificationDto> dtoList = this.getDtoPwaBuilder().convert(notifications.getList());
            for (int i = 0; i < dtoList.size(); i++) {
                PwaNotificationDto not = dtoList.get(i);
                Content content = this.getContentManager().loadContent(not.getObjectId(), true);
                if (null == content) {
                    this.getNotificationManager().deleteNotification(not.getId());
                } else {
                    ITextAttribute title = (ITextAttribute) content.getAttributeByRole(JacmsSystemConstants.ATTRIBUTE_ROLE_TITLE);
                    if (null != title) {
                        not.setTitle(title.getText());
                    }
                    if (null != content.getCategories()) {
                        content.getCategories().stream().forEach(cat -> not.getCategories().add(cat.getCode()));
                    }
                    not.getProperties().put("contentType", content.getTypeCode());
                }
            }
            PagedMetadata<PwaNotificationDto> pagedMetadata = new PagedMetadata<>(requestList, notifications);
            pagedMetadata.setBody(dtoList);
            return pagedMetadata;
        } catch (Throwable t) {
            logger.error("error in search notifications", t);
            throw new RestServerError("error in search notifications", t);
        }
    }

    /*
    @Override
    public NotificationDto updateNotification(NotificationRequest notificationRequest) {
        try {
            Notification notification = this.getNotificationManager().getNotification(notificationRequest.getId());
            if (null == notification) {
                throw new ResourceNotFoundException(NotificationValidator.ERRCODE_NOTIFICATION_NOT_FOUND, "notification", String.valueOf(notificationRequest.getId()));
            }
            BeanUtils.copyProperties(notificationRequest, notification);
            BeanPropertyBindingResult validationResult = this.validateForUpdate(notification);
            if (validationResult.hasErrors()) {
                throw new ValidationGenericException(validationResult);
            }
            this.getNotificationManager().updateNotification(notification);
            return this.getDtoBuilder().convert(notification);
        } catch (ApsSystemException e) {
            logger.error("Error updating notification {}", notificationRequest.getId(), e);
            throw new RestServerError("error in update notification", e);
        }
    }
     */
    @Override
    public NotificationDto addNotification(NotificationRequest notificationRequest) {
        try {
            Notification notification = this.createNotification(notificationRequest);
            BeanPropertyBindingResult validationResult = this.validateForAdd(notification);
            if (validationResult.hasErrors()) {
                throw new ValidationGenericException(validationResult);
            }
            this.getNotificationManager().addNotification(notification);
            NotificationDto dto = this.getDtoBuilder().convert(notification);
            return dto;
        } catch (ApsSystemException e) {
            logger.error("Error adding a notification", e);
            throw new RestServerError("error in add notification", e);
        }
    }

    @Override
    public void removeNotification(int id) {
        try {
            Notification notification = this.getNotificationManager().getNotification(id);
            if (null == notification) {
                logger.info("notification {} does not exists", id);
                return;
            }
            BeanPropertyBindingResult validationResult = this.validateForDelete(notification);
            if (validationResult.hasErrors()) {
                throw new ValidationGenericException(validationResult);
            }
            this.getNotificationManager().deleteNotification(id);
        } catch (ApsSystemException e) {
            logger.error("Error in delete notification {}", id, e);
            throw new RestServerError("error in delete notification", e);
        }
    }

    @Override
    public NotificationDto getNotification(int id) {
        try {
            Notification notification = this.getNotificationManager().getNotification(id);
            if (null == notification) {
                logger.warn("no notification found with code {}", id);
                throw new ResourceNotFoundException(NotificationValidator.ERRCODE_NOTIFICATION_NOT_FOUND, "notification", String.valueOf(id));
            }
            NotificationDto dto = this.getDtoBuilder().convert(notification);
            return dto;
        } catch (ApsSystemException e) {
            logger.error("Error loading notification {}", id, e);
            throw new RestServerError("error in loading notification", e);
        }
    }

    private Notification createNotification(NotificationRequest notificationRequest) {
        Notification notification = new Notification();
        BeanUtils.copyProperties(notificationRequest, notification);
        return notification;
    }

    @Override
    public void markAsRead(MarkAsReadRequest request, String type, String username, BindingResult bindingResult) {
        if (null == request || null == request.getObjectIds()) {
            return;
        }
        for (int i = 0; i < request.getObjectIds().size(); i++) {
            String objectId = request.getObjectIds().get(i);
            try {
                this.getNotificationManager().markAsRead(username, objectId, type);
            } catch (Exception e) {
                logger.error("Error marking as read object '{}' of type '{}'", objectId, type, e);
                bindingResult.reject(NotificationController.ERRCODE_INVALID_OBJECT_ID, new String[]{objectId}, "notification.username.missing");
            }
        }
    }

    protected BeanPropertyBindingResult validateForAdd(Notification notification) {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(notification, "notification");
        return errors;
    }

    protected BeanPropertyBindingResult validateForDelete(Notification notification) {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(notification, "notification");
        return errors;
    }

    protected BeanPropertyBindingResult validateForUpdate(Notification notification) {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(notification, "notification");
        return errors;
    }

    protected INotificationManager getNotificationManager() {
        return notificationManager;
    }

    public void setNotificationManager(INotificationManager notificationManager) {
        this.notificationManager = notificationManager;
    }

    protected IDtoBuilder<Notification, NotificationDto> getDtoBuilder() {
        return dtoBuilder;
    }

    public void setDtoBuilder(IDtoBuilder<Notification, NotificationDto> dtoBuilder) {
        this.dtoBuilder = dtoBuilder;
    }

    public IDtoBuilder<Notification, PwaNotificationDto> getDtoPwaBuilder() {
        return dtoPwaBuilder;
    }

    public void setDtoPwaBuilder(IDtoBuilder<Notification, PwaNotificationDto> dtoPwaBuilder) {
        this.dtoPwaBuilder = dtoPwaBuilder;
    }

    protected IContentManager getContentManager() {
        return contentManager;
    }

    public void setContentManager(IContentManager contentManager) {
        this.contentManager = contentManager;
    }

}

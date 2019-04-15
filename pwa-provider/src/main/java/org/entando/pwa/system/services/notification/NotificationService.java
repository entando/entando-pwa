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
import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.aps.system.common.model.dao.SearcherDaoPaginatedResult;
import org.entando.entando.aps.system.exception.RestServerError;
import org.entando.entando.web.common.exceptions.ValidationGenericException;
import org.entando.entando.aps.system.services.DtoBuilder;
import org.entando.entando.aps.system.services.IDtoBuilder;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.entando.aps.system.exception.ResourceNotFoundException;
import org.entando.pwa.system.services.notification.model.NotificationDto;
import org.entando.pwa.web.notification.model.NotificationRequest;
import org.entando.pwa.web.notification.validator.NotificationValidator;
import org.springframework.validation.BeanPropertyBindingResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

public class NotificationService implements INotificationService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private INotificationManager notificationManager;
    private IDtoBuilder<Notification, NotificationDto> dtoBuilder;

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
    }

    @Override
    public PagedMetadata<NotificationDto> getNotifications(RestListRequest requestList) {
        try {
            List<FieldSearchFilter> filters = new ArrayList<FieldSearchFilter>(requestList.buildFieldSearchFilters());
            filters
                    .stream()
                    .filter(i -> i.getKey() != null)
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

}

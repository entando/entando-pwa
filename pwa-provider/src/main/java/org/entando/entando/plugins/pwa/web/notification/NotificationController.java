/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.entando.plugins.pwa.web.notification;

import com.agiletec.aps.system.SystemConstants;
import com.agiletec.aps.system.services.user.UserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.entando.entando.plugins.pwa.web.notification.model.MarkAsReadRequest;
import org.entando.entando.plugins.pwa.web.notification.validator.NotificationValidator;
import org.entando.entando.web.common.annotation.RestAccessControl;
import org.entando.entando.web.common.exceptions.ValidationGenericException;
import org.entando.entando.web.common.model.PagedMetadata;
import org.entando.entando.web.common.model.PagedRestResponse;
import org.entando.entando.web.common.model.RestListRequest;
import org.entando.entando.web.common.model.SimpleRestResponse;
import org.entando.pwa.system.services.notification.INotificationManager;
import org.entando.pwa.system.services.notification.INotificationService;
import org.entando.pwa.system.services.notification.model.NotificationDto;
import org.entando.pwa.system.services.notification.model.PwaNotificationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/pwa/notifications")
public class NotificationController {

    public static final String ERRCODE_GUEST_USER = "1";

    public static final String ERRCODE_INVALID_OBJECT_ID = "2";

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private INotificationService notificationService;

    @Autowired
    private NotificationValidator notificationValidator;

    protected INotificationService getNotificationService() {
        return notificationService;
    }

    public void setNotificationService(INotificationService notificationService) {
        this.notificationService = notificationService;
    }

    protected NotificationValidator getNotificationValidator() {
        return notificationValidator;
    }

    public void setNotificationValidator(NotificationValidator notificationValidator) {
        this.notificationValidator = notificationValidator;
    }

    @RestAccessControl(permission = "")
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PagedRestResponse<PwaNotificationDto>> getNotifications(RestListRequest requestList) throws JsonProcessingException {
        this.getNotificationValidator().validateRestListRequest(requestList, NotificationDto.class);
        UserDetails userDetails = this.extractCurrentUser();
        //String username = (null != userDetails && !userDetails.getUsername().equals(SystemConstants.GUEST_USER_NAME)) ? userDetails.getUsername() : null;
        PagedMetadata<PwaNotificationDto> result = this.getNotificationService().getNotificationsByUser(requestList, userDetails);
        this.getNotificationValidator().validateRestListResult(requestList, result);
        logger.debug("Main Response -> {}", result);
        return new ResponseEntity<>(new PagedRestResponse<>(result), HttpStatus.OK);
    }

    @RestAccessControl(permission = "")
    @RequestMapping(value = "/contents/markAsRead", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleRestResponse<MarkAsReadRequest>> markAsReadContents(@Valid @RequestBody MarkAsReadRequest notificationRequest, BindingResult bindingResult) {
        logger.debug("markAsReadContents - request -> {}", notificationRequest);
        UserDetails userDetails = this.extractCurrentUser();
        String username = (null != userDetails && !userDetails.getUsername().equals(SystemConstants.GUEST_USER_NAME)) ? userDetails.getUsername() : null;
        if (null == username) {
            bindingResult.reject(ERRCODE_GUEST_USER, new String[0], "notification.username.missing");
            throw new ValidationGenericException(bindingResult);
        }
        this.getNotificationService().markAsRead(notificationRequest, INotificationManager.TYPE_CONTENT, username, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ValidationGenericException(bindingResult);
        }
        return new ResponseEntity<>(new SimpleRestResponse<>(notificationRequest), HttpStatus.OK);
    }

    protected UserDetails extractCurrentUser() {
        return (UserDetails) this.httpSession.getAttribute("user");
    }

}

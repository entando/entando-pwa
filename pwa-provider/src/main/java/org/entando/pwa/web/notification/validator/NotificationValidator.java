/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.web.notification.validator;

import org.apache.commons.lang3.StringUtils;
import org.entando.entando.web.common.validator.AbstractPaginationValidator;
import org.entando.pwa.web.notification.model.NotificationRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class NotificationValidator extends AbstractPaginationValidator {

    public static final String ERRCODE_URINAME_MISMATCH = "1";
    public static final String ERRCODE_NOTIFICATION_NOT_FOUND = "2";
    public static final String ERRCODE_NOTIFICATION_ALREADY_EXISTS = "3";

    @Override
    public boolean supports(Class<?> paramClass) {
        return NotificationRequest.class.equals(paramClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        //NotificationRequest request = (NotificationRequest) target;
    }

    public void validateBodyName(String notificationId, NotificationRequest notificationRequest, Errors errors) {
        if (!StringUtils.equals(notificationId, String.valueOf(notificationRequest.getId()))) {
            errors.rejectValue("id", ERRCODE_URINAME_MISMATCH, new Object[]{notificationId, notificationRequest.getId()}, "notification.id.mismatch");
        }
    }

    @Override
    protected String getDefaultSortProperty() {
        return "id";
    }

}

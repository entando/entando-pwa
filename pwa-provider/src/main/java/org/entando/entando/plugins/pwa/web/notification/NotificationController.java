/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.entando.plugins.pwa.web.notification;
//@RequestMapping(value = "/pwanotification/notifications")

public class NotificationController {
    /*
    private final Logger logger = LoggerFactory.getLogger(getClass());

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

    @RestAccessControl(permission = "superuser")
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PagedRestResponse<NotificationDto>> getNotifications(RestListRequest requestList) throws JsonProcessingException {
        this.getNotificationValidator().validateRestListRequest(requestList, NotificationDto.class);
        PagedMetadata<NotificationDto> result = this.getNotificationService().getNotifications(requestList);
        this.getNotificationValidator().validateRestListResult(requestList, result);
        logger.debug("Main Response -> {}", result);
        return new ResponseEntity<>(new PagedRestResponse<>(result), HttpStatus.OK);
    }

    @RestAccessControl(permission = "superuser")
    @RequestMapping(value = "/{notificationId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RestResponse> getNotification(@PathVariable String notificationId) {
        NotificationDto notification = this.getNotificationService().getNotification(Integer.valueOf(notificationId));
        return new ResponseEntity<>(new RestResponse(notification), HttpStatus.OK);
    }

    @RestAccessControl(permission = "superuser")
    @RequestMapping(value = "/{notificationId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleRestResponse<NotificationDto>> updateNotification(@PathVariable String notificationId, @Valid @RequestBody NotificationRequest notificationRequest, BindingResult bindingResult) {
        //field validations
        if (bindingResult.hasErrors()) {
            throw new ValidationGenericException(bindingResult);
        }
        this.getNotificationValidator().validateBodyName(String.valueOf(notificationId), notificationRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ValidationGenericException(bindingResult);
        }

        NotificationDto notification = this.getNotificationService().updateNotification(notificationRequest);
        return new ResponseEntity<>(new SimpleRestResponse<>(notification), HttpStatus.OK);
    }

    @RestAccessControl(permission = "superuser")
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleRestResponse<NotificationDto>> addNotification(@Valid @RequestBody NotificationRequest notificationRequest, BindingResult bindingResult) {
        //field validations
        if (bindingResult.hasErrors()) {
            throw new ValidationGenericException(bindingResult);
        }
        //business validations
        getNotificationValidator().validate(notificationRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new ValidationConflictException(bindingResult);
        }
        NotificationDto dto = this.getNotificationService().addNotification(notificationRequest);
        return new ResponseEntity<>(new SimpleRestResponse<>(dto), HttpStatus.OK);
    }

    @RestAccessControl(permission = "superuser")
    @RequestMapping(value = "/{notificationId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleRestResponse<Map>> deleteNotification(@PathVariable String notificationId) {
        logger.info("deleting {}", notificationId);
        this.getNotificationService().removeNotification(Integer.valueOf(notificationId));
        Map<String, Integer> result = new HashMap<>();
        result.put("id", Integer.valueOf(notificationId));
        return new ResponseEntity<>(new SimpleRestResponse<>(result), HttpStatus.OK);
    }
     */
}

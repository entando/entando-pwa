/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.model;

import java.util.Date;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.entando.entando.web.common.json.JsonDateDeserializer;
import org.entando.entando.web.common.json.JsonDateSerializer;

public class NotificationDto {

    private int id;
    private String type;
    private String objectId;
    @JsonSerialize(using = JsonDateSerializer.class)
    @JsonDeserialize(using = JsonDateDeserializer.class)
    private Date date;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public static String getEntityFieldName(String dtoFieldName) {
        return dtoFieldName;
    }

}

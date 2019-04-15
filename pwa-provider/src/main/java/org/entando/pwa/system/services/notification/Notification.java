/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import java.util.Date;

public class Notification {

    public int getId() {
        return _id;
    }

    public void setId(int id) {
        this._id = id;
    }

    public String getType() {
        return _type;
    }

    public void setType(String type) {
        this._type = type;
    }

    public String getObjectId() {
        return _objectId;
    }

    public void setObjectId(String objectId) {
        this._objectId = objectId;
    }

    public Date getDate() {
        return _date;
    }

    public void setDate(Date date) {
        this._date = date;
    }

    private int _id;
    private String _type;
    private String _objectId;
    private Date _date;

}

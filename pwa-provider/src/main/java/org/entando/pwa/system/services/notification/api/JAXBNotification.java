/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification.api;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import org.entando.pwa.system.services.notification.Notification;

@XmlRootElement(name = "notification")
@XmlType(propOrder = {"id", "type", "objectId", "date"})
public class JAXBNotification {

    public JAXBNotification() {
        super();
    }

    public JAXBNotification(Notification notification) {
        this.setId(notification.getId());
        this.setType(notification.getType());
        this.setObjectId(notification.getObjectId());
        this.setDate(notification.getDate());
    }

    public Notification getNotification() {
        Notification notification = new Notification();
        notification.setId(this.getId());
        notification.setType(this.getType());
        notification.setObjectId(this.getObjectId());
        notification.setDate(this.getDate());
        return notification;
    }

    @XmlElement(name = "id", required = true)
    public int getId() {
        return _id;
    }

    public void setId(int id) {
        this._id = id;
    }

    @XmlElement(name = "type", required = true)
    public String getType() {
        return _type;
    }

    public void setType(String type) {
        this._type = type;
    }

    @XmlElement(name = "objectId", required = true)
    public String getObjectId() {
        return _objectId;
    }

    public void setObjectId(String objectId) {
        this._objectId = objectId;
    }

    @XmlElement(name = "date", required = true)
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

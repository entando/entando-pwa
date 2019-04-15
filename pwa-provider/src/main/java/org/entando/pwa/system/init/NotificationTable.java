/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.init;

import com.j256.ormlite.field.DataType;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;
import java.util.Date;

@DatabaseTable(tableName = NotificationTable.TABLE_NAME)
public class NotificationTable {

    public NotificationTable() {
    }

    @DatabaseField(columnName = "id",
            dataType = DataType.INTEGER,
            canBeNull = false, id = true)
    private int _id;

    @DatabaseField(columnName = "type",
            dataType = DataType.LONG_STRING,
            canBeNull = false)
    private String _type;

    @DatabaseField(columnName = "objectid",
            dataType = DataType.LONG_STRING,
            canBeNull = false)
    private String _objectId;

    @DatabaseField(columnName = "date",
            dataType = DataType.DATE,
            canBeNull = false)
    private Date _date;

    public static final String TABLE_NAME = "pwa_notifications";

}

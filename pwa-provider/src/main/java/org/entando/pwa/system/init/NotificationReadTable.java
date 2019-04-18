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
import org.entando.entando.aps.system.init.IDatabaseManager;
import org.entando.entando.aps.system.init.model.ExtendedColumnDefinition;
import org.entando.entando.plugins.jacms.aps.system.init.portdb.Content;

@DatabaseTable(tableName = NotificationReadTable.TABLE_NAME)
public class NotificationReadTable implements ExtendedColumnDefinition {

    public NotificationReadTable() {
    }

    @DatabaseField(columnName = "id",
            dataType = DataType.INTEGER,
            canBeNull = false,
            generatedId = true)
    private int _id;

    @DatabaseField(foreign = true, columnName = "notificationid",
            canBeNull = false, index = true)
    private NotificationTable notificationid;

    @DatabaseField(columnName = "username",
            dataType = DataType.STRING,
            width = 40, canBeNull = false)
    private String username;

    @DatabaseField(columnName = "readdate",
            dataType = DataType.DATE,
            canBeNull = false)
    private Date _date;

    @Override
    public String[] extensions(IDatabaseManager.DatabaseType type) {
        String tableName = TABLE_NAME;
        String contentTableName = NotificationTable.TABLE_NAME;
        if (IDatabaseManager.DatabaseType.MYSQL.equals(type)) {
            tableName = "`" + tableName + "`";
            contentTableName = "`" + Content.TABLE_NAME + "`";
        }
        return new String[]{"ALTER TABLE " + tableName + " "
            + "ADD CONSTRAINT pwanotif_id_fkey FOREIGN KEY (notificationid) "
            + "REFERENCES " + contentTableName + " (id)"};
    }

    public static final String TABLE_NAME = "pwa_readnotifications";

}

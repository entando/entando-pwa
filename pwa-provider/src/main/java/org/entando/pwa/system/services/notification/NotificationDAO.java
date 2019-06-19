/*
 *
 * <Your licensing text here>
 *
 */
package org.entando.pwa.system.services.notification;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import com.agiletec.aps.system.common.AbstractSearcherDAO;
import com.agiletec.aps.system.common.FieldSearchFilter;

import java.util.OptionalInt;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Stream;

import com.agiletec.aps.system.common.QueryLimitResolver;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.formula.functions.T;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NotificationDAO extends AbstractSearcherDAO implements INotificationDAO {

    private static final Logger logger = LoggerFactory.getLogger(NotificationDAO.class);

    private static final String ADD_NOTIFICATION = "INSERT INTO pwa_notifications (id, notiftype, objectid, notifdate ) VALUES (?, ?, ?, ? )";

    private static final String ADD_READ_NOTIFICATION = "INSERT INTO pwa_readnotifications(notificationid, username, readdate) VALUES (?, ?, ?)";

    //private static final String UPDATE_NOTIFICATION = "UPDATE pwa_notifications SET  type=?,  objectid=?, date=? WHERE id = ?";
    private static final String DELETE_NOTIFICATION = "DELETE FROM pwa_notifications WHERE id = ?";

    private static final String DELETE_READ_NOTIFICATION = "DELETE FROM pwa_readnotifications WHERE notificationid = ?";

    private static final String LOAD_NOTIFICATION = "SELECT id, notiftype, objectid, notifdate FROM pwa_notifications WHERE id = ?";

    private static final String LOAD_NOTIFICATIONS_ID = "SELECT id FROM pwa_notifications";

    private final String EXTRACT_NEXT_ID = "SELECT MAX(id) FROM pwa_notifications";

    @Override
    public int countNotifications(FieldSearchFilter[] filters) {
        Integer notifications = null;
        try {
            notifications = super.countId(filters);
        } catch (Throwable t) {
            logger.error("error in count notifications", t);
            throw new RuntimeException("error in count notifications", t);
        }
        return notifications;
    }

    @Override
    protected String getTableFieldName(String metadataFieldKey) {
        return metadataFieldKey;
    }

    @Override
    protected String getMasterTableName() {
        return "pwa_notifications";
    }

    @Override
    protected String getMasterTableIdFieldName() {
        return "id";
    }

    @Override
    public List<Integer> searchNotifications(FieldSearchFilter[] filters) {
        List<Integer> notificationsId = new ArrayList<>();
        List<String> masterList = super.searchId(filters);
        masterList.stream().forEach(idString -> notificationsId.add(Integer.parseInt(idString)));
        return notificationsId;
    }

    @Override
    public List<Integer> loadNotifications() {
        List<Integer> notificationsId = new ArrayList<>();
        Connection conn = null;
        PreparedStatement stat = null;
        ResultSet res = null;
        try {
            conn = this.getConnection();
            stat = conn.prepareStatement(LOAD_NOTIFICATIONS_ID);
            res = stat.executeQuery();
            while (res.next()) {
                int id = res.getInt("id");
                notificationsId.add(id);
            }
        } catch (Throwable t) {
            logger.error("Error loading Notification list", t);
            throw new RuntimeException("Error loading Notification list", t);
        } finally {
            closeDaoResources(res, stat, conn);
        }
        return notificationsId;
    }

    @Override
    public void insertNotification(Notification notification) {
        Connection conn = null;
        try {
            conn = this.getConnection();
            conn.setAutoCommit(false);
            this.insertNotification(notification, conn);
            conn.commit();
        } catch (Throwable t) {
            this.executeRollback(conn);
            logger.error("Error on insert notification", t);
            throw new RuntimeException("Error on insert notification", t);
        } finally {
            this.closeConnection(conn);
        }
    }

    public void insertNotification(Notification notification, Connection conn) {
        PreparedStatement stat = null;
        try {
            stat = conn.prepareStatement(ADD_NOTIFICATION);
            notification.setId(this.extractNextId(conn));
            int index = 1;
            stat.setInt(index++, notification.getId());
            stat.setString(index++, notification.getType());
            stat.setString(index++, notification.getObjectId());
            Timestamp dateTimestamp = new Timestamp(notification.getDate().getTime());
            stat.setTimestamp(index++, dateTimestamp);
            stat.executeUpdate();
        } catch (Throwable t) {
            logger.error("Error on insert notification", t);
            throw new RuntimeException("Error on insert notification", t);
        } finally {
            this.closeDaoResources(null, stat, null);
        }
    }

    /*
    @Override
    public void updateNotification(Notification notification) {
        Connection conn = null;
        try {
            conn = this.getConnection();
            conn.setAutoCommit(false);
            this.updateNotification(notification, conn);
            conn.commit();
        } catch (Throwable t) {
            this.executeRollback(conn);
            logger.error("Error updating notification {}", notification.getId(), t);
            throw new RuntimeException("Error updating notification", t);
        } finally {
            this.closeConnection(conn);
        }
    }

    public void updateNotification(Notification notification, Connection conn) {
        PreparedStatement stat = null;
        try {
            stat = conn.prepareStatement(UPDATE_NOTIFICATION);
            int index = 1;

            stat.setString(index++, notification.getType());
            stat.setString(index++, notification.getObjectId());
            Timestamp dateTimestamp = new Timestamp(notification.getDate().getTime());
            stat.setTimestamp(index++, dateTimestamp);
            stat.setInt(index++, notification.getId());
            stat.executeUpdate();
        } catch (Throwable t) {
            logger.error("Error updating notification {}", notification.getId(), t);
            throw new RuntimeException("Error updating notification", t);
        } finally {
            this.closeDaoResources(null, stat, null);
        }
    }
     */
    @Override
    public void removeNotification(int id) {
        PreparedStatement stat = null;
        Connection conn = null;
        try {
            conn = this.getConnection();
            conn.setAutoCommit(false);
            super.executeQueryWithoutResultset(conn, DELETE_READ_NOTIFICATION, id);
            super.executeQueryWithoutResultset(conn, DELETE_NOTIFICATION, id);
            //this.removeNotification(id, conn);
            conn.commit();
        } catch (Throwable t) {
            this.executeRollback(conn);
            logger.error("Error deleting notification {}", id, t);
            throw new RuntimeException("Error deleting notification", t);
        } finally {
            this.closeDaoResources(null, stat, conn);
        }
    }

    /*
    public void removeNotification(int id, Connection conn) {
        PreparedStatement stat = null;
        try {
            stat = conn.prepareStatement(DELETE_NOTIFICATION);
            int index = 1;
            stat.setInt(index++, id);
            stat.executeUpdate();
        } catch (Throwable t) {
            logger.error("Error deleting notification {}", id, t);
            throw new RuntimeException("Error deleting notification", t);
        } finally {
            this.closeDaoResources(null, stat, null);
        }
    }
     */
    @Override
    public Notification loadNotification(int id) {
        Notification notification = null;
        Connection conn = null;
        try {
            conn = this.getConnection();
            notification = this.loadNotification(id, conn);
        } catch (Throwable t) {
            logger.error("Error loading notification with id {}", id, t);
            throw new RuntimeException("Error loading notification with id " + id, t);
        } finally {
            closeConnection(conn);
        }
        return notification;
    }

    public Notification loadNotification(int id, Connection conn) {
        Notification notification = null;
        PreparedStatement stat = null;
        ResultSet res = null;
        try {
            stat = conn.prepareStatement(LOAD_NOTIFICATION);
            int index = 1;
            stat.setInt(index++, id);
            res = stat.executeQuery();
            if (res.next()) {
                notification = this.buildNotificationFromRes(res);
            }
        } catch (Throwable t) {
            logger.error("Error loading notification with id {}", id, t);
            throw new RuntimeException("Error loading notification with id " + id, t);
        } finally {
            closeDaoResources(res, stat, null);
        }
        return notification;
    }

    protected Notification buildNotificationFromRes(ResultSet res) {
        Notification notification = null;
        try {
            notification = new Notification();
            notification.setId(res.getInt("id"));
            notification.setType(res.getString("notiftype"));
            notification.setObjectId(res.getString("objectid"));
            Timestamp dateValue = res.getTimestamp("notifdate");
            if (null != dateValue) {
                notification.setDate(new Date(dateValue.getTime()));
            }
        } catch (Throwable t) {
            logger.error("Error in buildNotificationFromRes", t);
        }
        return notification;
    }

    protected int extractNextId(Connection conn) {
        int id = 0;
        Statement stat = null;
        ResultSet res = null;
        try {
            stat = conn.createStatement();
            res = stat.executeQuery(EXTRACT_NEXT_ID);
            if (res.next()) {
                id = res.getInt(1);
            }
            id++;
        } catch (Throwable t) {
            logger.error("Error extracting next id", t);
            throw new RuntimeException("Error extracting next id", t);
        } finally {
            this.closeDaoResources(res, stat);
        }
        return id;
    }

    @Override
    public void removeNotification(String type, String objectId) {
        Connection conn = null;
        try {
            conn = this.getConnection();
            conn.setAutoCommit(false);
            List<Integer> ids = this.searchNotification(objectId, type, conn);
            if (null != ids && !ids.isEmpty()) {
                super.executeQueryWithoutResultset(conn, DELETE_READ_NOTIFICATION, ids.get(0));
                super.executeQueryWithoutResultset(conn, DELETE_NOTIFICATION, ids.get(0));
            }
            conn.commit();
        } catch (Throwable t) {
            this.executeRollback(conn);
            logger.error("Error removing notifications", t);
            throw new RuntimeException("Error removing notifications", t);
        } finally {
            this.closeConnection(conn);
        }
    }

    @Override
    public void markAsRead(String username, String objectId, String type) {
        Connection conn = null;
        try {
            conn = this.getConnection();
            conn.setAutoCommit(false);
            List<Integer> ids = this.searchNotification(objectId, type, conn);
            if (null != ids && !ids.isEmpty()) {
                this.insertReadNotification(ids.get(0), username, conn);
            }
            conn.commit();
        } catch (Throwable t) {
            this.executeRollback(conn);
            logger.error("Error adding user reading", t);
            throw new RuntimeException("Error adding user reading", t);
        } finally {
            this.closeConnection(conn);
        }
    }

    private List<Integer> searchNotification(String objectId, String type, Connection conn) {
        FieldSearchFilter filterId = new FieldSearchFilter("objectid", objectId, false);
        FieldSearchFilter filterType = new FieldSearchFilter("notiftype", type, false);
        FieldSearchFilter dateFilter = new FieldSearchFilter("notifdate");
        dateFilter.setOrder(FieldSearchFilter.Order.DESC);
        FieldSearchFilter[] filters = {filterId, filterType, dateFilter};
        return this.searchId(filters, conn);
    }

    protected List<Integer> searchId(FieldSearchFilter[] filters, Connection conn) {
        List<Integer> idList = new ArrayList<>();
        PreparedStatement stat = null;
        ResultSet result = null;
        try {
            stat = this.buildStatement(filters, false, false, conn);
            result = stat.executeQuery();
            int offset = getOffset(filters);
            int limit = getLimit(filters);
            int resultNumber = 0;
            int resultIndex = -1;
            while (result.next()) {
                resultIndex++;
                if (resultNumber >= limit) {
                    break;
                }
                if (resultIndex < offset)  {
                    continue;
                }
                int id = result.getInt(this.getMasterTableIdFieldName());
                if (!idList.contains(id)) {
                    idList.add(id);
                }
                resultNumber++;
            }
//            while (result.next()) {
//                int id = result.getInt(this.getMasterTableIdFieldName());
//                if (!idList.contains(id)) {
//                    idList.add(id);
//                }
//            }
        } catch (Throwable t) {
            logger.error("Error while loading the list of IDs", t);
            throw new RuntimeException("Error while loading the list of IDs", t);
        } finally {
            closeDaoResources(result, stat);
        }
        return idList;
    }

    protected void insertReadNotification(Integer notificationId, String username, Connection conn) {
        PreparedStatement stat = null;
        try {
            stat = conn.prepareStatement(ADD_READ_NOTIFICATION);
            int index = 1;
            stat.setInt(index++, notificationId);
            stat.setString(index++, username);
            Timestamp dateTimestamp = new Timestamp(new Date().getTime());
            stat.setTimestamp(index++, dateTimestamp);
            stat.executeUpdate();
        } catch (Throwable t) {
            logger.error("Error on insert user notification", t);
            throw new RuntimeException("Error on insert user notification", t);
        } finally {
            this.closeDaoResources(null, stat, null);
        }
    }

    @Override
    public List<Notification> searchNotificationsByUser(FieldSearchFilter[] filters, String username) {
        List<Notification> notes = new ArrayList<>();
        Connection conn = null;
        PreparedStatement stat = null;
        ResultSet result = null;
        try {
            conn = this.getConnection();
            stat = this.buildStatement(filters, false, true, username, conn);
            result = stat.executeQuery();
//            consumeResultSet(filters,result, (resultSet) -> notes.add(this.buildNotificationFromRes(resultSet)));
            int offset = getOffset(filters);
            int limit = getLimit(filters);
            int resultNumber = 0;
            int resultIndex = -1;
            while (result.next()) {
                resultIndex++;
                if (resultNumber >= limit) {
                    break;
                }
                if (resultIndex < offset)  {
                    continue;
                }
                notes.add(this.buildNotificationFromRes(result));
                resultNumber++;
            }
        } catch (Throwable t) {
            logger.error("Error while loading the list of IDs", t);
            throw new RuntimeException("Error while loading the list of IDs", t);
        } finally {
            closeDaoResources(result, stat, conn);
        }
        return notes;
    }

    protected PreparedStatement buildStatement(FieldSearchFilter[] filters, boolean isCount, boolean selectAll, String username, Connection conn) {
        String query = this.createQueryString(filters, isCount, selectAll, username);
        logger.trace("{}", query);
        PreparedStatement stat = null;
        try {
            stat = conn.prepareStatement(query);
            int index = 0;
            index = this.addMetadataFieldFilterStatementBlock(filters, index, stat);
            if (!StringUtils.isBlank(username)) {
                stat.setString(++index, username);
            }
        } catch (Throwable t) {
            logger.error("Error while creating the statement", t);
            throw new RuntimeException("Error while creating the statement", t);
        }
        return stat;
    }

    protected String createQueryString(FieldSearchFilter[] filters, boolean isCount, boolean selectAll, String username) {
        StringBuffer query = this.createBaseQueryBlock(filters, isCount, selectAll);
        boolean hasAppendWhereClause = this.appendMetadataFieldFilterQueryBlocks(filters, query, false);
        if (!StringUtils.isBlank(username)) {
            hasAppendWhereClause = super.verifyWhereClauseAppend(query, hasAppendWhereClause);
            query.append(" id NOT IN (SELECT notificationid FROM pwa_readnotifications WHERE username = ?) ");
        }
        if (!isCount) {
            boolean ordered = appendOrderQueryBlocks(filters, query, false);
//            this.appendLimitQueryBlock(filters, query, hasAppendWhereClause);
        }
        return query.toString();
    }

    private int getOffset(FieldSearchFilter[] filters) {
        int offset = 0;
        if (null == filters || filters.length == 0) {
            logger.warn("no filters");
            return offset;
        }

        OptionalInt minOffset = Stream.of(filters)
                .filter(filter -> filter.getOffset() != null)
                .mapToInt(FieldSearchFilter::getOffset).findFirst();

        return minOffset.orElse(offset);
    }

    private int getLimit(FieldSearchFilter[] filters) {
        int limit = Integer.MAX_VALUE;
        if (null == filters || filters.length == 0) {
            logger.warn("no filters");
            return limit;
        }

        OptionalInt minLimit = Stream.of(filters)
                .filter(filter -> filter.getLimit() != null)
                .mapToInt(FieldSearchFilter::getLimit).findFirst();

        return minLimit.orElse(limit);
    }

//    private void consumeResultSet(FieldSearchFilter[] filters, ResultSet resultSet, Consumer<ResultSet> consumer) throws Exception {
//        int offset = getOffset(filters);
//        int limit = getLimit(filters);
//        int resultNumber = 0;
//        int resultIndex = -1;
//        while (resultSet.next()) {
//            resultIndex++;
//            if (resultNumber >= limit) {
//                break;
//            }
//            if (resultIndex < offset)  {
//                continue;
//            }
//            consumer.accept(resultSet);
//            resultNumber++;
//        }
//
//    }

}

package com.agiletec.system.common;

import com.agiletec.aps.system.common.AbstractSearcherDAO;
import com.agiletec.aps.system.common.FieldSearchFilter;
import com.agiletec.aps.system.common.ThrowingConsumer;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;
import static org.junit.internal.matchers.IsCollectionContaining.hasItems;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AbstractSearcherDAOTest {

    private ResultSet mockResultSet;

    @Before
    public void init() throws SQLException {
        String[] columns = {"id", "notifytype", "objectid", "notifdate"};
        Object[][] values = {
                {1, "cms-content", "NWS1", "2019-01-01"},
                {2, "cms-content", "NWS2", "2019-01-01"},
                {3, "cms-content", "NWS3", "2019-01-01"},
                {4, "cms-content", "NWS4", "2019-01-01"},
                {5, "cms-content", "NWS5", "2019-01-01"},
                {6, "cms-content", "NWS6", "2019-01-01"},
                {7, "cms-content", "NWS7", "2019-01-01"},
                {8, "cms-content", "NWS8", "2019-01-01"},
                {9, "cms-content", "NWS9", "2019-01-01"},
                {10, "cms-content", "NWS10", "2019-01-01"}
        };
        mockResultSet = MockResultSet.create(columns,  values);
    }

    @Test
    public void should_return_all_rows() throws Exception {
        List<Integer> ids = filterResultSetIds(mockResultSet,new FieldSearchFilter(100,0));

        verify(mockResultSet, times(11)).next();
        assertEquals(ids.size() , 10);
    }

    @Test
    public void should_limit_first_5_rows() throws Exception {
        List<Integer> ids = filterResultSetIds(mockResultSet,new FieldSearchFilter(5,0));

        assertThat(ids.size(), is(5));
        assertThat(ids, hasItems(1,2,3,4,5));

    }

    @Test
    public void should_limit_last_2_rows() throws Exception {
        List<Integer> ids = filterResultSetIds(mockResultSet,new FieldSearchFilter(2,8));

        assertThat(ids.size(), is(2));
        assertThat(ids, hasItems(9,10));

    }

    @Test
    public void should_return_no_results_when_offset_is_too_big() throws Exception {
        List<Integer> ids = filterResultSetIds(mockResultSet,new FieldSearchFilter(100,15));
        assertTrue(ids.isEmpty());
    }

    @Test
    public void should_return_no_results_when_limit_0() throws Exception {
        List<Integer> ids = filterResultSetIds(mockResultSet, new FieldSearchFilter(0,0));
        assertTrue(ids.isEmpty());
    }

    @Test
    public void should_work_without_filters_returning_all_elements() throws Exception {

        List<Integer> ids = filterResultSetIds(mockResultSet, new FieldSearchFilter[]{});
        assertThat(ids.size(), is(10));

    }

    @Test(expected = SQLException.class)
    public void should_rethrow_exception() throws Exception {
        TestAbstractSearcherDAO dao = new TestAbstractSearcherDAO();
        dao.limitAndConsumeResultSet(new FieldSearchFilter[]{}, mockResultSet, (rs -> {
            throw new SQLException();
        }));
    }

    private List<Integer> filterResultSetIds(ResultSet resultSet, FieldSearchFilter filter) throws Exception {
        return filterResultSetIds(resultSet, new FieldSearchFilter[]{filter});
    }

    private List<Integer> filterResultSetIds(ResultSet resultSet, FieldSearchFilter[] filterList) throws Exception {
        TestAbstractSearcherDAO dao = new TestAbstractSearcherDAO();
        List<Integer> ids = new ArrayList<>();
        dao.limitAndConsumeResultSet(filterList, resultSet, (rs -> {
            ids.add(rs.getInt("id"));
        }));
        return ids;
    }

    public class TestAbstractSearcherDAO extends AbstractSearcherDAO {


        @Override
        protected String getTableFieldName(String metadataFieldKey) {
            return null;
        }

        @Override
        protected String getMasterTableName() {
            return null;
        }

        @Override
        protected String getMasterTableIdFieldName() {
            return null;
        }

        public void limitAndConsumeResultSet(FieldSearchFilter[] filters, ResultSet resultSet, ThrowingConsumer<ResultSet, SQLException> consumer) throws Exception {
            super.limitAndConsumeResultSet(filters, resultSet, consumer);
        }
    }
}

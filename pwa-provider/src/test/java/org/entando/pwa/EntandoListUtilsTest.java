package org.entando.pwa;

import com.agiletec.aps.system.common.FieldSearchFilter;
import org.entando.pwa.system.services.EntandoListUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class EntandoListUtilsTest {

    private final List<String> TEST_LIST = Arrays.asList(
            "AAA",
            "BBB",
            "CCC",
            "DDD",
            "EEE",
            "FFF"
    );

    @Test
    public void should_filter_list_properly(){
        FieldSearchFilter filter = new FieldSearchFilter(2, 1);
        List<String> filteredList = EntandoListUtils.subList(TEST_LIST, new FieldSearchFilter[]{filter});
        assertEquals(filteredList.size(), 2);
        assertEquals(filteredList, Arrays.asList("BBB", "CCC"));
    }

    @Test
    public void should_return_empty_list_when_offset_is_too_big(){
        FieldSearchFilter filter = new FieldSearchFilter(2, 10);
        List<String> filteredList = EntandoListUtils.subList(TEST_LIST, new FieldSearchFilter[]{filter});
        assertEquals(filteredList.size(), 0);

    }

    @Test
    public void should_return_all_list_if_limit_is_bigger() {
        FieldSearchFilter filter = new FieldSearchFilter(100, 0);
        List<String> filteredList = EntandoListUtils.subList(TEST_LIST, new FieldSearchFilter[]{filter});
        assertEquals(filteredList, TEST_LIST);
    }

    @Test
    public void should_return_till_end_of_list() {
        FieldSearchFilter filter = new FieldSearchFilter(100, 4);
        List<String> filteredList = EntandoListUtils.subList(TEST_LIST, new FieldSearchFilter[]{filter});
       assertEquals(filteredList, Arrays.asList("EEE", "FFF"));
    }

}

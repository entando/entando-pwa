package org.entando.entando.plugins.jacms.aps.system.services.content;

import com.agiletec.plugins.jacms.aps.system.services.content.model.ContentDto;
import org.entando.entando.aps.system.services.entity.model.EntityAttributeDto;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class ContentTimestampComparatortest {


    @Test
    public void testComparator() {


    }


    @Test
    public void testTimestampsFirst() {

        List<ContentDto> val = new ArrayList<>();
        val.add(buildDto("2019-10-04 13:38:19", null));
        val.add(buildDto("2019-10-04 11:00:36", null));

        Collections.sort(val, new ContentTimestampComparator());

        assertEquals("2019-10-04 13:38:19", getDate(val.get(0)));

    }

    @Test
    public void testDates() {

        List<ContentDto> val = new ArrayList<>();
        val.add(buildDto(null, "2019-10-04 13:38:19"));
        val.add(buildDto(null, "2019-10-04 11:00:36"));

        Collections.sort(val, new ContentTimestampComparator());

        assertEquals("2019-10-04 13:38:19", getDate(val.get(0)));

    }

    @Test
    public void testMix() {

        List<ContentDto> val = new ArrayList<>();

        val.add(buildDto("2019-10-04 11:00:36", "2019-10-04 00:00:00"));
        val.add(buildDto("2019-10-04 13:38:19", "2019-10-04 00:00:00"));

        Collections.sort(val, new ContentTimestampComparator());

        assertEquals("2019-10-04 13:38:19", getDate(val.get(0)));

    }

    @Test
    public void testNone() {

        List<ContentDto> val = new ArrayList<>();

        val.add(buildDto(null, null));
        val.add(buildDto(null, null));

        Collections.sort(val, new ContentTimestampComparator());


    }


    private ContentDto buildDto(String timestamp, String dateval) {
        EntityAttributeDto attrDto = new EntityAttributeDto();
        attrDto.setCode("Timestamp");
        attrDto.setValue(timestamp);

        EntityAttributeDto attrDtoTwo = new EntityAttributeDto();
        attrDtoTwo.setCode("Date");
        attrDtoTwo.setValue(dateval);

        ContentDto dtoOne = new ContentDto();
        dtoOne.setAttributes(Arrays.asList(attrDto, attrDtoTwo));

        return dtoOne;
    }

    public String getDate(ContentDto dto){

        String dateStr = "";
        for(EntityAttributeDto attr : dto.getAttributes()) {

                try {
                    if(attr.getCode().equals("Timestamp") && attr.getValue()!=null) {

                        dateStr = (String) attr.getValue();
                        break;
                    }else if(attr.getCode().equals("Date") && attr.getValue()!=null) {

                        //Continue processing after capturing this value. We'll use this if the Timestamp is null
                        //but otherwise use this
                        dateStr = (String) attr.getValue();
                    }
                }catch(Exception e) {
                    e.printStackTrace();
                }

        }

        return dateStr;

    }
}

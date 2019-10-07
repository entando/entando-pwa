package org.entando.entando.plugins.jacms.aps.system.services.content;

import com.agiletec.plugins.jacms.aps.system.services.content.model.ContentDto;
import org.entando.entando.aps.system.services.entity.model.EntityAttributeDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class ContentTimestampComparator implements Comparator<ContentDto> {

    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private final Logger logger = LoggerFactory.getLogger(getClass());

    public int compare(ContentDto contentDtoOne, ContentDto contentDtoTwo) {

        Date timestampone = getTimestampAttribute(contentDtoOne);
        Date timestampTwo = getTimestampAttribute(contentDtoTwo);



        if(timestampone == timestampTwo){
            return 0;
        }else if(timestampone ==null) {
            return 1;
        }else if(timestampTwo == null ) {
            return -1;
        }else if (timestampone.before(timestampTwo)) {
            return 1;
        }else{
            return -1;
        }
    }

    private Date getTimestampAttribute(ContentDto contentDto) {

        List<EntityAttributeDto> attributes = contentDto.getAttributes();

        Date timestamp = null;
        if(attributes !=null) {

            for(EntityAttributeDto attr : attributes){
                try {
                    if(attr.getCode().equals("Timestamp") && attr.getValue()!=null) {

                        String dateStr = (String) attr.getValue();
                        timestamp = format.parse(dateStr);

                        break;
                    }else if(attr.getCode().equals("Date") && attr.getValue()!=null) {

                        //Continue processing after capturing this value. We'll use this if the Timestamp is null
                        //but otherwise use this
                        String dateStr = (String) attr.getValue();
                        timestamp = format.parse(dateStr);
                    }
                }catch(Exception e) {
                    logger.error("Failed to parse date string for attribute "+attr.getValue(), e);
                }
            }
        }

        return timestamp;
    }

}

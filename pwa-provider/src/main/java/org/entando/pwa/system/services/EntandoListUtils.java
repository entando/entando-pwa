package org.entando.pwa.system.services;

import com.agiletec.aps.system.common.FieldSearchFilter;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Stream;

public class EntandoListUtils {

    public static <E> List<E> subList(List<E> list, FieldSearchFilter[] filters) {
        int firstIndex = Math.max(getOffset(filters), 0);
        int lastIndex = Math.min(firstIndex + getLimit(filters), list.size());

        if (firstIndex > list.size()) {
            return new ArrayList<>();
        }
        return list.subList(firstIndex, lastIndex);
    }

    public static int getOffset(FieldSearchFilter[] filters) {
        int offset = 0;
        if (null == filters || filters.length == 0) {
            return offset;
        }

        OptionalInt minOffset = Stream.of(filters)
                .filter(filter -> filter.getOffset() != null)
                .mapToInt(FieldSearchFilter::getOffset).findFirst();

        return minOffset.orElse(offset);
    }

    public static int getLimit(FieldSearchFilter[] filters) {
        int limit = Integer.MAX_VALUE;
        if (null == filters || filters.length == 0) {
            return limit;
        }

        OptionalInt minLimit = Stream.of(filters)
                .filter(filter -> filter.getLimit() != null)
                .mapToInt(FieldSearchFilter::getLimit).findFirst();

        return minLimit.orElse(limit);
    }
}

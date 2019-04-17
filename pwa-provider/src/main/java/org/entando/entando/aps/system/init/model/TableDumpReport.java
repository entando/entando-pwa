/*
 * Copyright 2015-Present Entando S.r.l. (http://www.entando.com) All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
package org.entando.entando.aps.system.init.model;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.jdom.Element;

/**
 * @author E.Santoboni
 */
public class TableDumpReport {
	
	public TableDumpReport(String tableName) {
		this.setTableName(tableName);
	}
	
	protected TableDumpReport(Element element) {
		String tableName = element.getAttributeValue(NAME_ATTRIBUTE);
		this.setTableName(tableName);
		String rowsString = element.getAttributeValue(ROWS_ATTRIBUTE);
		this.setRows(Integer.parseInt(rowsString));
		String requiredTimeString = element.getAttributeValue(REQUIRED_TIME_ATTRIBUTE);
		this.setRequiredTime(Integer.parseInt(requiredTimeString));
	}
	
	public long getRequiredTime() {
		return _requiredTime;
	}
	public void setRequiredTime(long requiredTime) {
		this._requiredTime = requiredTime;
	}
	
	public int getRows() {
		return _rows;
	}
	public void setRows(int rows) {
		this._rows = rows;
	}
	
	public String getTableName() {
		return _tableName;
	}
	protected void setTableName(String tableName) {
		this._tableName = tableName;
	}

    public HSSFWorkbook getWorkbook() {
        return workbook;
    }
    public void setWorkbook(HSSFWorkbook workbook) {
        this.workbook = workbook;
    }
	
	protected Element toJdomElement() {
		Element element = new Element(TABLE_ELEMENT);
		element.setAttribute(NAME_ATTRIBUTE, this.getTableName());
		element.setAttribute(REQUIRED_TIME_ATTRIBUTE, String.valueOf(this.getRequiredTime()));
		element.setAttribute(ROWS_ATTRIBUTE, String.valueOf(this.getRows()));
		return element;
	}
	
	private String _tableName;
	private int _rows;
	private long _requiredTime;
    private HSSFWorkbook workbook;
	
	private static final String TABLE_ELEMENT = "table";
	private static final String NAME_ATTRIBUTE = "name";
	private static final String REQUIRED_TIME_ATTRIBUTE = "requiredTime";
	private static final String ROWS_ATTRIBUTE = "rows";
	
}

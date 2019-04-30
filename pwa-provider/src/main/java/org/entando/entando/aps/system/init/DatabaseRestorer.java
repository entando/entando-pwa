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
package org.entando.entando.aps.system.init;

import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.aps.util.DateConverter;
import com.agiletec.aps.util.FileTextReader;
import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.field.DatabaseField;

import java.io.File;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import org.entando.entando.aps.system.init.model.Component;
import org.entando.entando.aps.system.init.util.QueryExtractor;
import org.entando.entando.aps.system.init.util.TableDataUtils;
import org.entando.entando.aps.system.init.util.TableFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author E.Santoboni
 */
public class DatabaseRestorer extends AbstractDatabaseUtils {

    private static final Logger _logger = LoggerFactory.getLogger(DatabaseRestorer.class);

    protected void initOracleSchema(DataSource dataSource) throws Throwable {
        IDatabaseManager.DatabaseType type = this.getType(dataSource);
        try {
            if (!type.equals(IDatabaseManager.DatabaseType.ORACLE)) {
                return;
            }
            String[] queryTimestampFormat = new String[]{"ALTER SESSION SET NLS_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS.FF'"};
            TableDataUtils.executeQueries(dataSource, queryTimestampFormat, false);
        } catch (Throwable t) {
            _logger.error("Error initializing oracle schema ", t);
            throw new ApsSystemException("Error initializing oracle schema", t);
        }
    }

    protected void initDerbySchema(DataSource dataSource) throws Throwable {
        String username = this.invokeGetMethod("getUsername", dataSource);
        try {
            String[] queryCreateSchema = new String[]{"CREATE SCHEMA " + username.toUpperCase()};
            TableDataUtils.executeQueries(dataSource, queryCreateSchema, false);
        } catch (Throwable t) {
            _logger.info("Error creating derby schema" + t);
            throw new ApsSystemException("Error creating derby schema", t);
        }
        try {
            String[] initSchemaQuery = new String[]{"SET SCHEMA \"" + username.toUpperCase() + "\""};
            TableDataUtils.executeQueries(dataSource, initSchemaQuery, true);
        } catch (Throwable t) {
            _logger.error("Error initializating Derby Schema", t);
            throw new ApsSystemException("Error initializating Derby Schema", t);
        }
    }

    protected void dropAndRestoreBackup(String backupSubFolder) throws ApsSystemException {
        try {
            List<Component> components = this.getComponents();
            int size = components.size();
            for (int i = 0; i < components.size(); i++) {
                Component componentConfiguration = components.get(size - i - 1);
                this.dropTables(componentConfiguration.getTableMapping());
            }
            this.dropTables(this.getEntandoTableMapping());
            this.restoreBackup(backupSubFolder);
        } catch (Throwable t) {
            _logger.error("Error while restoring backup: {}", backupSubFolder, t);
            throw new ApsSystemException("Error while restoring backup", t);
        }
    }

    private void dropTables(Map<String, List<String>> tableMapping) throws ApsSystemException {
        if (null == tableMapping) {
            return;
        }
        try {
            String[] dataSourceNames = this.extractBeanNames(DataSource.class);
            for (int i = 0; i < dataSourceNames.length; i++) {
                String dataSourceName = dataSourceNames[i];
                List<String> tableClasses = tableMapping.get(dataSourceName);
                if (null == tableClasses || tableClasses.isEmpty()) {
                    continue;
                }
                DataSource dataSource = (DataSource) this.getBeanFactory().getBean(dataSourceName);
                int size = tableClasses.size();
                for (int j = 0; j < tableClasses.size(); j++) {
                    String tableClassName = tableClasses.get(size - j - 1);
                    Class tableClass = Class.forName(tableClassName);
                    String tableName = TableFactory.getTableName(tableClass);
                    String[] queries = {"DELETE FROM " + tableName};
                    TableDataUtils.executeQueries(dataSource, queries, true);
                }
            }
        } catch (Throwable t) {
            _logger.error("Error while dropping tables", t);
            throw new RuntimeException("Error while dropping tables", t);
        }
    }

    protected void restoreBackup(String backupSubFolder) throws ApsSystemException {
        try {
            this.restoreLocalDump(this.getEntandoTableMapping(), backupSubFolder);
            List<Component> components = this.getComponents();
            for (int i = 0; i < components.size(); i++) {
                Component componentConfiguration = components.get(i);
                this.restoreLocalDump(componentConfiguration.getTableMapping(), backupSubFolder);
            }
        } catch (Throwable t) {
            _logger.error("Error while restoring local backup", t);
            throw new ApsSystemException("Error while restoring local backup", t);
        }
    }

    private void restoreLocalDump(Map<String, List<String>> tableMapping, String backupSubFolder) throws ApsSystemException {
        if (null == tableMapping) {
            return;
        }
        try {
            StringBuilder folder = new StringBuilder(this.getLocalBackupsFolder())
                    .append(backupSubFolder).append(File.separator);
            String[] dataSourceNames = this.extractBeanNames(DataSource.class);
            for (int i = 0; i < dataSourceNames.length; i++) {
                String dataSourceName = dataSourceNames[i];
                List<String> tableClasses = tableMapping.get(dataSourceName);
                if (null == tableClasses || tableClasses.isEmpty()) {
                    continue;
                }
                DataSource dataSource = (DataSource) this.getBeanFactory().getBean(dataSourceName);
                this.initOracleSchema(dataSource);
                for (int j = 0; j < tableClasses.size(); j++) {
                    String tableClassName = tableClasses.get(j);
                    Class tableClass = Class.forName(tableClassName);
                    String tableName = TableFactory.getTableName(tableClass);
                    String xlsFileName = folder.toString() + dataSourceName + File.separator + tableName + ".xls";
                    InputStream xlsIs = this.getStorageManager().getStream(xlsFileName, true);
                    if (null != xlsIs) {
                        // creation of "excel dump"
                        TableFactory tableFactory = new TableFactory(dataSourceName, dataSource, super.getType(dataSource));
                        Dao dao = tableFactory.getTableDao(tableClass);
                        HSSFWorkbook workbook = new HSSFWorkbook(xlsIs);
                        HSSFSheet worksheet = workbook.getSheet(tableName);
                        HSSFRow header = worksheet.getRow(0);
                        List<String> fieldNames = new ArrayList<>();
                        int columnIndex = 0;
                        while (null != header.getCell(columnIndex) && StringUtils.isNotBlank(header.getCell(columnIndex).getStringCellValue())) {
                            fieldNames.add(header.getCell(columnIndex).getStringCellValue());
                            columnIndex++;
                        }
                        int rowIndex = 1;
                        boolean hasRow = false;
                        do {
                            HSSFRow row = worksheet.getRow(rowIndex);
                            String[] values = new String[fieldNames.size()];
                            for (int k = 0; k < fieldNames.size(); k++) {
                                values[k] = (null != row && null != row.getCell(k)) ? row.getCell(k).getStringCellValue() : null;
                            }
                            hasRow = Arrays.asList(values).stream().filter(v -> StringUtils.isNoneBlank(v)).findAny().isPresent();
                            if (hasRow) {
                                Object object = tableClass.newInstance();
                                for (int k = 0; k < fieldNames.size(); k++) {
                                    Field field = this.getFieldByColumnName(tableClass, fieldNames.get(k), true);
                                    if (null == field) {
                                        continue;
                                    }
                                    String value = values[k];
                                    if (null == value) {
                                        continue;
                                    }
                                    try {
                                        if (null != field.getType().getField("TABLE_NAME")) {
                                            Object forein = field.getType().newInstance();
                                            Field key = this.getPrimaryFieldField(field.getType());
                                            boolean accessible = key.isAccessible();
                                            key.setAccessible(true);
                                            Object v = ConvertUtils.convert(value, key.getType());
                                            key.set(forein, v);
                                            key.setAccessible(accessible);
                                            boolean accessible2 = field.isAccessible();
                                            field.setAccessible(true);
                                            field.set(object, forein);
                                            field.setAccessible(accessible2);
                                        }
                                    } catch (Exception e) {
                                        Object v = null;
                                        if (field.getType().equals(Date.class)) {
                                            v = DateConverter.parseDate(value, "yyyy-MM-dd HH:mm:ss");
                                        } else {
                                            v = ConvertUtils.convert(value, field.getType());
                                        }
                                        boolean accessible = field.isAccessible();
                                        field.setAccessible(true);
                                        field.set(object, v);
                                        field.setAccessible(accessible);
                                    }
                                }
                                dao.create(object);
                            }
                            rowIndex++;
                        } while (hasRow);
                    } else {
                        String fileName = folder.toString() + dataSourceName + File.separator + tableName + ".sql";
                        InputStream is = this.getStorageManager().getStream(fileName, true);
                        if (null != is) {
                            this.restoreTableData(is, dataSource);
                        }
                    }
                }
            }
        } catch (Throwable t) {
            _logger.error("Error while restoring local dump", t);
            throw new RuntimeException("Error while restoring local dump", t);
        }
    }

    private Field getFieldByColumnName(Class tableClass, String columnName, boolean contineOnSuper) {
        Field[] fields = tableClass.getDeclaredFields();
        for (Field field : fields) {
            Annotation annotation = field.getAnnotation(DatabaseField.class);
            if (null == annotation) {
                continue;
            }
            if (annotation instanceof DatabaseField) {
                DatabaseField myAnnotation = (DatabaseField) annotation;
                if (myAnnotation.columnName().equals(columnName)) {
                    return field;
                }
            }
        }
        if (contineOnSuper) {
            return this.getFieldByColumnName(tableClass.getSuperclass(), columnName, false);
        }
        return null;
    }

    private Field getPrimaryFieldField(Class tableClass) {
        Field[] fields = tableClass.getDeclaredFields();
        for (Field field : fields) {
            Annotation annotation = field.getAnnotation(DatabaseField.class);
            if (null == annotation) {
                continue;
            }
            if (annotation instanceof DatabaseField) {
                DatabaseField myAnnotation = (DatabaseField) annotation;
                if (myAnnotation.id() || myAnnotation.generatedId()) {
                    return field;
                }
            }
        }
        return null;
    }

    private void restoreTableData(InputStream is, DataSource dataSource) {
        try {
            String script = FileTextReader.getText(is, "UTF-8");
            String[] queries = (null != script) ? QueryExtractor.extractInsertQueries(script) : null;
            if (null == queries) {
                return;
            }
            TableDataUtils.executeQueries(dataSource, queries, true);
        } catch (Throwable t) {
            _logger.error("Error executing queries", t);
        }
    }

}

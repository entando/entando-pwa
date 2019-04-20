/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.entando.entando.aps.system.init.util;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.j256.ormlite.field.FieldType;
import com.j256.ormlite.jdbc.JdbcCompiledStatement;
import com.j256.ormlite.jdbc.JdbcDatabaseConnection;
import com.j256.ormlite.logger.Logger;
import com.j256.ormlite.logger.LoggerFactory;
import com.j256.ormlite.stmt.StatementBuilder.StatementType;
import com.j256.ormlite.support.CompiledStatement;
import com.j256.ormlite.support.DatabaseConnection;

/**
 *
 * @author eu
 */
public class ApsJdbcDatabaseConnection extends JdbcDatabaseConnection {

    private static Logger logger = LoggerFactory.getLogger(ApsJdbcDatabaseConnection.class);

    private Connection connection;

    public ApsJdbcDatabaseConnection(Connection connection) {
        super(connection);
        this.connection = connection;
    }

    @Override
    public CompiledStatement compileStatement(String statement, StatementType type, FieldType[] argFieldTypes)
            throws SQLException {
        return compileStatement(statement, type, argFieldTypes, DEFAULT_RESULT_FLAGS);
    }

    @Override
    public CompiledStatement compileStatement(String statement, StatementType type, FieldType[] argFieldTypes,
            int resultFlags) throws SQLException {
        if (resultFlags == DatabaseConnection.DEFAULT_RESULT_FLAGS) {
            resultFlags = ResultSet.TYPE_FORWARD_ONLY;
        }
        CompiledStatement compiledStatement = null;
        if (statement.startsWith("CREATE OR REPLACE TRIGGER")) {
            compiledStatement
                    = new ApsJdbcCompiledStatement(connection.createStatement(), statement, type);
        } else {
            compiledStatement
                    = new JdbcCompiledStatement(connection.prepareStatement(statement, resultFlags,
                            ResultSet.CONCUR_READ_ONLY), type);
        }
        logger.trace("compiled statement: {}", statement);
        return compiledStatement;
    }

}

//Citation: the source code is from the CPSC 304 TA
const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMax: 1,
};

let pool;
async function setupPool() {
    pool = await oracledb.createPool(dbConfig);
}

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await pool.getConnection();
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

 //---------------------------------------our code starts here------------------------------------------------
//material table for display
async function fetchMaterialFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM materials_provides_sendsTo');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//INSERT QUERY
async function insertMaterialstable(material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES (:material_ID, :material_name, :provides_amount, :sendsTo_amount, :supplier_name, :factory_ID)`,
            [material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID],
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

//DELETE query
async function deleteFactory(factory_ID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM FACTORY WHERE factory_ID=:factory_ID`,
            [factory_ID],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

//UPDATE query
async function updateTruck(model_name,  weight_capacity, carbon_emission, price){
    return await withOracleDB(async (connection) => {
        console.log(model_name);
        console.log(weight_capacity);
        console.log(carbon_emission);
        console.log(price);
        if (weight_capacity != '' && carbon_emission != '' && price != ''){
            console.log("first if")
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2 SET weight_capacity=:weight_capacity, carbon_emission=:carbon_emission, price=:price where model_name=:model_name`,
                [weight_capacity, carbon_emission, price, model_name],
                { autoCommit: true }
            );
            console.log(result)
            return result.rowsAffected && result.rowsAffected > 0;
        }else if(weight_capacity != '' && carbon_emission != ''){
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2 SET weight_capacity=:weight_capacity, carbon_emission=:carbon_emission where model_name=:model_name`,
                [weight_capacity, carbon_emission, model_name],
                { autoCommit: true }
            );
            return result.rowsAffected && result.rowsAffected > 0;
        }else if(weight_capacity != '' && price != ''){
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2 SET weight_capacity=:weight_capacity, price=:price where model_name=:model_name`,
                [weight_capacity, price, model_name],
                { autoCommit: true }
            );
            return result.rowsAffected && result.rowsAffected > 0;
        }else if(carbon_emission != '' && price != ''){
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2 SET carbon_emission=:carbon_emission, price=:price where model_name=:model_name`,
                [carbon_emission, price, model_name],
                { autoCommit: true }
            );
            return result.rowsAffected && result.rowsAffected > 0;
        }else if(weight_capacity != ''){
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2 SET weight_capacity=:weight_capacity where model_name=:model_name`,
                [weight_capacity, model_name],
                { autoCommit: true }
            );
            return result.rowsAffected && result.rowsAffected > 0;
        }else if(carbon_emission != ''){
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2 SET carbon_emission =:carbon_emission where model_name=:model_name`,
                [carbon_emission, model_name],
                { autoCommit: true }
            );
            return result.rowsAffected && result.rowsAffected > 0;
        }else if(price != '') {
            const result = await connection.execute(
                `UPDATE vehicle_truck_into_sendTo_R2
                 SET price =:price
                 where model_name = :model_name`,
                [price, model_name],
                {autoCommit: true}
            );
            return result.rowsAffected && result.rowsAffected > 0;
        }
    }).catch(() => {
        return false;
    });
}

//SELECT query
async function selectTable(worker_ID, machine_ID, business_ID) {
    return await withOracleDB(async (connection) => {
        if (worker_ID != '' && machine_ID != '' && business_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE worker_ID=:worker_ID AND machine_ID=:machine_ID AND business_ID=:business_ID`,
                [worker_ID, machine_ID, business_ID],
                { autoCommit: true }
            );
            //console.log("returning rows after query");
            //console.log(result.rows);
            return result.rows;
        }else if(worker_ID != '' && machine_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE worker_ID=:worker_ID AND machine_ID=:machine_ID`,
                [worker_ID, machine_ID],
                { autoCommit: true }
            );
            //console.log("returning rows after query");
            //console.log(result.rows);
            return result.rows;

        }else if(worker_ID != '' && business_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE worker_ID=:worker_ID AND business_ID=:business_ID`,
                [worker_ID, business_ID],
                { autoCommit: true }
            );
            //console.log("returning rows after query");
            //console.log(result.rows);
            return result.rows;

        }else if(machine_ID != '' && business_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE machine_ID=:machine_ID AND business_ID=:business_ID`,
                [machine_ID, business_ID],
                { autoCommit: true }
            );
            console.log("returning rows after query");
            console.log(result.rows);
            return result.rows;

        }else if(worker_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE worker_ID=:worker_ID`,
                [worker_ID],
                { autoCommit: true }
            );
            console.log("returning rows after query");
            console.log(result.rows);
            return result.rows;

        }else if(machine_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE machine_ID=:machine_ID`,
                [machine_ID],
                { autoCommit: true }
            );
            console.log("returning rows after query");
            console.log(result.rows);
            return result.rows;

        }else if(business_ID != ''){
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1 WHERE business_ID=:business_ID`,
                [business_ID],
                { autoCommit: true }
            );
            console.log("returning rows after query");
            console.log(result.rows);
            return result.rows;

        }else{
            const result = await connection.execute(
                `SELECT * FROM vehicle_truck_into_sendTo_R1`,
            );
            console.log("returning rows after query");
            console.log(result.rows);
            return result.rows;
        }
        console.log("returning rows after query");
        console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//factory table for display
async function fetchFactoryTableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM factory');
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//truck table for display
async function fetchTruckTableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM vehicle_truck_into_sendTo_R2');
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//Nested Aggregation with GROUP BY query
async function getMinimumBelowAverageVehicles() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            "SELECT min(v.price),weight_capacity from vehicle_truck_into_sendTo_R2  v WHERE v.price < (SELECT AVG(v2.price) FROM vehicle_truck_into_sendTo_R2 v2) GROUP BY weight_capacity"
            );
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//Aggregation with GROUP BY query
async function avgPrice() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute("SELECT passenger_capacity,AVG(price) FROM vehicle_sedan_into_transportTo_R5 GROUP BY passenger_capacity");
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//aggregation by HAVING query
async function getMinPrice() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute("SELECT min(price), color FROM VEHICLE_SEDAN_INTO_TRANSPORTTO_R5 GROUP BY color HAVING COUNT(*)>1");
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//Join query
async function getDiscountCustomer(string) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(string);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//DIVISION query
async function getCustomersDivision() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            "SELECT customer_name FROM customer c WHERE NOT EXISTS(SELECT s.employee_ID FROM salesperson s WHERE NOT EXISTS(SELECT s2.customer_ID FROM sellsTo s2 WHERE s2.customer_ID = c.customer_ID and s.employee_ID = s2.employee_ID ))"
            );
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//salesperson table for display
async function getSalespersons() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM salesperson');
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//customer table for display
async function getCustomers() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM customer');
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//sells to table for display
async function getSellsTo() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM sellsTo');
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//sedan table for display
async function getSedans() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM vehicle_sedan_into_transportTo_R5');
        //console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//get tables for projection
async function getTableList() { 
    return await withOracleDB(async (connection) => {
        const result = await connection.execute("SELECT table_name FROM user_tables");
        console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//projection query
async function projection(string) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(string);
        console.log(result.rows)
        return result.rows;
    }).catch(() => {
        return [];
    });
}

////get attribute for projection
async function getAttr(tableChoice) {
    return await withOracleDB(async (connection) => {
        console.log(tableChoice);
        const string = 'select column_name from user_tab_columns where table_name = \'' + tableChoice + '\' ORDER BY column_id'
        console.log(string);
        const result = await connection.execute(string);
        //console.log("returning rows after query");
        console.log(result.rows);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    testOracleConnection,

    //our code starts here
    fetchMaterialFromDb,
    insertMaterialstable,
    deleteFactory,
    updateTruck,
    selectTable,
    fetchFactoryTableFromDb,
    fetchTruckTableFromDb,
    avgPrice,
    getMinPrice,
    getDiscountCustomer,
    getMinimumBelowAverageVehicles,
    getCustomers,
    getTableList,
    getSalespersons,
    getSellsTo,
    getCustomersDivision,
    getSedans,
    getAttr,
    projection,
    setupPool
};


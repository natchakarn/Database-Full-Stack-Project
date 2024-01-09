//Citation: the source code is from the CPSC 304 TA
const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.

//check db connection
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

//--------------------------------our code starts here---------------------------------------------------
//material table for display
router.get('/materialtable', async (req, res) => {
    const tableContent = await appService.fetchMaterialFromDb();
    res.json({data: tableContent});
});

//INSERT query
router.post("/insert-Materialstable", async (req, res) => {
    const {material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID} = req.body;
    const insertResult = await appService.insertMaterialstable(material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

//DELETE query
router.post("/deleteFactory", async (req, res) => {
    const {factory_ID } = req.body;
    const updateResult = await appService.deleteFactory(factory_ID);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

//UPDATE query
router.post("/update-truck", async (req, res) => {
    const {model_name,  weight_capacity, carbon_emission, price} = req.body;
    const updateResult = await appService.updateTruck(model_name,  weight_capacity, carbon_emission, price);
    console.log(updateResult);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

//SELECT query
router.post("/selectTable", async (req, res) => {
    const {worker_ID, machine_ID, business_ID} = req.body;
    const updateResult = await appService.selectTable(worker_ID, machine_ID, business_ID);
    //console.log(updateResult);
    //console.log(updateResult.length);
    if (updateResult.length !== 0) {
        console.log("return data");
        res.json({data: updateResult});
    } else {
        console.log("return false");
        res.json({data: updateResult});
    }
});

//factory table for display
router.get('/factoryTable', async (req, res) => {
    const tableContent = await appService.fetchFactoryTableFromDb();
    console.log(tableContent);
    res.json({data: tableContent});
});

//truck table for display
router.get('/truckTable', async (req, res) => {
    const tableContent = await appService.fetchTruckTableFromDb();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//get attribute for projection
router.post("/getAttribute", async (req, res) => {
    const {tableChoice} = req.body;
    const updateResult = await appService.getAttr(tableChoice);
    console.log(updateResult);
    //console.log(updateResult.length);
    if (updateResult.length !== 0) {
        console.log("return data");
        res.json({data: updateResult});
    } else {
        console.log("return false");
        res.json({data: updateResult});
    }
});

//PROJECTION query
router.post("/projection", async (req, res) => {
    const { string } = req.body;
    const contents = await appService.projection(string);
    console.log(contents);
    if (contents.length !== 0) {
        console.log("return data");
        res.json({data: contents});
    } else {
        console.log("return false");
        res.json({data: contents});
    }
});

//Aggregation with GROUP BY query
router.get('/avg-price', async (req, res) => {
    const contents = await appService.avgPrice();
    if (contents) {
        res.json({ success: true, data: contents });
    } else {
        res.status(500).json({ success: false, data: contents });
    }
});

//aggregation by HAVING query
router.get('/minPrice', async (req, res) => {
    const contents = await appService.getMinPrice();
    if (contents) {
        res.json({ success: true, data: contents });
    } else {
        res.status(500).json({ success: false, data: contents });
    }
});

//Join query
router.post('/discount', async (req, res) => {
    const { string } = req.body;
    const contents = await appService.getDiscountCustomer(string);
    if (contents) {
        res.json({ success: true, data: contents });
    } else {
        res.status(500).json({ success: false, data: contents });
    }
});

//Nested Aggregation with GROUP BY query
router.get('/nestedAggregation', async (req, res) => {
    const tableContent = await appService.getMinimumBelowAverageVehicles();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//DIVISION query
router.get('/division', async (req, res) => {
    const tableContent = await appService.getCustomersDivision();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//salesperson table for display
router.get('/salespersonTable', async (req, res) => {
    const tableContent = await appService.getSalespersons();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//customer table for display
router.get('/customerTable', async (req, res) => {
    const tableContent = await appService.getCustomers();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//sedan table for display
router.get('/sedanTable', async (req, res) => {
    const tableContent = await appService.getSedans();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//sells to table for display
router.get('/sellsToTable', async (req, res) => {
    const tableContent = await appService.getSellsTo();
    //console.log(tableContent);
    res.json({data: tableContent});
});

//get tables for projection
router.get('/get-tables', async (req, res) => {
    const tables = await appService.getTableList();
    res.json({data: tables});
});


module.exports = router;
module.exports.setupPool = appService.setupPool;
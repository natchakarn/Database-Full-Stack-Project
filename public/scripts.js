//Citation: the source code is from the CPSC 304 TA
/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */

// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}


//-------------------------our code starts here --------------------------------
//display material table
async function fetchMaterialTable() {
    const tableElement = document.getElementById('materialtable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/materialtable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const materialContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    materialContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// INSERT QUERY
async function insertMaterialsTable(event) {
    event.preventDefault();

    const material_ID = document.getElementById('material_ID').value;
    const material_name = document.getElementById('material_name').value;
    const provides_amount = document.getElementById('provides_amount').value;
    const sendsTo_amount = document.getElementById('sendsTo_amount').value;
    const supplier_name = document.getElementById('supplier_name').value;
    const factory_ID = document.getElementById('factory_ID').value;

    const response = await fetch('/insert-Materialstable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            material_ID: material_ID,
            material_name: material_name,
            provides_amount: provides_amount,
            sendsTo_amount : sendsTo_amount,
            supplier_name : supplier_name,
            factory_ID : factory_ID
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertMaterialsResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Material Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

//DELETE QUERY
async function deletetable(event) {
    event.preventDefault();

    const factory_ID = document.getElementById('delete_factory_ID').value;

    const response = await fetch('/deleteFactory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            factory_ID:factory_ID
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Factory deleted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error delete factory!";
    }
}

//UPDATE QUERY
async function updateTruckTable(event) {
    event.preventDefault();

    const model_name = document.getElementById('model_name').value;
    const weight_capacity = document.getElementById('weight_capacity').value;
    const carbon_emission = document.getElementById('carbon_emission').value;
    const price = document.getElementById('price').value;

    //update weight capacity
    const response = await fetch('/update-truck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model_name:model_name,
            weight_capacity: weight_capacity,
            carbon_emission: carbon_emission,
            price: price
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateTruckResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Truck table updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating Truck Table!";
    }

}

// merge
//SELECTION QUERY
async function selection() {
    event.preventDefault();
    const worker_ID = document.getElementById('worker_ID').value;
    const machine_ID = document.getElementById('machine_ID').value;
    const business_ID = document.getElementById('business_ID').value;

    const tableElement = document.getElementById('selectTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/selectTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            worker_ID: worker_ID,
            machine_ID: machine_ID,
            business_ID: business_ID
        })
    });
    const responseData = await response.json();


    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }


    const Content = responseData.data;

    if (Content.length === 0) {
        // error
        selectResultMsg.textContent = "Error finding results!";
    } else {
        //success
        selectResultMsg.textContent = "Results found succesfully!";
        Content.forEach(user => {
            const row = tableBody.insertRow();
            user.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
    }
}

//factory table for display
async function factoryTable() {
    const tableElement = document.getElementById('factoryTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/factoryTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const factoryContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    factoryContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//truck table for display
async function truckTable() {
    const tableElement = document.getElementById('truckTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/truckTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//get attribute for projection
async function getAttribute(){
    event.preventDefault();
    const tableChoice = document.getElementById('tableChoice').value;

    const response = await fetch('/getAttribute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tableChoice: tableChoice
        })
    });
    const responseData = await response.json();
    const Content = responseData.data;
    console.log(Content);


    const messageElement = document.getElementById('possibleAttr');
    if (Content.length === 0) {
        messageElement.textContent = "Error finding attributes! ";
    } else {
        messageElement.textContent = Content;
    }

}

//PROJECTION query
async function projection(event) {
    event.preventDefault();
    const attr = document.getElementById('attr').value;
    const dropDown = document.getElementById('tableChoice');
    //const table = document.getElementById('findTable');
    //const tableBody = table.querySelector('tbody');

    const string = "SELECT " + attr + " FROM " + dropDown.value;
    console.log(string);

    const response = await fetch('/projection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            string: string
        })
    });

    const responseData = await response.json();
    const Content = responseData.data;


    console.log(Content);

    var inputArr = attr.split(',')

    const table= document.getElementById('projection');

    if (table) {
        table.innerHTML = '';
    }

    var headerRow = table.insertRow(0)

    for (var i = 0; i < inputArr.length; i++) {
        var cell = headerRow.insertCell(i);
        cell.textContent = inputArr[i];
    }

    Content.forEach(user => {
        const row = table.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//Aggregation with GROUP BY query
async function avgPrice() {
    const response = await fetch("/avg-price", {
        method: 'GET'
    });

    const responseData = await response.json();
    const Content = responseData.data;
    console.log(Content);

    const table = document.getElementById('avgtable');
    const tableBody = table.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        //console.log(materialContent[0]);
        Content.forEach(attr => {
            const row = tableBody.insertRow();
            attr.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
        fetchTableData();

    } else {
        alert("Error finding average!");
    }
}

//aggregation by HAVING query
async function minColor() {
    const table = document.getElementById('minTable');
    const tableBody = table.querySelector('tbody');

    const response = await fetch("/minPrice", {
        method: 'GET'
    });

    const responseData = await response.json();
    const materialContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        //console.log(materialContent[0]);
        materialContent.forEach(attr => {
            const row = tableBody.insertRow();
            attr.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
        fetchTableData();

    } else {
        alert("Error finding cheapest car per color");
    }
}

//Join query
async function discountCustomer() {
    const table = document.getElementById('discountTable');
    const amount = document.getElementById('discountAmt');
    const tableBody = table.querySelector('tbody');

    let string = "Select DISTINCT c.customer_ID, c.customer_name From customer c, sellsTo s Where s.discount > 0 and c.customer_ID = s.customer_ID";
    if (amount.value.length > 0) {
        string = "Select DISTINCT c.customer_ID, c.customer_name From customer c, sellsTo s Where s.discount >= " + amount.value + " and c.customer_ID = s.customer_ID";
        console.log(amount.value);
    } 

    const response = await fetch("/discount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            string: string
        })
    });

    const responseData = await response.json();
    const materialContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        //console.log(materialContent[0]);
        materialContent.forEach(attr => {
            const row = tableBody.insertRow();
            attr.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field;
            });
        });
        fetchTableData();

    } else {
        alert("Error finding customers");
    }
}

//Nested Aggregation with GROUP BY query
async function nestedAggregation() {
    const tableElement = document.getElementById('nestedAggregationTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/nestedAggregation', {
        method: 'GET'
    });

    const responseData = await response.json();
    const content = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//Division query
async function division() {
    const tableElement = document.getElementById('divisionTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/division', {
        method: 'GET'
    });

    const responseData = await response.json();
    const content = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    content.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//display truck table 2
async function truckTable2() {
    const tableElement = document.getElementById('truckTable2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/truckTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//display salesperson table
async function salespersonTable() {
    const tableElement = document.getElementById('salespersonTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/salespersonTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//customer table for display
async function customerTable() {
    const tableElement = document.getElementById('customerTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/customerTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//sells to table for display
async function sellsToTable() {
    const tableElement = document.getElementById('sellsToTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/sellsToTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//list tables for projection
async function tableList() {
    const dropDown = document.querySelector("#tableChoice");
    const response = await fetch('/get-tables', {
        method: 'GET'
    });

    const responseData = await response.json();
    const content = responseData.data;


    for (let i = 0; i < content.length; i++) {
        let option = new Option(content[i][0], content[i][0]);
        dropDown.add(option, undefined);
    }
}

//sedan table for display
async function sedanTable() {
    const tableElement = document.getElementById('sedanTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/sedanTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//sedan table 2 for display
async function sedanTable2() {
    const tableElement = document.getElementById('sedanTable2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/sedanTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//customer table 2 for display
async function customerTable2() {
    const tableElement = document.getElementById('customerTable2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/customerTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

//sells to table 2 for display
async function sellsToTable2() {
    const tableElement = document.getElementById('sellsToTable2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/sellsToTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const truckContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    truckContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}
    

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    tableList();
    document.getElementById("insertMaterialsTable").addEventListener("submit", insertMaterialsTable);
    document.getElementById("deleteFactory").addEventListener("submit", deletetable);
    document.getElementById("updateTruckInformation").addEventListener("submit", updateTruckTable);
    document.getElementById("selection").addEventListener("submit", selection);
    document.getElementById("avgPriceButton").addEventListener("click", avgPrice);
    document.getElementById("minColor").addEventListener("click", minColor);
    document.getElementById("discount").addEventListener("click", discountCustomer);
    document.getElementById("nestedAggregation").addEventListener("click", nestedAggregation);
    document.getElementById("division").addEventListener("click", division);
    document.getElementById("tableChoice").addEventListener('input', getAttribute);
    document.getElementById("attribute").addEventListener("submit", projection);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchMaterialTable();
    factoryTable();
    truckTable();
    truckTable2();
    salespersonTable();
    customerTable();
    sellsToTable();
    sedanTable();
    sedanTable2();
    customerTable2();
    sellsToTable2();
}

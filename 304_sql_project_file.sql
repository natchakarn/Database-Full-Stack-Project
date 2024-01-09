/*drop all tables */
drop table MATERIALS_PROVIDES_SENDSTO;
drop table SUPPLIERS;
drop table ASSEMBLE;
drop table INSURANCE_INSURES_R1;
drop table INSURANCE_INSURES_R2;
drop table VEHICLE_TRUCK_INTO_SENDTO_R1;
drop table VEHICLE_TRUCK_INTO_SENDTO_R2;
drop table VEHICLE_TRUCK_INTO_SENDTO_R3;
drop table VEHICLE_TRUCK_INTO_SENDTO_R4;
drop table VEHICLE_TRUCK_INTO_SENDTO_R5;
drop table VEHICLE_SEDAN_INTO_TRANSPORTTO_R1;
drop table VEHICLE_SEDAN_INTO_TRANSPORTTO_R5;
drop table VEHICLE_SEDAN_INTO_TRANSPORTTO_R3;
drop table VEHICLE_SEDAN_INTO_TRANSPORTTO_R4;
drop table MACHINE_R1;
drop table MACHINE_R2;
drop table FACTORY;
drop table WORKER;
drop table BUSINESS;
drop table SELLSTO;
drop table SALESPERSON;
drop table CUSTOMER;









/* create suppliers */
CREATE TABLE suppliers (
    supplier_name VARCHAR(255) PRIMARY KEY,
    supplier_address VARCHAR(255)
);

/*insert suppliers */
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Maplewood Steelworks', '123 Oak Street, Toronto, ON M5V 2G9');
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Northern Auto Parts', '456 Birch Avenue, Vancouver, BC V6B 3C6');
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Prairie Metalworks', '789 Elm Road, Calgary, AB T2P 1A1');
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Great Lakes Plastics', '101 Pine Lane, Ottawa, ON K1N 5W8');
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Pacific Alloys', '222 Cedar Drive, Edmonton, AB T5J 0X2');
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Rocky Mountain Rubber', '333 Spruce Street, Montreal, QC H3B 1T7');
INSERT INTO suppliers (supplier_name, supplier_address) VALUES
    ('Western Fasteners', '444 Aspen Road, Winnipeg, MB R3B 0H1');

/*factory*/
CREATE TABLE factory (
    factory_ID INT PRIMARY KEY,
    factory_City VARCHAR(255)
);

/*insert factory*/
INSERT INTO factory (factory_ID, factory_City) VALUES
    (1, 'Vancouver');
INSERT INTO factory (factory_ID, factory_City) VALUES
    (2, 'Calgary');
INSERT INTO factory (factory_ID, factory_City) VALUES
    (3, 'Edmonton');
INSERT INTO factory (factory_ID, factory_City) VALUES
    (4, 'Victoria');
INSERT INTO factory (factory_ID, factory_City) VALUES
    (5, 'Saskatoon');
INSERT INTO factory (factory_ID, factory_City) VALUES
    (6, 'Regina');
INSERT INTO factory (factory_ID, factory_City) VALUES
    (7, 'Winnipeg');

/*create materials_provides_sendsTo */
CREATE TABLE materials_provides_sendsTo (
    material_ID INTEGER PRIMARY KEY,
    material_name VARCHAR(255),
    provides_amount INTEGER NOT NULL,
    sendsTo_amount INTEGER,
    supplier_name VARCHAR(255) NOT NULL,
    factory_ID INTEGER,
    FOREIGN KEY (supplier_name) REFERENCES suppliers(supplier_name) ON DELETE CASCADE,
    FOREIGN KEY (factory_ID) REFERENCES factory(factory_ID)ON DELETE CASCADE
);

/*insert materials_provides_sendsTo */
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (1, 'Steel Plating', 500, 450, 'Maplewood Steelworks', 1);
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (2, 'Plastic Moldings', 800, 700, 'Great Lakes Plastics', 2);
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (3, 'Aluminum Extrusions', 350, 300, 'Pacific Alloys', 3);
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (4, 'Rubber Tires', 1200, 1100, 'Rocky Mountain Rubber', 4);
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (5, 'Wiring Harnesses', 600, 550, 'Northern Auto Parts', 5);
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (6, 'Glass Panels', 900, 800, 'Prairie Metalworks', 6);
INSERT INTO materials_provides_sendsTo (material_ID, material_name, provides_amount, sendsTo_amount, supplier_name, factory_ID) VALUES
    (7, 'Fasteners', 450, 400, 'Western Fasteners', 7);

/*create machine R2*/
CREATE TABLE machine_R2 (
    model VARCHAR(255) PRIMARY KEY,
    energy_usage INTEGER
);

INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('Model123', 500);
INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('X987', 800);
INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('A456-M', 350);
INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('Zeta-2000', 1200);
INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('AlphaX1', 600);
INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('Pro100', 900);
INSERT INTO machine_R2 (model, energy_usage) VALUES
    ('Gamma500', 450);

/*create machine R1*/
CREATE TABLE machine_R1 (
    machine_ID INTEGER PRIMARY KEY,
    model VARCHAR(255) unique,
    FOREIGN KEY (model) references machine_R2(model) ON DELETE CASCADE
);

INSERT INTO machine_R1 (machine_ID, model) VALUES
    (1, 'Model123');
INSERT INTO machine_R1 (machine_ID, model) VALUES
    (2, 'X987');
INSERT INTO machine_R1 (machine_ID, model) VALUES
    (3, 'A456-M');
INSERT INTO machine_R1 (machine_ID, model) VALUES
    (4, 'Zeta-2000');
INSERT INTO machine_R1 (machine_ID, model) VALUES
    (5, 'AlphaX1');
INSERT INTO machine_R1 (machine_ID, model) VALUES
    (6, 'Pro100');
INSERT INTO machine_R1 (machine_ID, model) VALUES
    (7, 'Gamma500');

/* create worker */
CREATE TABLE worker (
    worker_ID INT PRIMARY KEY,
    worker_SSN INT UNIQUE
);

/*insert worker*/
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (1, 456781234);
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (2, 785243890);
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (3, 321097645);
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (4, 598123467);
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (5, 234567890);
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (6, 890123456);
INSERT INTO worker (worker_ID, worker_SSN) VALUES
    (7, 543216789);

/*create assemble table*/
CREATE TABLE assemble (
    factory_ID INTEGER NOT NULL,
    worker_ID INTEGER NOT NULL,
    machine_ID INTEGER NOT NULL,
    assemble_date CHAR(10),
    PRIMARY KEY (factory_ID, worker_ID, machine_ID),
    FOREIGN KEY (factory_ID) REFERENCES factory(factory_ID) ON DELETE CASCADE,
    FOREIGN KEY (worker_ID) REFERENCES worker(worker_ID) ON DELETE CASCADE,
    FOREIGN KEY (machine_ID) REFERENCES machine_R1(machine_ID)ON DELETE CASCADE
);

/*insert assemble */
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (1, 3, 7, '2023-10-01');
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (2, 5, 4, '2023-10-02');
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (3, 2, 6, '2023-10-03');
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (4, 1, 3, '2023-10-04');
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (5, 6, 2, '2023-10-05');
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (6, 4, 1, '2023-10-06');
INSERT INTO assemble (factory_ID, worker_ID, machine_ID, assemble_date) VALUES
    (7, 7, 5, '2023-10-07');

/* create business */
CREATE TABLE business (
    business_ID INT PRIMARY KEY,
    business_Name CHAR(50)
);

/*insert business */
INSERT INTO business (business_ID, business_Name) VALUES
    (1, 'Heavy Haul Logistics');
INSERT INTO business (business_ID, business_Name) VALUES
    (2, 'Express Freight Services');
INSERT INTO business (business_ID, business_Name) VALUES
    (3, 'Transport Solutions Inc.');
INSERT INTO business (business_ID, business_Name) VALUES
    (4, 'Cargo Express Delivery');
INSERT INTO business (business_ID, business_Name) VALUES
    (5, 'TruckMaster Transport');
INSERT INTO business (business_ID, business_Name) VALUES
    (6, 'Logistics Expressway');
INSERT INTO business (business_ID, business_Name) VALUES
    (7, 'FreightMovers LLC');
INSERT INTO business (business_ID, business_Name) VALUES
    (8, 'GO Transport!');

/* create salesperson */
CREATE TABLE salesperson (
    employee_ID INT PRIMARY KEY,
    salesperson_SSN INT UNIQUE
);

/* insert salesperson */
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (1, 123456789);
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (2, 987654321);
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (3, 555555555);
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (4, 888888888);
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (5, 111111111);
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (6, 999999999);
INSERT INTO salesperson (employee_ID, salesperson_SSN) VALUES
    (7, 444444444);


/* create customer */
CREATE TABLE customer (
    customer_ID INT PRIMARY KEY,
    customer_Name CHAR(50),
    DOB CHAR(10)
);

/* insert customer */
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (1, 'John Doe', '1980-03-15');
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (2, 'Jane Smith', '1995-07-22');
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (3, 'Alice Johnson', '1989-12-10');
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (4, 'David Williams', '1976-05-28');
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (5, 'Eva Davis', '1992-09-03');
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (6, 'Michael Brown', '1987-02-19');
INSERT INTO customer (Customer_ID, customer_Name, DOB) VALUES
    (7, 'Olivia Taylor', '2000-11-14');

/* create sellsTo */
CREATE TABLE sellsTo (
    employee_ID INTEGER NOT NULL,
    customer_ID INTEGER NOT NULL,
    discount INTEGER,
    PRIMARY KEY (employee_ID, customer_ID),
    FOREIGN KEY (employee_ID) REFERENCES salesperson(employee_ID) ON DELETE CASCADE,
    FOREIGN KEY (customer_ID) REFERENCES customer(customer_ID) ON DELETE CASCADE
);

/* insert sellsTo */
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (1, 2, 15);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (4, 6, 20);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (7, 1, 10);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (3, 5, 5);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (5, 7, 30);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (2, 4, 12);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (6, 3, 25);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (2, 2, 2);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (3, 2, 0);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (4, 2, 0);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (5, 2, 0);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (6, 2, 10);
INSERT INTO sellsTo (employee_ID, customer_ID, discount) VALUES
    (7, 2, 5);

/* create vehicle_truck_into_sendTo_R5 */
CREATE TABLE vehicle_truck_into_sendTo_R5 (
    machine_ID INTEGER PRIMARY KEY,
    factory_ID INTEGER NOT NULL,
    FOREIGN KEY (factory_ID) REFERENCES factory(factory_ID) ON DELETE CASCADE,
    FOREIGN KEY (machine_ID) REFERENCES machine_R1(machine_ID) ON DELETE CASCADE
);

/* insert vehicle_truck_into_sendTo_R5 */
INSERT INTO vehicle_truck_into_sendTo_R5(machine_ID,factory_ID ) VALUES
  (1, 1);
INSERT INTO vehicle_truck_into_sendTo_R5(machine_ID,factory_ID ) VALUES
  (2, 2);
INSERT INTO vehicle_truck_into_sendTo_R5(machine_ID,factory_ID ) VALUES
  (3, 3);
INSERT INTO vehicle_truck_into_sendTo_R5(machine_ID,factory_ID ) VALUES
  (4, 4);
INSERT INTO vehicle_truck_into_sendTo_R5(machine_ID,factory_ID ) VALUES
  (5, 5);
INSERT INTO vehicle_truck_into_sendTo_R5(machine_ID,factory_ID ) VALUES
  (6, 6);

/* create vehicle_truck_into_sendTo_R4 */
CREATE TABLE vehicle_truck_into_sendTo_R4 (
    worker_ID INTEGER PRIMARY KEY,
    factory_ID INTEGER NOT NULL,
    FOREIGN KEY (worker_ID) REFERENCES worker(worker_ID) ON DELETE CASCADE,
    FOREIGN KEY (factory_ID) REFERENCES factory(factory_ID) ON DELETE CASCADE
);

/* insert vehicle_truck_into_sendTo_R4 */
INSERT INTO vehicle_truck_into_sendTo_R4(worker_ID, factory_ID) VALUES
  (1, 1);
INSERT INTO vehicle_truck_into_sendTo_R4(worker_ID, factory_ID) VALUES
  (2, 2);
INSERT INTO vehicle_truck_into_sendTo_R4(worker_ID, factory_ID) VALUES
  (3, 3);
INSERT INTO vehicle_truck_into_sendTo_R4(worker_ID, factory_ID) VALUES
  (4, 4);
INSERT INTO vehicle_truck_into_sendTo_R4(worker_ID, factory_ID) VALUES
  (5, 5);
INSERT INTO vehicle_truck_into_sendTo_R4(worker_ID, factory_ID) VALUES
  (6, 6);

/* create vehicle_truck_into_sendTo_R3  */
CREATE TABLE vehicle_truck_into_sendTo_R3 (
    business_ID INTEGER PRIMARY KEY ,
    model_name VARCHAR(255) UNIQUE ,
    FOREIGN KEY (business_ID) REFERENCES business(business_ID) ON DELETE CASCADE
);

/* insert vehicle_truck_into_sendTo_R3  */
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (1, 'truckA');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (2, 'truckB');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (3, 'truckC');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (4, 'truckD');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (5, 'truckE');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (6, 'truckF');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (7, 'truckG');
INSERT INTO vehicle_truck_into_sendTo_R3(business_ID, model_name) VALUES
  (8, 'truckH');

/* create vehicle_truck_into_sendTo_R2 */
CREATE TABLE vehicle_truck_into_sendTo_R2 (
    model_name VARCHAR(255) PRIMARY KEY,
    weight_capacity INTEGER,
    carbon_emission INTEGER,
    price INTEGER UNIQUE,
    FOREIGN KEY (model_name) REFERENCES vehicle_truck_into_sendTo_R3(model_name) ON DELETE CASCADE
);

/* insert vehicle_truck_into_sendTo_R2 */
INSERT INTO vehicle_truck_into_sendTo_R2(model_name, weight_capacity, carbon_emission, price) VALUES
  ('truckA', 1000, 10, 10000);
INSERT INTO vehicle_truck_into_sendTo_R2(model_name, weight_capacity, carbon_emission, price) VALUES
  ('truckB', 2000, 20, 20000);
INSERT INTO vehicle_truck_into_sendTo_R2(model_name, weight_capacity, carbon_emission, price) VALUES
  ('truckC', 3000, 30, 30000);
INSERT INTO vehicle_truck_into_sendTo_R2(model_name, weight_capacity, carbon_emission, price) VALUES
  ('truckD', 4000, 40, 40000);
INSERT INTO vehicle_truck_into_sendTo_R2(model_name, weight_capacity, carbon_emission, price) VALUES
  ('truckE', 5000, 50, 50000);
INSERT INTO vehicle_truck_into_sendTo_R2(model_name, weight_capacity, carbon_emission, price) VALUES
  ('truckF', 6000, 60, 360000);

/*create vehicle_truck_into_sendTo_R1 */
CREATE TABLE vehicle_truck_into_sendTo_R1 (
    license_plate CHAR(6) PRIMARY KEY,
    worker_ID INTEGER NOT NULL,
    machine_ID INTEGER NOT NULL,
    business_ID INTEGER,
    FOREIGN KEY (worker_ID) references vehicle_truck_into_sendTo_R4(worker_ID) ON DELETE CASCADE ,
    FOREIGN KEY (machine_ID) references vehicle_truck_into_sendTo_R5(machine_ID) ON DELETE CASCADE ,
    FOREIGN KEY (business_ID) references vehicle_truck_into_sendTo_R3(business_ID)ON DELETE CASCADE
);

/*insert vehicle_truck_into_sendTo_R1 */
INSERT INTO vehicle_truck_into_sendTo_R1(license_plate,worker_ID,machine_ID,business_ID) VALUES
  ('A00001', 1, 1, 1);
INSERT INTO vehicle_truck_into_sendTo_R1(license_plate,worker_ID,machine_ID,business_ID) VALUES
  ('A00002', 2, 2, 2);
INSERT INTO vehicle_truck_into_sendTo_R1(license_plate,worker_ID,machine_ID,business_ID) VALUES
  ('A00003', 3, 3, 3);
INSERT INTO vehicle_truck_into_sendTo_R1(license_plate,worker_ID,machine_ID,business_ID) VALUES
  ('A00004', 4, 4, 4);
INSERT INTO vehicle_truck_into_sendTo_R1(license_plate,worker_ID,machine_ID,business_ID) VALUES
  ('A00005', 5, 5, 5);
INSERT INTO vehicle_truck_into_sendTo_R1(license_plate,worker_ID,machine_ID,business_ID) VALUES
  ('A00006', 6, 6, 6);

/*create vehicle_sedan_into_transportTo_R4 */
CREATE TABLE vehicle_sedan_into_transportTo_R4(
  worker_ID INTEGER PRIMARY KEY,
  factory_ID INTEGER NOT NULL,
  FOREIGN KEY (worker_ID) REFERENCES worker(worker_ID) ON DELETE CASCADE,
  FOREIGN KEY (factory_ID) REFERENCES factory(factory_ID) ON DELETE CASCADE
);

/*insert vehicle_sedan_into_transportTo_R4 */
INSERT INTO vehicle_sedan_into_transportTo_R4(worker_ID,factory_ID) VALUES
  (1, 1);
INSERT INTO vehicle_sedan_into_transportTo_R4(worker_ID,factory_ID) VALUES
  (2, 2);
INSERT INTO vehicle_sedan_into_transportTo_R4(worker_ID,factory_ID) VALUES
  (3, 3);
INSERT INTO vehicle_sedan_into_transportTo_R4(worker_ID,factory_ID) VALUES
  (4, 4);
INSERT INTO vehicle_sedan_into_transportTo_R4(worker_ID,factory_ID) VALUES
  (5, 5);


/*create vehicle_sedan_into_transportTo_R3*/
CREATE TABLE vehicle_sedan_into_transportTo_R3(
  machine_ID INTEGER PRIMARY KEY,
  factory_ID INTEGER NOT NULL,
  FOREIGN KEY (machine_ID) REFERENCES machine_R1(machine_ID) ON DELETE CASCADE,
  FOREIGN KEY (factory_ID) REFERENCES factory(factory_ID) ON DELETE CASCADE
);

/*insert vehicle_sedan_into_transportTo_R3*/
INSERT INTO vehicle_sedan_into_transportTo_R3(machine_ID, factory_ID) VALUES
  (1, 1);
INSERT INTO vehicle_sedan_into_transportTo_R3(machine_ID, factory_ID) VALUES
  (2, 2);
INSERT INTO vehicle_sedan_into_transportTo_R3(machine_ID, factory_ID) VALUES
  (3, 3);
INSERT INTO vehicle_sedan_into_transportTo_R3(machine_ID, factory_ID) VALUES
  (4, 4);
INSERT INTO vehicle_sedan_into_transportTo_R3(machine_ID, factory_ID) VALUES
  (5, 5);

/*insert vehicle_sedan_into_transportTo_R5*/
CREATE TABLE vehicle_sedan_into_transportTo_R5(
  color VARCHAR(255),
  model_name VARCHAR(255),
  price INTEGER,
  passenger_capacity INTEGER,
  PRIMARY KEY(color, model_name)
);

/*insert vehicle_sedan_into_transportTo_R5*/
INSERT INTO vehicle_sedan_into_transportTo_R5(color, model_name, price, passenger_capacity) VALUES
  ('white', 'SedanA', 10000, 1 );
INSERT INTO vehicle_sedan_into_transportTo_R5(color, model_name, price, passenger_capacity) VALUES
  ('grey', 'SedanB', 20000, 2 );
INSERT INTO vehicle_sedan_into_transportTo_R5(color, model_name, price, passenger_capacity) VALUES
  ('silver', 'SedanC', 30000, 3 );
INSERT INTO vehicle_sedan_into_transportTo_R5(color, model_name, price, passenger_capacity) VALUES
  ('white', 'SedanD', 40000,4 );
INSERT INTO vehicle_sedan_into_transportTo_R5(color, model_name, price, passenger_capacity) VALUES
  ('grey', 'SedanE', 50000, 5);
INSERT INTO vehicle_sedan_into_transportTo_R5(color, model_name, price, passenger_capacity) VALUES
  ('grey', 'SedanF', 20000, 1);


/*create vehicle_sedan_into_transportTo_R1*/
CREATE TABLE vehicle_sedan_into_transportTo_R1 (
  license_plate CHAR(6) PRIMARY KEY,
  model_name VARCHAR(255),
  color VARCHAR(255),
  worker_ID INTEGER NOT NULL,
  machine_ID INTEGER NOT NULL,
  employee_ID INTEGER,
  FOREIGN KEY (worker_ID) REFERENCES vehicle_sedan_into_transportTo_R4(worker_ID) ON DELETE CASCADE,
  FOREIGN KEY (machine_ID) REFERENCES vehicle_sedan_into_transportTo_R3(machine_ID) ON DELETE CASCADE,
  FOREIGN KEY (employee_ID) REFERENCES salesperson(employee_ID) ON DELETE CASCADE,
  FOREIGN KEY (color, model_name) REFERENCES vehicle_sedan_into_transportTo_R5(color, model_name) ON DELETE CASCADE
);

/*insert vehicle_sedan_into_transportTo_R1*/
INSERT INTO vehicle_sedan_into_transportTo_R1(license_plate,model_name,color, worker_ID,machine_ID, employee_ID) VALUES
  ('B00001', 'SedanA', 'white', 1, 1, 1);
INSERT INTO vehicle_sedan_into_transportTo_R1(license_plate,model_name,color, worker_ID,machine_ID, employee_ID) VALUES
  ('B00002', 'SedanB', 'grey', 2, 2, 2);
INSERT INTO vehicle_sedan_into_transportTo_R1(license_plate,model_name,color, worker_ID,machine_ID, employee_ID) VALUES
  ('B00003', 'SedanC', 'silver', 3, 3, 3);
INSERT INTO vehicle_sedan_into_transportTo_R1(license_plate,model_name,color, worker_ID,machine_ID, employee_ID) VALUES
  ('B00004', 'SedanD', 'white', 4, 4, 4);
INSERT INTO vehicle_sedan_into_transportTo_R1(license_plate,model_name,color, worker_ID,machine_ID, employee_ID) VALUES
  ('B00005', 'SedanE', 'grey', 5, 5, 5);

/*create insurance_insures_R2*/
CREATE TABLE insurance_insures_R2(
  insurance_type VARCHAR(255) PRIMARY KEY,
  cost INTEGER
);

/*insert insurance_insures_R2*/
INSERT INTO insurance_insures_R2(insurance_type, cost) VALUES
  ('A', 100);
INSERT INTO insurance_insures_R2(insurance_type, cost) VALUES
  ('B', 200);
INSERT INTO insurance_insures_R2(insurance_type, cost) VALUES
  ('C', 300);
INSERT INTO insurance_insures_R2(insurance_type, cost) VALUES
  ('D', 400);
INSERT INTO insurance_insures_R2(insurance_type, cost) VALUES
  ('E', 500);

CREATE TABLE insurance_insures_R1(
  policy_number INTEGER NOT NULL,
  license_plate CHAR(6) NOT NULL,
  insurance_type VARCHAR(255),
  PRIMARY KEY (policy_number, license_plate),
  FOREIGN KEY (license_plate) REFERENCES vehicle_truck_into_sendTo_R1(license_plate) ON DELETE CASCADE,
  FOREIGN KEY (insurance_type) REFERENCES insurance_insures_R2(insurance_type) ON DELETE CASCADE
);

INSERT INTO insurance_insures_R1(policy_number,license_plate,insurance_type) VALUES
  (1, 'A00001', 'A');
INSERT INTO insurance_insures_R1(policy_number,license_plate,insurance_type) VALUES
  (2, 'A00002', 'B');
INSERT INTO insurance_insures_R1(policy_number,license_plate,insurance_type) VALUES
  (3, 'A00003', 'C');
INSERT INTO insurance_insures_R1(policy_number,license_plate,insurance_type) VALUES
  (4, 'A00004', 'D');
INSERT INTO insurance_insures_R1(policy_number,license_plate,insurance_type) VALUES
  (5, 'A00005', 'E');

commit;




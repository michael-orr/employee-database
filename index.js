const mysql = require('mysql2');
const inquirer = require('inquirer');
const art = require("ascii-art");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Sloane2022?',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

//----------------------------------------------------------------------------------
//Start function - COMPLETE

  async function start() {
    try {
      const rendered = await art.font("Employee Manager", "doom").completed();
      console.log(rendered);
      return menu();
    } catch (err) {
      console.log(err);
    }
  }

//----------------------------------------------------------------------------------
// menu prompt function - COMPLETE
  async function menu() {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"],
      },
    ]);
  
    switch (action) {
      case "View All Employees":
        return viewEmployees();
  
      case "View All Departments":
        return viewDepartments();
  
      case "View All Roles":
        return viewRoles();
      
      case "Update Employee Role":
        return updateEmployeeRole();

      case "Add Department":
        return addDepartment();  

      case "Add Role":
        return addRole();

      case "Add Employee":
        return addEmployee();     

      default:
        return exit();
    }
  }

//----------------------------------------------------------------------------------
// view employees function - COMPLETE

  function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
      console.table(results);
      menu();
    }); 
  }
//----------------------------------------------------------------------------------
// view roles function - COMPLETE

  function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
      console.table(results);
      menu();
    }); 
  }

  //view departments function - COMPLETE
  function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      menu();
    }); 
  }

//----------------------------------------------------------------------------------
// update the employee - not complete
// use the field tips update function as an example.
  function updateEmployeeRole() {
    console.log('You chose Update Employee.');
    menu();
  }

//----------------------------------------------------------------------------------
// add department function - COMPLETE

  async function addDepartment() {
    try{
    const { department } = await inquirer.prompt([
      {
        type: "input",
        message: "What would you like to name the department?",
        name: "department",
      },
    ]);
    db.query(`INSERT INTO department (name) VALUES (?);`, department, function (err, results) {
      console.log(`The ${department} Department has been successfully added.`);
    }); 
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      menu();
    });
  } catch (error) {
    console.log(error);
  }  
 }

 //----------------------------------------------------------------------------------
 // add role function - not complete

 async function addRole() {
  try{
  const selectDepartmentsSQL = 'SELECT * FROM department;';

  const [rows] = await db.promise().query(selectDepartmentsSQL);

  const choices = rows.map((department) => ({
    name: `${department.name}`,
    value: department,
  }));

  const { title, salary, department } = await inquirer.prompt([
    {
      type: "input",
      message: "What would you like to name this role?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the starting salary?",
      name: "salary",
    },
    {
      type: "list",
      message: "Which department will this role belong to?",
      name: "department",
      choices: choices
    },
  ]);
  db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [title,salary,department], function (err, results) {
    console.log(`${title} has been successfully added.`);
  }); 
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    menu();
  });
} catch (error) {
  console.log(error);
}  
}
//----------------------------------------------------------------------------------
// add employee function - not complete

async function addEmployee() {
  console.log('You chose Add Employee.');
  menu();  
}
//----------------------------------------------------------------------------------
// exit function - COMPLETE
  function exit() {
    console.log('see ya!');
    db.end();
  }

  //STARTS THE APP.
  start();
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

// Funtion to start the program.
  async function start() {
    try {
      const rendered = await art.font("Employee Manager", "doom").completed();
      console.log(rendered);
      return menu();
    } catch (err) {
      console.log(err);
    }
  }


// Menu prompt
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


// view employees function

  function viewEmployees() {
    db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function (err, results) {
      console.table(results);
      menu();
    }); 
  }

// view roles function

  function viewRoles() {
    db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', function (err, results) {
      console.table(results);
      menu();
    }); 
  }

  //view departments function 
  function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      menu();
    }); 
  }


// update the employee function

  async function updateEmployeeRole() {
    try {
    const selectEmployeesSQL = 'SELECT * FROM employee;';

    const [rows] = await db.promise().query(selectEmployeesSQL);

    const choices = rows.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

  const selectRolesSQL = 'SELECT * FROM role;';

  const [roleRows] = await db.promise().query(selectRolesSQL);

  const roleChoices = roleRows.map((role) => ({
    name: `${role.title}`,
    value: role.id,
  }));

    const employee = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "employee_id",
        choices: choices,
      },
    ]);
    const role = await inquirer.prompt([
      {
        type: "list",
        message: "What is the employee's new role?",
        name: "role_id",
        choices: roleChoices,
      },
    ]);
    const updateEmployeeRoleSql = `UPDATE employee SET ? WHERE ?;`;
    await db
      .promise()
      .query(updateEmployeeRoleSql, [
        { role_id: role.role_id },
        { id: employee.employee_id },
      ]);
    menu();
  } catch (error) {
    console.log(error);
  }  
  }

// add department function

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

 
 // add role function

 async function addRole() {
  try{
  const selectDepartmentsSQL = 'SELECT * FROM department;';

  const [rows] = await db.promise().query(selectDepartmentsSQL);

  const choices = rows.map((department) => ({
    name: `${department.name}`,
    value: department.id,
  }));

  const role = await inquirer.prompt([
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
      name: "department_id",
      choices: choices
    },
  ]);
  db.query("INSERT INTO role SET ?", role, function (err, results) {
    if (err) {console.log("err adding a role: ", err)}; 
    console.log(role);
    console.log(`${role.title} has been successfully added.`);
  }); 
  db.query('SELECT * FROM role;', function (err, results) {
    console.table(results);
    menu();
  });
} catch (error) {
  console.log(error);
}  
}

// add employee function

async function addEmployee() {
  try{
  const selectRolesSQL = 'SELECT * FROM role;';

  const [roleRows] = await db.promise().query(selectRolesSQL);

  const roleChoices = roleRows.map((role) => ({
    name: `${role.title}`,
    value: role.id,
  }));

  const selectManagersSQL = 'SELECT * FROM employee;';

  const [managerRows] = await db.promise().query(selectManagersSQL);

  const managerChoices = managerRows.map((manager) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id,
  }));

  const employee = await inquirer.prompt([
    {
      type: "input",
      message: "Employee's first name:",
      name: "first_name",
    },
    {
      type: "input",
      message: "Employee's last name:",
      name: "last_name",
    },
    {
      type: "list",
      message: "For which role was this employee hired?",
      name: "role_id",
      choices: roleChoices,
    },
    {
      type: "list",
      message: "Which department will this role belong to?",
      name: "manager_id",
      choices: managerChoices,
    },
  ]);
  db.query("INSERT INTO employee SET ?", employee, function (err, results) {
    if (err) {console.log("err adding a role: ", err)}; 
    console.log(employee);
    console.log(`${employee.first_name} ${employee.last_name} has been successfully added.`);
  }); 
  db.query('SELECT * FROM employee;', function (err, results) {
    console.table(results);
    menu();
  });
} catch (error) {
  console.log(error);
}  
}

// exit function
  function exit() {
    console.log('see ya!');
    db.end();
  }


  start();
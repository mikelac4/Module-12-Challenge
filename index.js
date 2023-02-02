const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
require('dotenv').config()

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  connection.connect(function (err) {
      if (err) {
          console.error("error connecting: " + err.stack);
          return;
      }
  });


startApp();

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: "Choose from the following what you would like to do.",
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update An Employee Role',
                    'Exit'
                ]
            }
        ])
        .then(function ({options}) {
            switch (options) {
                case 'View All Departments':
                    viewDepartment();
                    break;

                case 'View All Roles':
                    viewRole();
                    break;

                case 'View All Employees':
                    viewEmployee();
                    break;

                case 'Add A Department':
                    addDepartment();
                    break;

                case 'Add A Role':
                    addRole();
                    break;

                case 'Add An Employee':
                    addEmployee();
                    break;

                case 'Update An Employee Role':
                    updateRole();
                    break;

                default:
                    exit();
            }
        });

}

function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function viewRole() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function viewEmployee() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'depName',
                message: 'What is the department name?'
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.depName], function(err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'input',
                name: 'depId',
                message: 'What is the ID of the department?'
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salary, answer.depId], function(err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'empFirst',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'empLast',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'roleId',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'managerId',
                message: "What is the manager id number?"
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.empFirst, answer.empLast, answer.roleId, answer.managerId],
            function(err, res) {
                if (err) throw err;
                console.table(res);
                startApp();   
            });
        });
}


function updateRole() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;

        let employees = [];
        let roles = [];

        for (let i = 0; i < data.length; i++) {
            employees.push(data[i].first_name)
        }

        connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            for (let i = 0; i < data.length; i++) {
                roles.push(data[i].title)
            }
        
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'What employee needs their role updated?',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the updated role?',
                    choices: roles
                }
            ])
            .then(function (employee_id, role_id) {
                connection.query(`UPDATE employee SET role_id = ${roles.indexOf(role_id) + 1} WHERE id = ${employees.indexOf(employee_id) + 1}`, function (err, data) {
                    if (err) throw err;
                    startApp();
                });
            });
        });
    });
         
}

function exit() {
    connection.end();
    process.exit();
}

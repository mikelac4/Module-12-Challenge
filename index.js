const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
require('dotenv').config()

const Connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'employee_db' 
    },
);

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

                case 'Add A Role':
                    addRole();
                    break;

                case 'Add An Employee':
                    addEmployee();
                    break;

                case 'Update An Employee Roles':
                    updateRole();
                    break;

                case 'Exit':
                    Connection.end()
                    return;
            }
        });

}

function viewDepartment() {
    let query = "SELECT * FROM role";
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
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'empUpdate',
                message: "What employee do you want to update?"
            },
            {
                type: 'input',
                name: 'roleUpdate',
                message: 'What role do you want to update'
            }
        ])
        .then(function(answer) {
            connection.query('UPDATE employee SET role_id=? WHERE first_name=?', [answer.empUpdate, answer.roleUpdate], function(err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}

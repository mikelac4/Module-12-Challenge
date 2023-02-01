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



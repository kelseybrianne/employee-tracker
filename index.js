const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('./db/connection')



async function viewDepartments() {
    // Select so user sees role id, job title, department the role belongs to, and salary for that role
    const departments = await db.query('SELECT * FROM departments');
    console.table(departments);
    askForNextAction();
};

async function viewRoles() {
    // Select so user sees role id, job title, department the role belongs to, and salary for that role
    const roles = await db.query('SELECT * FROM roles');
    console.table(roles);
    askForNextAction();
};

async function viewEmployees() {
    // Select so user sees id, first name, last name, job title, department, salary, and manager of that employee
    const employees = await db.query('SELECT * FROM employees');
    console.table(employees);
    askForNextAction();
};

async function addDepartment() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'name',
                message: "Department name:",
                type: 'input'
            }
        ])
        const {name} = answers;
        // Add newDepartment to database
        db.query('INSERT INTO departments (name) VALUES (?)', [name])
        console.log(answers);
        askForNextAction();
    }
    catch(err) {
        console.log(err);
    }
};

// Add a role
async function addRole() {
    // SELECT the existing roles out of the 'roles' table
    const departments = await db.query('SELECT * FROM departments');

    // .map() the results from 'roles' to question data for inquirer
    const choices = departments.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    })

    // THEN prompt the user for role information
    try {
        const answers = await inquirer.prompt([
            {
                name: 'title',
                message: "Role title:",
                type: 'input'
            },
            {
                name: 'salary',
                message: "Salary:",
                type: 'input'
            },
            {
                name: 'department_id',
                message: "Department:",
                type: 'list',
                choices: choices
            }
        ])

        // Take the user's answers and go INSERT them into the 'role' table
        const {title, salary, department_id} = answers;
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id])
        console.log(answers);
        askForNextAction();
    }
    catch(err) {
        console.log(err);
    }
};

async function addEmployee() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'firstName',
                message: "First name:",
                type: 'input'
            },
            {
                name: 'lastName',
                message: "Last name:",
                type: 'input'
            },
            {
                name: 'role',
                message: "Role",
                type: 'list',
                choices: ['1', '2', '3']
            },
            {
                name: 'manager',
                message: "Manager for new employee:",
                type: 'list',
                choices: ['1', '2', '3']
            }
        ])
        console.log('Employee added');
        const {title, salary, department} = answers;
        // Add employee info to database

        askForNextAction();
    }
    catch(err) {
        console.log(err);
    }
};

async function updateEmployeeRole() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'employee',
                message: "Select employee to update:",
                type: 'list',
                choices: ['1', '2', '3']
            }
        ])
        console.log('Employee role updated');
        const {employee} = answers;
        // Update employee role in database

        askForNextAction();
    }
    catch(err) {
        console.log(err);
    }
};

// Present user with options
async function askForNextAction() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'next',
                message: "What would you like to do?",
                type: 'list',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'] 
            }
        ])
        const { next } = answers;
        if(next === 'View All Departments') {
            viewDepartments();
        } else if (next === 'View All Roles') {
            viewRoles();
        } else if (next === 'View All Employees') {
            viewEmployees();
        } else if (next === 'Add A Department') {
            addDepartment();
        } else if (next === 'Add A Role') {
            addRole();
        } else if (next === 'Add An Employee') {
            addEmployee();
        } else if (next === 'Update An Employee Role') {
            updateEmployeeRole();
        } 
    }
    catch(error) {
        console.log(error);
    }
}

askForNextAction();


// Add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2);"

// Add an employee

// Update an employee
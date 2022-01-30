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
    const roles = await db.query('SELECT * FROM roles');

    const employees = await db.query('SELECT * FROM employees');

    // .map() the results from 'roles' and 'employees' to provide choices in inquirer prompts
    const roleChoices = roles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })
    const employeeChoices = employees.map(employee => {
        return {
            name: employee.first_name,
            value: employee.id
        }
    })

    try {
        const answers = await inquirer.prompt([
            {
                name: 'first_name',
                message: "First name:",
                type: 'input'
            },
            {
                name: 'last_name',
                message: "Last name:",
                type: 'input'
            },
            {
                name: 'role_id',
                message: "Role",
                type: 'list',
                choices: roleChoices
            },
            {
                name: 'manager_id',
                message: "Manager for new employee:",
                type: 'list',
                choices: employeeChoices
            }
        ])
        const {first_name, last_name, role_id, manager_id} = answers;

        // Add employee info to database
        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id])
        console.log(answers);
        askForNextAction();
    }
    catch(err) {
        console.log(err);
    }
};

async function updateEmployeeRole() {
    const roles = await db.query('SELECT * FROM roles');
    const employees = await db.query('SELECT * FROM employees');

    // .map() the results from 'roles' and 'employees' to provide choices in inquirer prompts
    const roleChoices = roles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })
    const employeeChoices = employees.map(employee => {
        return {
            name: employee.first_name,
            value: employee.id
        }
    })
    try {
        const answers = await inquirer.prompt([
            {
                name: 'employee_id',
                message: "Select employee to update:",
                type: 'list',
                choices: employeeChoices
            },
            {
                name: 'role_id',
                message: "Select new role for employee:",
                type: 'list',
                choices: roleChoices
            }
        ])
        console.log(answers);
        const {employee_id, role_id} = answers;
        // Update employee role in database
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_id, employee_id])

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
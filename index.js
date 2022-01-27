const inquirer = require("inquirer");

const viewDepartments = () => {
    console.log('Departments');
    askForNextAction();
};

const viewRoles = () => {
    console.log('Roles');
    askForNextAction();
};

const viewEmployees = () => {
    console.log('Employees ');
    askForNextAction();
};

async function addDepartment() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'newDepartment',
                message: "Department name:",
                type: 'input'
            }
        ])
        console.log('Department added');
        const {newDepartment} = answers;
        // Add newDepartment to database

        askForNextAction();
    }
    catch(err) {
        console.log(err);
    }
};

async function addRole() {
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
                name: 'department',
                message: "Department:",
                type: 'list',
                choices: ['1', '2', '3']
            }
        ])
        console.log('Role added');
        const {title, salary, department} = answers;
        // Add new role info to database

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

// Present user with options: What would you like to do? (View All Employees, View All Employees By Department, View All Employees By Manager, Add Employee...)

// View all departments - READ - "SELECT * FROM [table_name];" (You'll need to do more than this, but start here and make it work)

// View all roles - READ - "SELECT * FROM [table_name];"

// View all employees - READ - "SELECT * FROM [table_name];"


// Add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2);"

// Add a role
    // SELECT the existing roles out of the 'roles' table

    // .map() the results from 'roles' to question data for inquirer

    // THEN prompt the user for role information
        // Take the user's answers and go INSERT them into the 'role' table

// Add an employee

// Update an employee
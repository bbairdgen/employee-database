const inquirer = require('inquirer')
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "templo1987",
    database: "company_db"
})

function start() {
    inquirer.prompt({
        name: "action",
        type: 'list',
        message: 'Please choose an option.',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Quit'
        ],
    }).then(answer => {
        switch (answer.action) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateEmployee();
                break;
            case "Exit":
                connection.end()
                break;
            default:
                connection.end()
        }
    })
}

const viewDepartments = () => {
    let query = "SELECT department.id AS ID, department.department_name AS Department FROM department ORDER BY department.id"

    connection.query(query, function (err, res) {
        if (err) throw (err)
        console.table(res)
        start();
    })
}

const viewRoles = () => {
    let query = "SELECT role.id, role.title, role.salary, department.department_name AS 'department name' FROM role RIGHT JOIN department ON role.department_id = department.id ORDER BY role.id"

    connection.query(query, function (err, res) {
        if (err) throw (err)
        console.table(res);
        start();
    })

}

const viewEmployees = () => {
    let query = "SELECT emp.id AS ID, emp.first_name AS 'First Name', emp.last_name AS 'Last Name', r.title AS 'Role', r.salary AS 'Salary', dep.department_name AS 'Department', CONCAT(man.first_name, ' ', man.last_name) AS 'Manager' FROM employee emp INNER JOIN role r ON emp.role_id = r.id INNER JOIN department dep ON r.department_id = dep.id LEFT JOIN employee man ON emp.manager_id = man.id ORDER BY emp.id;"

    connection.query(query, function (err, res) {
        if (err) throw (err)
        console.table(res);
        start();
    })

}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the Department's Name?"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO department SET ?", {
            department_name: answer.departmentName
        })
        start()
    })
}

const addRole = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err)
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the Role's Title?"
            },
            {
                name: "salary",
                type: "number",
                message: "What is the salary?"
            },
            {
                name: "departmentId",
                type: "list",
                choices: function () {
                    return res.map((department) => ({ name: department.department_name, value: department.id }))
                },
                message: "What department does this role belong to?"
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO role SET ?", {
                title: answer.roleTitle,
                salary: answer.salary,
                department_id: answer.departmentId
            })
            start()
        })
    })
}

const addEmployee = () => {

    let query = "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Manager FROM employee"
    connection.query(query, function (err, res) {
        if (err) throw (err);

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is their first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is their last name?"
            },
            {
                name: "managerId",
                type: "list",
                choices: function () {
                    return res.map((employee) => ({ name: employee.Manager, value: employee.id }))
                },
                message: "Who is the manager?"
            },
        ]).then(function (answer) {
            let user = {
                firstName: answer.firstName,
                lastName: answer.lastName,
                managerId: answer.managerId,
            }
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw (err);

                inquirer.prompt([
                    {
                        name: "addRole",
                        type: "list",
                        choices: function () {
                            return res.map((role) => ({ name: role.title, value: role.id }))
                        },
                        message: "What is their role?"
                    }
                ]).then(function (answer) {
                    connection.query("INSERT INTO employee SET ?", {
                        first_name: user.firstName,
                        last_name: user.lastName,
                        manager_id: user.managerId,
                        role_id: answer.addRole
                    })
                    start()
                })
            })
        })
        if (err) throw (err)
    })
}

const updateEmployee = () => {
    connection.query("SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Employee FROM employee", function (err, res) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                choices: function () {
                    return res.map((employee) => ({ name: employee.Employee, value: employee.id }))
                },
                message: "Which employee needs updated?"
            }
        ]).then(function (answer) {
            let empName = {
                employeeId: answer.employeeId
            }
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw (err);
                inquirer.prompt([
                    {
                        name: "updatedRole",
                        type: "list",
                        choices: function () {
                            return res.map((roles) => ({ name: roles.title, value: roles.id }))
                        },
                        message: "What is the role?"
                    }
                ]).then(function (answer) {
                        connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [{
                            role_id: answer.updatedRole
                        },
                        {
                            id: empName.employeeId
                        }]
                    )
                    start()
                })
            })
        })
    })
}

start()
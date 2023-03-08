const startQuestion = [
    {
        type: 'list',
        name: 'initialQuestion',
        message: 'Please choose an option.',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a role', 'Add an Employee', 'Update an Employee Role']
    }
]

const deptQuestions = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Please add a new Department name.',
        when: (answers) => {
            if (answers.initialQuestion === 'Add a Department' || answers.departmentName === 'Add a new department') {
                return true;
            }
        }
    }
    
]

const roleQuestions = [
    {
        type: 'input',
        name: 'addRole',
        message: 'Please add a new role name.',
        when: (answers) => {
            if (answers.initialQuestion === 'Add a role' || answers.jobTitle === 'Add a new role') {
                return true;
            }
        }
    },
    {
        type: 'list',
        name: 'departmentName',
        message: 'Please pick a department.',
        choices: ['Add a new department']
    },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?",
        },
]

const empQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        when: (answers) => {
            if (answers.initialQuestion === 'Add an Employee' || answers.manName === 'Add a new manager' )
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'jobTitle',
        message: 'Please pick a role.',
        choices: ['Add a new role', 'Manager']
    },
    {
        type: 'list',
        name: 'manName',
        message: 'Please pick a manager.',
        choices: ['Add a new manager']
    },
]

// Maybe add questions to update a new employee or allow for full rewrite?
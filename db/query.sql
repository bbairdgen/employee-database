SELECT employee.last_name AS title, roles.title, roles.salary
FROM roles
RIGHT JOIN employee
ON employee.role_id = roles.id;


SELECT * FROM employee
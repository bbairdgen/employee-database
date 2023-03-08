INSERT INTO departments (department_name)
VALUES ("Research"),
       ("Education"),
       ("Engineering"),
       ("Indexing");

INSERT INTO roles (role_title, department_id, salary)
VALUES ("Research Specialist", 1, 70000), 
       ("Web Designer", 3, 85000),
       ("VIP Researcher", 1, 70000),
       ("Presenter", 2, 66000),
       ("Scheduler", 2, 60000),
       ("Indexer", 4, 60000),
       ("Project Manager", 3, 90000), 
       ("Project Creator", 4, 63000);

INSERT INTO employees (first_name, last_name, role_id, department_id, salary_id)
VALUES ("Arturo", "Johnson", 1, 1, 1),
       ("Daniel", "Juengling", 2, 3, 2),
       ("Fritz", "Wake", 8, 4, 8),
       ("Lauren", "Cuellar", 1, 1, 1),
       ("David", "Schmidt", 7, 3, 7),
       ("Darris", "Jones", 6, 4, 6);
    
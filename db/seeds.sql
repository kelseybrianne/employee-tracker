-- Pre populate the tables with existing data
INSERT INTO departments (id, name)
VALUES (1, 'Finance'),
       (2, 'Sales'),
       (3, 'Customer Service'),
       (4, 'Leadership');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Manager', '80000', 2),
       (2, 'Sales Rep', '60000', 2);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Ruby', 'Jones', 1, 1),
       (2, 'Erick', 'Hatch', 2, 1);
    
       
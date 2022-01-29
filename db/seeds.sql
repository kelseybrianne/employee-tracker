-- Pre populate the tables with existing data
INSERT INTO departments (name)
VALUES ('Finance'),
       ('Sales'),
       ('Customer Service'),
       ('Leadership');

INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', '80000', 2),
       ('Sales Rep', '60000', 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ruby', 'Jones', 1, 1),
       ('Erick', 'Hatch', 2, 1);
    
       
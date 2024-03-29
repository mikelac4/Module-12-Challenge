INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Salesperson", 60000, 1),
       (2, "Sales Lead", 70000, 1),
       (3, "Engineer", 80000, 2),
       (4, "Lead Engineer", 90000, 2),
       (5, "Accountant", 90000, 3),
       (6, "Account Manager", 100000, 3),
       (7, "Lawyer", 125000, 4),
       (8, "Legal Team Lead", 175000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bob", "Johnson", 1, 2),
       (2, "Bill", "Jackson", 2, NULL),
       (3, "Jessica", "Brown", 3, 4),
       (4, "Phil", "Dunn", 4, NULL),
       (5, "Anna", "Smith", 5, 6),
       (6, "Ryan", "Jones", 6, NULL),
       (7, "John", "Hill", 7, 8),
       (8, "Tom", "Scott", 8, NULL);
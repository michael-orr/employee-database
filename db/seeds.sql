INSERT INTO department(id, name) 
VALUES  (1, "Sales"),
        (2, "Customer Service"),
        (3, "Accounting");

INSERT INTO role(id, title, salary, department_id)
VALUES  (1, "Marketing Representative", 53000.00, 1),
        (2, "Sales Manager", 103000.00, 1),
        (3, "Receptionist", 30000.00, 2),
        (4, "Customer Service Rep", 48000.00, 2),
        (5, "Operations Manager", 15000.00, 2),
        (6, "Accountant", 100000.00, 3),
        (7, "Accounting Manager", 195000.00, 3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Trey', 'Anastasio', 2, 1),
        (2, 'Mike', 'Gordon', 1, 1),
        (3, 'Page', 'McConnell', 1, 1),
        (4, 'Jon', 'Fishman', 1, 1),
        (5, 'Jerry', 'Garcia', 5, 5),
        (6, 'Phil', 'Lesh', 4, 5),
        (7, 'Bob', 'Weir', 4, 5),
        (8, 'Bill', 'Lesh', 4, 5),
        (9, 'Mickey', 'Hart', 4, 5),
        (10, 'Bill', 'Kreutzmann', 4, 5),
        (11, 'Brett', 'Mydland', 3, 5),
        (12, 'Dean', 'Ween', 7, 12),
        (13, 'Gene', 'Ween', 6, 12);


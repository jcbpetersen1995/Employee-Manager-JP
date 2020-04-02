USE employee_trackerDB;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Service");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Parts");

INSERT INTO role (title, salary, department_id) VALUES ("Service Advisor", 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Service Advisor", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Service Manager", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Assistant Service Manager", 140000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Parts Advisor", 50000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Director", 120000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Parts Advisor", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jacob", "Petersen", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Thea", "Hovet", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jerome", "Seubert", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brian", "Alvarez", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sam", "Fair", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Thomas", "Berger", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cody", "Stover", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cam", "Holden", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jason", "Thomas", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Peter", "Le", 4, null);


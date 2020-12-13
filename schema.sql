DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employee_db.department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) not NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_db.role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(ID) ON DELETE CASCADE
);

CREATE TABLE employee_db.employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) not NULL,
  last_name VARCHAR(30) not NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(ID) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(ID) ON DELETE CASCADE
);


Add departments, roles, employees
INSERT INTO department (name)
VALUES 
('Engineering'),
('IT'),
('Marketing'),
('Corp Office');

INSERT INTO role (Title, salary, department_id)
VALUES 
('Engineer',750,1),
('Engineering Leader',900,1),
('IT Engineer',750,2),
('IT Manager',850,2),
('Market Analyst',700,3),
('Sales Analyst',800,3),
('CMO',300000,4),
('CEO',1000000,4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1,'Walt','Disney',8,null),
(2,'Snow','White',2,1),
(3,'Doc','Dwarf',1,2),
(4,'Happy','Dwarf',1,2),
(5,'Sneezy','Dwarf',1,2),
(6,'Sleepy','Dwarf',1,2),
(7,'Bashful','Dwarf',1,2),
(8,'Grumpy','Dwarf',1,2),
(9,'Dopey','Dwarf',1,2),
(10,'Pluto','Pup',4,1),
(11,'Huey','Duck',3,10),
(12,'Dewey','Duck',3,10),
(13,'Louie','Duck',3,10),
(14,'Goofy','Goof',7,1),
(15,'Minnie','Mouse',6,14),
(16,'Mickey','Mouse',6,14),
(17,'Ludwig','Von Drake',5,14),
(18,'Donald','Duck',5,14);

View departments, roles, employees
SELECT * FROM departments
SELECT * FROM roles 
SELECT * FROM employees


Update employee roles
UPDATE employee set role_id = (SELECT id FROM role WHERE title = 'IT Engineer') WHERE last_name = 'Grumpy' and first_name = 'Dwarf'

Update employee managers
UPDATE employee set manager_id = 
(SELECT id FROM employee WHERE last_name = 'Pup' and first_name = 'Pluto')
WHERE last_name = 'Grumpy' and first_name = 'Dwarf'

View employees by manager
SELECT a.id, a.first_name Emp_First, a.last_name Emp_Last, a.role_id, b.first_name Manager_First, b.last_name Manager_Last
FROM employee a inner join employee b
ON a.manager_id = b.id
ORDER BY a.manager_id

Delete departments, roles, and employees
DELETE FROM employee WHERE last_name = ? and first_name = ?
DELETE FROM roles WHERE title = ?
DELETE FROM department WHERE name = ?

View the total utilized budget of a department 
SELECT sum(salary) FROM employee INNER JOIN role
ON role_id = role.id and department_id = ?

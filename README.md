
# Project Title : Employee Tracker Application

## Project Description:
This application is used to manage a company employees using node, inquirer and MySQL. The application is a command line interface (CLI) that provides the following capabilities:
* Add departments, roles, employees
* View departments, roles, employees
* Update employee roles

Additionally, as a bonus, the following advanced features are provided:
* Update employee managers
* View employees by manager
* Delete departments, roles, and employees
  (NOTE:  Because the tables are created with the FOREIGN KEY constraint ON DELETE CASCADE, upon delete, all rows in tables foreign keys referenced are also deleted.  For example, deleting a manager from employee table will also delete any remployee who has that employee as the manager.)
* View the total utilized budget of a department -- ie the combined salaries of all employees in that department



## Table of Contents
* [Installation](#installation)
* [Contributors](#contributors)
* [Tests](#tests)
* [Questions](#questions)

## Installation
Copy the repository, run the sql file which will create the database and create the tables. Run npm install to install all the dependencies. Application can be run locally using the "node emp.js" 
(NOTE: The .env file does not have DB_PASS defined for security. To install, add the valid password for the database instance. )

## Usage

To run locally
node emp.js to start the application on the server side

To test, load the data in the csv files to the tables, if not user will need to creat the departments, roles, and employees using the application.



![Alt Text](https://github.com/melvyn10/employee_tracker/blob/main/images/image1.png)

![Alt Text](https://github.com/melvyn10/employee_tracker/blob/main/images/image2.png)

![Alt Text](https://github.com/melvyn10/employee_tracker/blob/main/images/employeeTracker.gif)

Videos
[![Watch the video](https://github.com/melvyn10/employee_tracker/blob/main/images/EmployeeTracker20201213-part1.webm)
[![Watch the video](https://github.com/melvyn10/employee_tracker/blob/main/images/EmployeeTracker20201213-part2.webm)

## Contributors
Melvyn T

npm inquirer
npm mysql
npm console.tabl
npm dotenv

## Tests
To test, load the data in the csv files to the tables, if not user will need to creat the departments, roles, and employees using the application.

## Questions
For questions, contact melvyn10 on GitHub 
 



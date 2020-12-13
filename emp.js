var mysql = require("mysql");
require('dotenv').config()
var inquirer = require("inquirer");
const { asap } = require("rxjs");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASS,
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  inquirer
    .prompt ({
      name: "action",
      type: "rawlist",
      message: "Welcome to Employee DB. \n What would you like to do",
      choices: [
        "Add a department",
        "Add a role",
        "Add a employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Update employee manager",
        "View employees by manager",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "View the total utlized budget for a department",
        "Exit"
      ],
      default: "View employees"
    })
    .then(function(answer) {
      switch (answer.action) {


        case "Add a department":
          addDept();
        break;

        case "Add a role":
          addRole();
        break;

        case "Add a employee":
          addEmployee();
        break;

        case "View departments":
          searchDept();
        break;

        case "View roles":
          searchRole();
        break;

        case "View employees":
          searchEmployee();
        break;

        case "Update employee role":
          updateEmpRole();
        break;

        case "Update employee manager":
          updateEmpManager();
        break;

        case "View employees by manager":
          searchEmpManager();
        break;

        case "Delete a department":
          deleteDept();
        break;

        case "Delete a role":
          deleteRole();
        break;

        case "Delete an employee":
          deleteEmp();
        break;

        case "View the total utlized budget for a department":
          viewBudget();
        break;

        case "Exit":
          connection.end();
      }
    })
  }

  function addDept() {
    inquirer
      .prompt({
        name: "dept",
        type: "input",
        message: "Enter department name"
      })
      .then(function (answer) {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.dept], function(err, cTable) {
          if (err) throw err;
          afterConnection();
        })
    });
  }

  function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;

    inquirer
      .prompt([
        {
        name: "title",
        type: "input",
        message: "Enter role title"
        },
        {
        name: "salary",
        type: "input",
        message: "Enter role salary"
        },
        {
        name: "dept",
        type: "rawlist",
        message: "Select a Department for this role",
        choices: res
        }
      ])

    .then(function (answer) {
      for (i=0; i<res.length; i++)
        { 
          if (res[i].name === answer.dept) {
          var deptID = res[i].id;
        }}
      console.log ("dept ",deptID);
      connection.query("INSERT INTO role (Title, salary, department_id) VALUES (?,?,?)", [answer.title, answer.salary, deptID], function(err, cTable) {
        if (err) throw err;
        afterConnection();
        })
      });
    });
  }
  
  function addEmployee() {
    var roleArray = [];
    var roleIdArray = [];
    var empIdArray = [];
    var empArray = [];

    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      for (i=0; i<res.length; i++) {
        roleIdArray.push(res[i].id);
        roleArray.push(res[i].title);
      }
      connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++)
          {
            empIdArray[i] = res[i].id;
            empArray[i] = res[i].first_name;
            empArray[i] += ' ';
            empArray[i] += res[i].last_name;
            console.log("emp ",empArray[i]);
          }
        
      
        inquirer
          .prompt([
            {
            name: "first_name",
            type: "input",
            message: "Enter first name"
            },
            {
            name: "last_name",
            type: "input",
            message: "Enter last name"
            },
            {
            name: "role",
            type: "rawlist",
            message: "Select a role for this employee",
            choices: roleArray
            },
            {
            name: "manager",
            type: "rawlist",
            message: "Select a manager for this employee",
            choices: empArray
            }
          ])

        .then(function (answer) {
          for (i=0; i<roleArray.length; i++)
            { 
              if (roleArray[i] === answer.role) {
              var roleID = roleIdArray[i];
            }}
          for (i=0; i<empArray.length; i++)
            { 
              if (empArray[i] === answer.manager) {
              var managerID = empIdArray[i];
            }}
          console.log ("role ",roleID);
          console.log ("manager ",managerID);
          connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.first_name, answer.last_name, roleID, managerID], function(err, cTable) {
            if (err) throw err;
            afterConnection();
            })
        });
      });
    });
  }

  function searchDept() {
    connection.query("SELECT * FROM department", function(err, cTable) {
      if (err) throw err;
      console.table(cTable);
      afterConnection();
    });
  }

  function searchRole() {
    connection.query("SELECT * FROM role", function(err, cTable) {
      if (err) throw err;
      console.table(cTable);
      afterConnection();
    });
  }

  function searchEmployee() {
  connection.query("SELECT * FROM employee", function(err, cTable) {
      if (err) throw err;
      console.table(cTable);
      afterConnection();
    });
  }

  function updateEmpRole() {
    var roleArray = [];
    var roleIdArray = [];
    var empIdArray = [];
    var empArray = [];

    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      for (i=0; i<res.length; i++) {
        roleIdArray.push(res[i].id);
        roleArray.push(res[i].title);
      }
      connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++)
          {
            empIdArray[i] = res[i].id;
            empArray[i] = res[i].first_name;
            empArray[i] += ' ';
            empArray[i] += res[i].last_name;
            console.log("emp ",empArray[i]);
          }
        
      
        inquirer
          .prompt([
            {
            name: "employee",
            type: "rawlist",
            message: "Select an employee to update",
            choices: empArray
            },
            {
              name: "role",
              type: "rawlist",
              message: "Select new role for this employee",
              choices: roleArray
            }
          ])

        .then(function (answer) {
          for (i=0; i<roleArray.length; i++)
            { 
              if (roleArray[i] === answer.role) {
              var roleID = roleIdArray[i];
            }}
          for (i=0; i<empArray.length; i++)
            { 
              if (empArray[i] === answer.employee) {
              var employeeID = empIdArray[i];
              }
            }
          connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [ roleID, employeeID], function(err, cTable) {
            if (err) throw err;
            afterConnection();
            })
        });
      });
    });
  }


  function updateEmpManager() {
    var empIdArray = [];
    var empArray = [];

      connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++)
          {
            empIdArray[i] = res[i].id;
            empArray[i] = res[i].first_name;
            empArray[i] += ' ';
            empArray[i] += res[i].last_name;
            console.log("emp ",empArray[i]);
          }
          inquirer
          .prompt([
            {
            name: "employee",
            type: "rawlist",
            message: "Select an employee to update",
            choices: empArray
            },
            {
              name: "manager",
              type: "rawlist",
              message: "Select new manager for this employee",
              choices: empArray
            }
          ])

        .then(function (answer) {
          for (i=0; i<empArray.length; i++)
            { 
              if (empArray[i] === answer.employee) {
                var employeeID = empIdArray[i];
              }
              if (empArray[i] === answer.manager) {
                var managerID = empIdArray[i];
              }
            }

          connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [ managerID, employeeID], function(err, cTable) {
            if (err) throw err;
            afterConnection();
            })
        });
      });
  }

  function searchEmpManager() {
    connection.query("SELECT a.id, a.first_name Emp_First, a.last_name Emp_Last, a.role_id, b.first_name Manager_First, b.last_name Manager_Last FROM employee a inner join employee b ON a.manager_id = b.id ORDER BY a.manager_id ", function(err, cTable) {
      if (err) throw err;
      console.table(cTable);
      afterConnection();
    });
  }

  function deleteDept() {
    var deptArray = [];
    var deptIdArray = [];
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      for (i=0; i<res.length; i++) {
        deptIdArray.push(res[i].id);
        deptArray.push(res[i].name);
      } 
      inquirer
        .prompt([
          {
          name: "dept",
          type: "rawlist",
          message: "Select a department to delete",
          choices: deptArray
          }
        ])
        .then (function(answer) {
          for (i=0; i<deptArray.length; i++)
            { 
              if (deptArray[i] === answer.dept) {
              var deptID = deptIdArray[i];
            }}
          inquirer
            .prompt([
              {
                name: "toDelete",
                type: "confirm",
                message: "This will delete all employees and roles in this department.  Do you want to continue",
                default: false
              }
            ])
            .then (function (confirmation) {
              /* 
              ** Delete confirmed
              ** delete from both employee and role tables
              */
             if (confirmation.toDelete === true) {
              connection.query("DELETE FROM department WHERE id = ?", [deptID], function(err, cTable) {
                console.log("Department deleted ", deptID);
                if (err) throw err;
                })
              }
              else {
                console.log("Nothing deleted");
              }
              afterConnection();
            });
        });
    });
  }

  function deleteRole() {
    var roleArray = [];
    var roleIdArray = [];

    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      for (i=0; i<res.length; i++) {
        roleIdArray.push(res[i].id);
        roleArray.push(res[i].title);
      }   
      
      inquirer
        .prompt([
          {
          name: "role",
          type: "rawlist",
          message: "Select a role to delete",
          choices: roleArray
          }
        ])
        .then (function (answer) {
          for (i=0; i<roleArray.length; i++)
          { 
            if (roleArray[i] === answer.role) {
            var roleID = roleIdArray[i];
          }}

          inquirer
            .prompt([
              {
                name: "toDelete",
                type: "confirm",
                message: "This will delete all employees in this role.  Do you want to continue",
                default: false
              }
            ])
            .then (function (confirmation) {
              /* 
              ** Delete confirmed
              ** delete from both employee and role tables
              */
             if (confirmation.toDelete === true) {
              connection.query("DELETE FROM role WHERE id = ?", [roleID], function(err, cTable) {
                if (err) throw err;
                console.log ("Role deleted ",roleID);
                })
              }
             else {
                console.log ("Nothing deleted");
              }
             afterConnection();
            });
        });
    });
  }

  function deleteEmp() {
    var empIdArray = [];
    var empArray = [];
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      for (i=0; i<res.length; i++)
        {
          empIdArray[i] = res[i].id;
          empArray[i] = res[i].first_name;
          empArray[i] += ' ';
          empArray[i] += res[i].last_name;
          console.log("emp ",empArray[i]);
        }
      inquirer
        .prompt (
          {
            name: "employee",
            type: "rawlist",
            message: "Select employee to delete",
            choices: empArray
        })

        .then(function (answer) {
          for (i=0; i<empArray.length; i++)
          { 
            if (empArray[i] === answer.employee) {
            var employeeId = empIdArray[i];
          }}
        console.log ("delete id ",employeeId);
        connection.query("DELETE FROM employee WHERE id = ?", [employeeId], function(err, cTable) {
          if (err) throw err;
          afterConnection();
          })
        });
    });
  }
    

  function viewBudget() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;

    inquirer
      .prompt([
        {
        name: "dept",
        type: "rawlist",
        message: "Select a Department to view budget for",
        choices: res
        }
      ])

    .then(function (answer) {
      for (i=0; i<res.length; i++)
        { 
          if (res[i].name === answer.dept) {
          var deptID = res[i].id;
        }}
      console.log ("dept ",deptID);
      connection.query("SELECT sum(salary) FROM employee INNER JOIN role ON role_id = role.id and department_id = ?", [deptID], function(err, cTable) {
        if (err) throw err;
        console.table(cTable);
        afterConnection();
        })
      });
    });
    
  }
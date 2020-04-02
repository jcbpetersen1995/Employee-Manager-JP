const inquirer = require("inquirer");
const connection = require("./connection");
const conTab = require("console.table");
const colors = require("colors");
////////////////////////////////////
colors.setTheme({ custom: ['rainbow', 'underline'] });
////////////////////////////////////

function welcome() {
    console.log("Welcome to Mercedes-Benz of Littleton's Employee Management System!".cyan);
};
welcome();
//////////////inquirer
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View Employees".green,
                "View Departments".yellow,
                "View Roles".green,
                "Add Employee".yellow,
                "Add Department".green,
                "Add Roles".yellow,
                "Update an Employee Role".green,
                "Exit".rainbow
            ]
        }
    ]).then(function (res) {
        if (res.choice === "View Employees".green) {
            viewEmployees();
        } else if (res.choice === "View Departments".yellow) {
            viewDepartments();
        } else if (res.choice === "View Roles".green) {
            viewRoles();
        } else if (res.choice === "Add Employee".yellow) {
            addEmployee();
        } else if (res.choice === "Add Department".green) {
            addDepartment();
        } else if (res.choice === "Add Roles".yellow) {
            addRoles();
        } else if (res.choice === "Update an Employee Role".green) {
            updateRole();
        } else if (res.choice === "Exit".rainbow) {
            exit();
        }
    });

function doMenu() {
    console.log("--------------------------------------".rainbow)
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do next?",
                name: "choice",
                choices: [
                    "View Employees".green,
                    "View Departments".yellow,
                    "View Roles".green,
                    "Add Employee".yellow,
                    "Add Department".green,
                    "Add Roles".yellow,
                    "Update an Employee Role".green,
                    "Exit".rainbow
                ]
            }
        ]).then(function (res) {
            if (res.choice === "View Employees".green) {
                viewEmployees();
            } else if (res.choice === "View Departments".yellow) {
                viewDepartments();
            } else if (res.choice === "View Roles".green) {
                viewRoles();
            } else if (res.choice === "Add Employee".yellow) {
                addEmployee();
            } else if (res.choice === "Add Department".green) {
                addDepartment();
            } else if (res.choice === "Add Roles".yellow) {
                addRoles();
            } else if (res.choice === "Update an Employee Role".green) {
                updateRole();
            } else if (res.choice === "Exit".rainbow) {
                exit();
            }
        });
}

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + " employees found.");
        console.table("All Employees:".red, res);
        doMenu();
    })
};

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + " departments available.");
        console.table("All Departments:".green, res);
        doMenu();
    })
};

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + " roles available.");
        console.log("All roles: ".brightBlue, res);
        doMenu();
    })
};

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the first name of the employee you want to add?".green
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the last name of the employee?".red
                },
                {
                    type: "list",
                    name: "role",
                    message: "what role does this employee play?".yellow,
                    choices: function () {
                        let roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    }
                },
                {
                    type: "number",
                    name: "manager",
                    message: "What is the ID number of the manager?".cyan
                }
            ])
            .then(function (answers) {

                let roleID;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].title == answers.role) {
                        roleID = res[j].id;
                    }
                }
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: roleID,
                        manager_id: answers.manager
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("-----------------------".rainbow)
                        console.log("Employee Added.".rainbow);
                        viewEmployees();
                    }
                )
            })
    })
};

function addDepartment() {
    //var query = "SELECT * FROM department";
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "What is the name of the department you'd like to add?".magenta
            }
        ]).then(function (res) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: res.department
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("-----------------------".rainbow);
                    console.log("Department Added.".rainbow);
                    viewDepartments();
                }
            )
        })
};

function addRoles() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "roleName",
                    message: "What is the role you want to add?".cyan
                },
                {
                    type: "input",
                    name: "pay",
                    message: "What is the salary for this position?".yellow
                },
                {
                    type: "list",
                    name: "depName",
                    message: "Which department would you like to add the role to?".green,

                    choices: function () {
                        let depArray = [];
                        for (let i = 0; i < res.length; i++) {
                            depArray.push(res[i].name);
                        }
                        return depArray;
                    }
                }
            ])
            .then(function (answers) {

                let depID;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].name == answers.name) {
                        depID = res[j].id;
                    }
                }
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answers.roleName,
                        salary: answers.pay,
                        department_id: depID
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("-----------------------".rainbow);
                        console.log("Role Added.".rainbow);
                        viewRoles();
                    }
                );
            });
    });
};

function updateRole () {
    connection.query(
      "SELECT * FROM role, employee WHERE role.id = role_id",
      function(err, res) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              type: "list",
              name: "selected",
              message: "Which employee's role would you like to edit?".yellow,
              choices: function() {
                let empArray = [];
                for (let i = 0; i < res.length; i++) {
                  empArray.push(res[i].first_name + " " + res[i].last_name);
                }
  
                let names1 = empArray =>
                  empArray.filter((v, i) => empArray.indexOf(v) === i);
  
                return names1(empArray);
              }
            },
            {
              type: "list",
              name: "newRole",
              message: "Which role would you like to assign to this employee?",
              choices: function() {
                let roleArray = [];
                for (let i = 0; i < res.length; i++) {
                  roleArray.push(res[i].title);
                }
                let roles1 = roleArray =>
                  roleArray.filter((v, i) => roleArray.indexOf(v) === i);
                return roles1(roleArray);
              }
            }
          ])
          .then(function(answer) {
            let newRoleID;
            for (let j = 0; j < res.length; j++) {
              if (res[j].title == answer.newRole) {
                newRoleID = res[j].role_id;
              }
            }
            let newEmpArr = answer.selected.split(" ");
            let empFirst = newEmpArr[0];
            let empLast = newEmpArr[1];
            
            connection.query(
              "UPDATE employee SET  ? WHERE ? AND ?",
              [
                {
                  role_id: newRoleID
                },
                {
                  first_name: empFirst
                },
                {
                  last_name: empLast
                }
              ],
              function(err, res) {
                if (err) throw err;
                console.log("-----------------------".rainbow);
                console.log("Employee Role Updated.".rainbow);
                viewEmployees();
              }
            );
          });
      }
    );
  };

  function exit() {
      console.log("Thank you. Now exiting the application.".rainbow)
      connection.end();

  }
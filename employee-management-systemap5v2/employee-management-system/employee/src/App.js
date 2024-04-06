import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import EmployeeDirectory from "./components/EmployeeDirectory.jsx";
import EmployeeCreate from "./components/EmployeeCreate.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import { Route, Routes } from "react-router-dom";
import UpdateEmployee from "./components/UpdateEmployee.jsx";
import EmployeeDetails from "./components/EmployeeDetails.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [employeeData, setEmployeeData] = useState([]);

  // Defining updateEmployeeData function to update employee data
  const updateEmployeeData = (newEmployee) => {
    const updatedData = [...employeeData];
    const index = updatedData.findIndex(
      (employee) => employee.id === newEmployee.id
    );
    if (index !== -1) {
      updatedData[index] = newEmployee;
      setEmployeeData(updatedData);
    }
  };

  // Defining deleteEmployee function to delete an employee
  const deleteEmployee = (id) => {
    setEmployeeData(employeeData.filter((employee) => employee.id !== id));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                employees {
                  id
                  firstName
                  lastName
                  age
                  dateOfJoining
                  title
                  department
                  employeeType
                  currentStatus
                }
              }
            `,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data.data.employees);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<EmployeeDirectory employeeData={employeeData} />}
          />
          <Route
            path="/create"
            element={<EmployeeCreate updateEmployeeData={updateEmployeeData} />}
          />
          <Route
            path="/table"
            element={<EmployeeTable employeeData={employeeData} />}
          />
          <Route
            path="/employee/:id/details"
            element={
              <EmployeeDetails
                employeeData={employeeData}
                onDeleteEmployee={deleteEmployee}
              />
            }
          />
          <Route
            path="/employee/:id/update"
            element={<UpdateEmployee updateEmployeeData={updateEmployeeData} />}
          />
          <Route
            path="/fullTime"
            element={
              <EmployeeTable
                employeeData={employeeData.filter(
                  (employee) => employee.employeeType === "FullTime"
                )}
              />
            }
          />
          <Route
            path="/partTime"
            element={
              <EmployeeTable
                employeeData={employeeData.filter(
                  (employee) => employee.employeeType === "PartTime"
                )}
              />
            }
          />
          <Route
            path="/seasonal"
            element={
              <EmployeeTable
                employeeData={employeeData.filter(
                  (employee) => employee.employeeType === "Seasonal"
                )}
              />
            }
          />
          <Route
            path="/contract"
            element={
              <EmployeeTable
                employeeData={employeeData.filter(
                  (employee) => employee.employeeType === "Contract"
                )}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

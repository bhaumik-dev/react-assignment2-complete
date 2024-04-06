import React, { useState, useEffect } from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import { useParams } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails.jsx";
import "../styles/styles.css";

const EmployeeDirectory = ({ employeeData }) => {
  const { id } = useParams();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  useEffect(() => {
    // Setting filtered employees to all employees initially
    if (employeeData) {
      setFilteredEmployees(employeeData);
    }
  }, [employeeData]);

  useEffect(() => {
    // Checking if id exists in the route params to know whether to show EmployeeDetails
    setShowEmployeeDetails(!!id);
  }, [id]);

  const handleSearch = (query) => {
    // Filtering employeeData based on the search query
    const filtered = employeeData.filter((employee) =>
      employee.department.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div>
      <h1>Employee Directory</h1>
      <EmployeeSearch onSearch={handleSearch} />
      {filteredEmployees && filteredEmployees.length > 0 ? (
        <>
          <EmployeeTable employeeData={filteredEmployees} />
          {showEmployeeDetails && <EmployeeDetails />}
        </>
      ) : (
        <p>No employee data available</p>
      )}
    </div>
  );
};

export default EmployeeDirectory;

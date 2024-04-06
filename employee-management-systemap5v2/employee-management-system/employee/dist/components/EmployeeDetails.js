"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
require("../styles/styles.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EmployeeDetails = _ref => {
  let {
    employeeData,
    onDeleteEmployee
  } = _ref;
  const {
    id
  } = (0, _reactRouterDom.useParams)();
  const [employee, setEmployee] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  const navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: "\n              query {\n                employee(id: \"".concat(id, "\") {\n                  id\n                  firstName\n                  lastName\n                  age\n                  dateOfJoining\n                  title\n                  department\n                  employeeType\n                  currentStatus\n                }\n              }\n            ")
          })
        });
        if (response.ok) {
          const data = await response.json();
          setEmployee(data.data.employee);
          setLoading(false);
        } else {
          console.error("Failed to fetch employee data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch("http://localhost:4000/deleteEmployee/".concat(id), {
          method: "DELETE"
        });
        if (response.ok) {
          setEmployee(null);
          onDeleteEmployee(id);
          navigate("/");
        } else {
          console.error("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  const handleUpdate = () => {
    navigate("/employee/".concat(id, "/update"));
  };
  if (loading) {
    return /*#__PURE__*/_react.default.createElement("p", null, "Loading...");
  }
  if (!employee) {
    return /*#__PURE__*/_react.default.createElement("p", null, "Employee Not Found");
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "employee-details-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Employee Details"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "ID:"), " ", employee.id), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "First Name:"), " ", employee.firstName), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Last Name:"), " ", employee.lastName), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Age:"), " ", employee.age), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Date of Joining:"), " ", employee.dateOfJoining), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Title:"), " ", employee.title), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Department:"), " ", employee.department), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Employee Type:"), " ", employee.employeeType), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, "Current Status:"), " ", /*#__PURE__*/_react.default.createElement("span", {
    className: employee.currentStatus ? "active" : "inactive"
  }, employee.currentStatus ? "Active" : "Inactive")), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleUpdate
  }, "Update"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleDelete
  }, "Delete"));
};
var _default = exports.default = EmployeeDetails;
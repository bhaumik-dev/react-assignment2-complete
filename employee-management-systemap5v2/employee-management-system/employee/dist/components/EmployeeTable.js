"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("../styles/styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EmployeeTable = _ref => {
  let {
    employeeData
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleRowClick = employeeId => {
    navigate("/employee/".concat(employeeId, "/details"));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "employee-table-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Employee Table"), employeeData && employeeData.length > 0 ? /*#__PURE__*/_react.default.createElement("table", {
    className: "employee-table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "FirstName"), /*#__PURE__*/_react.default.createElement("th", null, "LastName"), /*#__PURE__*/_react.default.createElement("th", null, "Age"), /*#__PURE__*/_react.default.createElement("th", null, "DateOfJoining"), /*#__PURE__*/_react.default.createElement("th", null, "Title"), /*#__PURE__*/_react.default.createElement("th", null, "Department"), /*#__PURE__*/_react.default.createElement("th", null, "EmployeeType"), /*#__PURE__*/_react.default.createElement("th", null, "CurrentStatus"))), /*#__PURE__*/_react.default.createElement("tbody", null, employeeData.map((employee, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: employee.id,
    onClick: () => handleRowClick(employee.id),
    className: index % 2 === 0 ? "even-row" : "odd-row"
  }, /*#__PURE__*/_react.default.createElement("td", null, employee.firstName), /*#__PURE__*/_react.default.createElement("td", null, employee.lastName), /*#__PURE__*/_react.default.createElement("td", null, employee.age), /*#__PURE__*/_react.default.createElement("td", null, employee.dateOfJoining), /*#__PURE__*/_react.default.createElement("td", null, employee.title), /*#__PURE__*/_react.default.createElement("td", null, employee.department), /*#__PURE__*/_react.default.createElement("td", null, employee.employeeType), /*#__PURE__*/_react.default.createElement("td", null, employee.currentStatus ? "Working" : "Retired"))))) : /*#__PURE__*/_react.default.createElement("p", null, "No employee data available"));
};
var _default = exports.default = EmployeeTable;
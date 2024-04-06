"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _EmployeeSearch = _interopRequireDefault(require("./EmployeeSearch.jsx"));
var _EmployeeTable = _interopRequireDefault(require("./EmployeeTable.jsx"));
var _reactRouterDom = require("react-router-dom");
var _EmployeeDetails = _interopRequireDefault(require("./EmployeeDetails.jsx"));
require("../styles/styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EmployeeDirectory = _ref => {
  let {
    employeeData
  } = _ref;
  const {
    id
  } = (0, _reactRouterDom.useParams)();
  const [filteredEmployees, setFilteredEmployees] = (0, _react.useState)([]);
  const [showEmployeeDetails, setShowEmployeeDetails] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    // Setting filtered employees to all employees initially
    if (employeeData) {
      setFilteredEmployees(employeeData);
    }
  }, [employeeData]);
  (0, _react.useEffect)(() => {
    // Checking if id exists in the route params to know whether to show EmployeeDetails
    setShowEmployeeDetails(!!id);
  }, [id]);
  const handleSearch = query => {
    // Filtering employeeData based on the search query
    const filtered = employeeData.filter(employee => employee.department.toLowerCase().includes(query.toLowerCase()));
    setFilteredEmployees(filtered);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "Employee Directory"), /*#__PURE__*/_react.default.createElement(_EmployeeSearch.default, {
    onSearch: handleSearch
  }), filteredEmployees && filteredEmployees.length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EmployeeTable.default, {
    employeeData: filteredEmployees
  }), showEmployeeDetails && /*#__PURE__*/_react.default.createElement(_EmployeeDetails.default, null)) : /*#__PURE__*/_react.default.createElement("p", null, "No employee data available"));
};
var _default = exports.default = EmployeeDirectory;
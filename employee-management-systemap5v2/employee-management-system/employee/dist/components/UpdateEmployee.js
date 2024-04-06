"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UpdateEmployee = _ref => {
  let {
    updateEmployeeData
  } = _ref;
  const {
    id
  } = (0, _reactRouterDom.useParams)();
  const [formData, setFormData] = (0, _react.useState)({
    title: "",
    department: "",
    currentStatus: true
  });
  (0, _react.useEffect)(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:4000/employee/".concat(id));
        if (response.ok) {
          const employeeData = await response.json();
          setFormData({
            title: employeeData.title,
            department: employeeData.department,
            currentStatus: employeeData.currentStatus
          });
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [id]);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/updateEmployee/".concat(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Employee updated successfully");
        updateEmployeeData(formData);
        window.location.href = "/";
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "employee-details-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Update Employee"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "title"
  }, "Title:"), /*#__PURE__*/_react.default.createElement("select", {
    id: "title",
    name: "title",
    value: formData.title,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select Title"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Employee"
  }, "Employee"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Manager"
  }, "Manager"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Director"
  }, "Director"), /*#__PURE__*/_react.default.createElement("option", {
    value: "VP"
  }, "VP"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "department"
  }, "Department:"), /*#__PURE__*/_react.default.createElement("select", {
    id: "department",
    name: "department",
    value: formData.department,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select Department"), /*#__PURE__*/_react.default.createElement("option", {
    value: "IT"
  }, "IT"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Marketing"
  }, "Marketing"), /*#__PURE__*/_react.default.createElement("option", {
    value: "HR"
  }, "HR"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Engineering"
  }, "Engineering"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "currentStatus"
  }, "Current Status:"), /*#__PURE__*/_react.default.createElement("select", {
    id: "currentStatus",
    name: "currentStatus",
    value: formData.currentStatus,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: true
  }, "Active"), /*#__PURE__*/_react.default.createElement("option", {
    value: false
  }, "Inactive"))), /*#__PURE__*/_react.default.createElement("button", {
    id: "updateButton",
    type: "submit"
  }, "Save")));
};
var _default = exports.default = UpdateEmployee;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EmployeeCreate = _ref => {
  let {
    updateEmployeeData
  } = _ref;
  const navigate = (0, _reactRouterDom.useNavigate)();

  // State to store form data
  const [formData, setFormData] = (0, _react.useState)({
    firstName: "",
    lastName: "",
    age: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: ""
  });

  // Handling form input change
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

  // Handling form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Sending post request
      const response = await fetch("http://localhost:4000/createEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newEmployee = await response.json();
        updateEmployeeData(newEmployee);

        // Clearing form data
        setFormData({
          firstName: "",
          lastName: "",
          age: "",
          dateOfJoining: "",
          title: "",
          department: "",
          employeeType: ""
        });

        // Showing alert when new employee is added successfully
        window.alert("New Employee Added");

        // Then, navigating to the main page
        navigate("/");
      } else {
        console.error("Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Create Employee"), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label",
    htmlFor: "firstName"
  }, "First Name:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "input",
    type: "text",
    id: "firstName",
    name: "firstName",
    value: formData.firstName,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label",
    htmlFor: "lastName"
  }, "Last Name:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "input",
    type: "text",
    id: "lastName",
    name: "lastName",
    value: formData.lastName,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label",
    htmlFor: "age"
  }, "Age:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "input",
    type: "number",
    id: "age",
    name: "age",
    value: formData.age,
    onChange: handleChange,
    min: 20,
    max: 70,
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label",
    htmlFor: "dateOfJoining"
  }, "Date of Joining:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "input",
    type: "date",
    id: "dateOfJoining",
    name: "dateOfJoining",
    value: formData.dateOfJoining,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label",
    htmlFor: "title"
  }, "Title:"), /*#__PURE__*/_react.default.createElement("select", {
    className: "input",
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
    className: "label",
    htmlFor: "department"
  }, "Department:"), /*#__PURE__*/_react.default.createElement("select", {
    className: "input",
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
    className: "label",
    htmlFor: "employeeType"
  }, "Employee Type:"), /*#__PURE__*/_react.default.createElement("select", {
    className: "input",
    id: "employeeType",
    name: "employeeType",
    value: formData.employeeType,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Select Employee Type"), /*#__PURE__*/_react.default.createElement("option", {
    value: "FullTime"
  }, "Full Time"), /*#__PURE__*/_react.default.createElement("option", {
    value: "PartTime"
  }, "Part Time"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Contract"
  }, "Contract"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Seasonal"
  }, "Seasonal"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "button",
    type: "submit"
  }, "Create")))));
};
var _default = exports.default = EmployeeCreate;
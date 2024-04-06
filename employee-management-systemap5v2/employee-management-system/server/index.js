const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cors = require("cors");
const Employee = require("./models/Employee");
const bodyParser = require("body-parser");
const UpdateEmployee = require("./models/UpdateEmployee");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connecting to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://webdevbhaumik:webdevbhaumik@cluster0.tawpaxl.mongodb.net/employee-management-system",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected");
    startApolloServer();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.start().then(() => {
    console.log("Apollo Server started");
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  });
}

// Route to handle createEmployee POST request
app.post("/createEmployee", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
    } = req.body;

    // Checking if any required field is missing
    if (
      !firstName ||
      !lastName ||
      !age ||
      !dateOfJoining ||
      !title ||
      !department ||
      !employeeType
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Creating a new employee instance
    const employee = new Employee({
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
    });

    // Saving the employee to the database
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Sorry, failed to create employee." });
  }
});

// Route to fetch employee table
app.get("/employeeTable", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employee table:", error);
    res.status(500).json({ error: "Failed to fetch employee table" });
  }
});

// Route to fetch employee details by ID
app.get("/employee/:id/details", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ error: "Failed to fetch employee details" });
  }
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

// Route to handle updating employee data
app.put("/updateEmployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Finding the employee by ID and updating its data
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

module.exports = app;

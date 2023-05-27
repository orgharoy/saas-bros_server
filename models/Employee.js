import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        firstName:   { type: String, required: true },
        lastName:    { type: String, required: true },
        email:       { type: String, required: true, unique: true },
        password:    { type: String, required: true, min: 8 },
        departnemt:  { type: String}
    },
    {timestamps: true}
)

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
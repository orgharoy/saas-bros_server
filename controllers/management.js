import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

//Create Employee

export const createEmployee = async (req, res) => {
    try {
        const {firstName, lastName, email, password, department} = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({ firstName, lastName, email, password:hashedPwd, department });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

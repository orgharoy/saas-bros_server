import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';
import Merchant from '../models/Merchant.js';

dotenv.config();

//employee login
export const employeeLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const employee = await Employee.findOne({ email: email });
  
      if (!employee) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      const isMatch = await bcrypt.compare(password, employee.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong Credentials" });
      }
  
      const token = jwt.sign({ id: employee._id.toHexString() }, process.env.JWT_SECRET);
  
      delete employee.password;
  
      res.status(200).json({ token, employee });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//create merchant account
export const createMerchant = async (req, res) => {
    try {
        const {businessName, businessType, ownerName, ownerContactNumber, businessEmail, businessContactNumber, businessAddress, businessRegNumber, businessTaxId, numberOfEmployees, salesVolume, userPwd, createdBy} = req.body;

        const hashedPwd = await bcrypt.hash(userPwd, 10);

        console.log(req.body);

        const newMerchant = new Merchant({ businessName, businessType, ownerName, ownerContactNumber, businessEmail, businessContactNumber, businessAddress, businessRegNumber, businessTaxId, numberOfEmployees, salesVolume, password: hashedPwd, createdBy });

        const savedMerchant = await newMerchant.save();

        res.status(201).json(savedMerchant);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//get all merchants
export const getMerchants = async (req, res) => {
    try {
        const merchants = await Merchant.find();

        if(!merchants){
            res.status(400).json({message: "There are no merchants"});
        }

        res.status(200).json({merchants})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//get merchants that an employee has created
export const getMyMerchants = async (req, res) => {
    try {
        const empId = req.params['id'];

        const merchants = await Merchant.find({createdBy: empId})

        if(!merchants){
            res.status(400).json({message: "You have not created any users yet"})
        }

        res.status(200).json({merchants})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params['id'];

        const user = await Merchant.find({_id: userId})

        if(!user){
            res.status(400).json({message: "You have not created any users yet"})
        }

        res.status(200).json({user})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


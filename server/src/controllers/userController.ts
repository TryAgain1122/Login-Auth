import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';

export const registerAccount = async (req: Request, res: Response): Promise<void> => {
    const {firstname, lastname, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const UserRegistration = new UserModel({
        firstname, 
        lastname, 
        email, 
        password: hashedPassword
    });

    if (!firstname || !lastname || !email || !password) {
        res.status(403).json({message: "Please fill all fields"})
    }

    try {
        await UserRegistration.save();
        res.status(200).json(UserRegistration);
    } catch (error) {
        res.status(500).json({message: "Internal Server error"})
    }
}

export const login = async (req: Request, res: Response):Promise<void> => {
    const {email, password} = req.body
   
    try {
        const user = await UserModel.findOne({email});
        
        if (user) {
            //Compare the hashed password with entered password
            const isMatched = await bcrypt.compare(password, user.password);

            if (isMatched) {
               const accessToken = jwt.sign({email}, process.env.JWT_ACCESS_TOKEN!, {expiresIn: '1m'});
               const refreshToken = jwt.sign({email}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '5m'});

               res.cookie('accessToken', accessToken, {maxAge: 6000});
               res.cookie('refreshToken', refreshToken, {maxAge: 30000, httpOnly: true, secure: true, sameSite: 'strict'});

               res.json({ Login: true});
            } else {
                res.status(401).json({ Login: false, message: "Invalid Password"})
            }
        } else {
            res.status(401).json({ Login: false, Message: "User not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }

};

export const dashboard =  async (req:Request, res:Response):Promise<void> => {
     res.json({ valid: true, message: "authorized"})
}
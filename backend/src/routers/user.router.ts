import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, userModel } from '../models/user.model';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const usersCount = await userModel.countDocuments();
    if (usersCount) {
      res.send("Seed is already done.");
      return;
    }
    
    await userModel.create(sample_users);
    res.send("Seed is done.");
  }
));

router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
  
    const user = await userModel.findOne({ email, password })
  
    if (user) {
      res.send(generateToken(user));
    }
    else {
      const BAD_REQUEST = 400;
      res.status(BAD_REQUEST).send("Username and Password is not Valid")
    }
  }
));

const generateToken = (user : User) => {
  const token = jwt.sign({
    email:user.email, isAdmin: user.isAdmin
  },process.env.JWT_SECRET!,{
    expiresIn:"30d"
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  };
}

export default router;
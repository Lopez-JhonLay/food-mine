import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, userModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bycrpt from 'bcryptjs';

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
      res.status(HTTP_BAD_REQUEST).send("Username and Password is not Valid")
    }
  }
));

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await userModel.findOne({email});

    if (user) {
      res.status(HTTP_BAD_REQUEST).send('User already exist, please login');
      return;
    }

    const encryptedPassword = await bycrpt.hash(password, 10);

    const newUser: User = {
      id: '',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }

    const dbUser = await userModel.create(newUser);
    res.send(generateToken(dbUser));
  }
))

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
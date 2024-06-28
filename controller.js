
import express from "express";
import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import { Category } from "./models/categoryModel.js";
import { Product } from "./models/productModel.js";
import session from 'express-session';

import mongoose from "mongoose";
import {Discount} from "./models/discountModel.js";


const comparePassword = async (enteredPassword, hashedPassword) => {
  try {
      // Compare the entered password with the hashed password
      const result = await bcrypt.compare(enteredPassword, hashedPassword);
      return result; // Return true if passwords match, false otherwise
  } catch (error) {
      throw new Error('Error comparing passwords');
  }
};




export const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save()
    .then(user => {
      user.password = undefined;
      return res.json(user);
    })
    .catch(err => {
      return res.status(400).send({ message: err });
    });
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const {email,username,password} = user
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. No user found' });
    }
    const isPasswordValid = await comparePassword(req.body.password, password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password' });
    }
    // req.session.user = {email,username}
    return res.json({email,username});
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const  logout = async(req,res) => {
req.session.destroy();
res.send({success:true})
}

export const getCategorie = async (req,res) => {
  try {
    const q = await Category.find({});
    return res.json(q)
  } catch(error) {
    console.error("Error fetching reservations:",error );
    res.status(404).send(error);
  }
}
export const getProducts = async (req,res) => {
  try {
    const q = await Product.find({});
    return res.json(q)
  } catch(error) {
    console.error("Error fetching reservations:",error );
    res.status(404).send(error);
  }
}
export const getProductById = async (req, res) => {
  const productId = req.params.id; // Assuming the ID is passed in the request params
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const CategoriesProductsName = async (req,res) => {
  try {
    const q = await Category.aggregate([
      {
        $lookup: {
          from: "products",   // collection to join with
          localField: "name",  // field from the products collection
          foreignField: "category",       // field from the categories collection
          as: "products"             // alias for the joined data
        }}
    ]);
    return res.json(q)
  } catch(error) {
    console.error("Error fetching reservations:",error );
    res.status(404).send(error);
  }
}


export const MOodifierStock = async (req, res) => {
  try {
    const produits = req.body; // Destructure products from req.body

    await Promise.all(produits.map(async (produit) => {
      await Product.updateMany(
        { _id: produit.idProduit }, 
        { $inc: { stock: -produit.quantity } } 
      );
    }));

    // Respond with a success message
    // return res.json(produits)
    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const InsertDiscount = async(req,res) => {
  try {
  const discountsdata = req.body;
  const discoutArr = [];
  for (const discountdata of  discountsdata) {
    const { code, percentage, startDate, endDate } = discountdata
    const newDiscount = new Discount({
      code,
      percentage,
      startDate,
      endDate
    })
    discoutArr.push(newDiscount)
   }
   await Discount.insertMany(discoutArr);
   res.status(201).json({ success: true, message: 'Discounts created successfully' });
  } catch (error) {
    console.error('Error creating discounts:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
} 

export const GetDiscount = async(req,res) => {
  try {
    const q = await Discount.find({})
    return res.json(q)
  } catch(error) {
    console.error("Error fetching reservations:",error );
    res.status(404).send(error);

  }
}
  

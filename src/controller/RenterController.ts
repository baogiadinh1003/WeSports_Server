import {Request, Response} from 'express';
import mongoose from "mongoose";
import { Renter } from '../model/Renter';

/**
 * Login in using username and password.
 * @route POST /login
 */
export const postLogin = async (req: Request, res: Response) => {
    let renter = await Renter.findOne({"renterUsername": req.body.renterUsername, "renterPassword": req.body.renterPassword});
    return renter === null || undefined ? res.status(200).send("Fail login") : res.status(200).send(renter);
};

/**
 * Register account
 * @route POST /login
 */
export const postRegister = async (req: Request, res: Response) => {
    let renter = new Renter(req.body);
    try { 
        let result = await renter.save();   
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send("Sign in fail");   
    };
};
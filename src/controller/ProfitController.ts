import { Request, Response } from "express";
import { Profit } from "../model/Profit";
import { isEmpty } from "../util/validation";

export const getProfitsByIdOwner = async (req: Request, res: Response) => {
    try {
        let profits = await Profit.find({ accountId: req.body._id, accountAdmin: false });
        if (isEmpty(profits) === true) {
            return res.status(400).send({ message: `Get profits fail`, status: 2 });
        }
        return res.status(200).send({ message: `Get profit success`, data: profits, status: 1 });
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 })
    }
}

export const getAdminProfits = async (req: Request, res: Response) => {
    try {
        let profits = await Profit.find({ accountAdmin: false });
        if (isEmpty(profits) === true) {
            return res.status(400).send({ message: `Get profits fail`, status: 2 });
        }
        let adminProfits = 0;
        for (let index = 0; index < profits.length; index++) {
            const element = profits[index];
            adminProfits += (element.accountTotal / 100 * 10);
        }
        return res.status(200).send({ message: `Get profit success`, data: adminProfits, status: 1 });
    } catch (error) {
        return res.status(500).send({ message: `Server error`, status: 3 })
    }
}

export const addOrUpdateProfits = async (id: any, total: number) => {
    try {
        let profits = await Profit.findOne({ accountId: id });
        if (profits === null || profits === undefined) {
            let newProfit = new Profit();
            newProfit.accountId = id;
            newProfit.accountTotal = total;
            newProfit.accountRealOutput = (total / 100 * 90);
            await newProfit.save();
        } else {
            profits.accountTotal += total;
            profits.accountRealOutput += (total / 100 * 90);
            profits.save();
        }
        return true;
    } catch (error) {
        return false;
    }
}
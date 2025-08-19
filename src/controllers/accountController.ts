import {Response, Request} from "express";
import {Reader, ReaderDto} from "../model/Reader.js";
import {convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/AccountServiceImplMongo.js";

export const removeAccount = (req:Request, res:Response) => {
    res.send("ok")
}

export const changePassword = (req:Request, res:Response) => {
    res.send("ok")
}

export const getAccount =(req:Request, res:Response) => {
    res.send("ok")
}
export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.addAccount(reader);
    res.status(201).send();
}
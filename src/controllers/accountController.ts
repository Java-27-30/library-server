import {Response, Request} from "express";
import {Reader, ReaderDto} from "../model/Reader.js";
import {checkReaderId, convertReaderDtoToReader} from "../utils/tools.js";
import {accountServiceMongo} from "../services/AccountServiceImplMongo.js";
import {HttpError} from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";
import {LoginPassType, Roles} from "../utils/libTypes.js";

export const login = async (req: Request, res: Response) => {
    const result = accountServiceMongo.login(req.body as LoginPassType);
    res.json(result);
};


export const changeRoles = async (req: Request, res: Response) => {
    const id = checkReaderId(req.query.id as string);
    const newRoles = req.body as Roles[];
    const readerWithNewRoles = await accountServiceMongo.changeRoles(id, newRoles);
    res.json(readerWithNewRoles)
}


export const updateAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const _id = checkReaderId(req.query.id as string)
    const dto:ReaderDto = {...body, id: _id, password:""};
    const updReader = convertReaderDtoToReader(dto);
    const updAccount = await accountServiceMongo.updateAccount(updReader);
    res.json(updAccount);
}


export const removeAccount = async (req: Request, res: Response) => {
    const {id} = req.query;
    const _id = checkReaderId(id as string);
    const account = await accountServiceMongo.removeAccount(_id);
    res.json(account)
}

export const changePassword = async (req: Request, res: Response) => {
    const {id, oldPassword, newPassword} = req.body;

    const _id = checkReaderId(id);
    await accountServiceMongo.changePassword(_id, oldPassword, newPassword);
    res.send("Password changed")
}


export const getAccountById =async (req: Request, res: Response) => {
    const {id} = req.query;
    const _id = checkReaderId(id as string);
    const account = await accountServiceMongo.getAccountById(_id);
    res.json(account);
}
export const addAccount = async (req: Request, res: Response) => {
    const body = req.body;
    const reader: Reader = convertReaderDtoToReader(body as ReaderDto);
    await accountServiceMongo.addAccount(reader);
    res.status(201).send();
}


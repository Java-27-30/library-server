import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class AccountServiceImplMongo implements AccountService{

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id);
        if(temp) throw new HttpError(409, "Reader already exists");
        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    }

    changePassword(id: number, newPassword: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getAccount(id: number): Promise<Reader> {
        throw "Not realised method"
    }

    removeAccount(id: number): Promise<Reader> {
        throw "Not realised method"
    }

}

export const accountServiceMongo = new AccountServiceImplMongo();
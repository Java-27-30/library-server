import {AccountService} from "./accountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongooseModel.js";
import {HttpError} from "../errorHandler/HttpError.js";
import bcrypt from "bcryptjs";


export class AccountServiceImplMongo implements AccountService{

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id);
        if(temp) throw new HttpError(409, "Reader already exists");
        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();
    }

    async changePassword(id: number, oldPassword: string, newPassword:string): Promise<void> {
        console.log(id, oldPassword, newPassword)
        const account = await ReaderModel.findById(id);
        if (!account) throw new HttpError(404, "Account not found");
        const checkPass = bcrypt.compareSync(oldPassword, account.passHash);
        if(!checkPass) throw new HttpError(403, "");
        else{
            const newHash = bcrypt.hashSync(newPassword, 10);
            account.passHash = newHash;
            await account.save();
        }
    }

    async getAccountById(id: number): Promise<Reader> {
        const result = await ReaderModel.findById(id);
        if(!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

    async removeAccount(id: number): Promise<Reader> {
        const result = await ReaderModel.findByIdAndDelete(id);
        if(!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

    async updateAccount(updReader: Reader): Promise<Reader> {
        const result =
            await ReaderModel.findByIdAndUpdate(updReader._id, {userName: updReader.userName, email: updReader.email, birthdate: updReader.birthdate},{new:true})
        if(!result) throw new HttpError(404, "Account not found");
        return result as unknown as Reader;
    }

}

export const accountServiceMongo = new AccountServiceImplMongo();
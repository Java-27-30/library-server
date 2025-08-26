import express, {Response} from "express";
import * as controller from '../controllers/accountController.js'
import {bodyValidation} from "../validation/bodyValidation.js";
import {
    ChangePassDtoSchema,
    ChangeRolesSchema,
    ReaderDtoSchema,
    UpdateAccountSchema
} from "../validation/joiSchemas.js";
import {AuthRequest, Roles} from "../utils/libTypes.js";
import {HttpError} from "../errorHandler/HttpError.js";


export const  accountRouter = express.Router();

accountRouter.post('/',bodyValidation(ReaderDtoSchema),controller.addAccount);
accountRouter.get('/reader_id', controller.getAccountById);
accountRouter.patch('/password', bodyValidation(ChangePassDtoSchema), controller.changePassword);
accountRouter.delete('/', controller.removeAccount);
accountRouter.patch('/', bodyValidation(UpdateAccountSchema), controller.updateAccount);
accountRouter.put('/roles',bodyValidation(ChangeRolesSchema),controller.changeRoles)
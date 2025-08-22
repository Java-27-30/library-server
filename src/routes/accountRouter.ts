import express from "express";
import * as controller from '../controllers/accountController.js'
import {bodyValidation} from "../validation/bodyValidation.js";
import {ChangePassDtoSchema, ReaderDtoSchema} from "../validation/joiSchemas.js";


export const  accountRouter = express.Router();

accountRouter.post('/',bodyValidation(ReaderDtoSchema),controller.addAccount);
accountRouter.get('/reader_id', controller.getAccountById);
accountRouter.patch('/password', bodyValidation(ChangePassDtoSchema), controller.changePassword);
accountRouter.delete('/', controller.removeAccount)
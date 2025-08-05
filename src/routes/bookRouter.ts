
import express, {Request, Response, NextFunction} from 'express';
import {BookController} from "../controllers/BookController.js";

export const bookRouter = express.Router();

const controller = new BookController();

// bookRouter.get('/', controller.getAllBooks);
// bookRouter.post('/', controller.addBook);

bookRouter.get('/',(req:Request, res:Response) => {
    controller.getAllBooks(req, res);
})

bookRouter.post('/', (req:Request, res:Response) => {
    console.log(req.body)
    controller.addBook(req, res);
} )
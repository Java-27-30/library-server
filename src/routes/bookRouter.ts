
import express, {Request, Response, NextFunction} from 'express';
import {BookController} from "../controllers/BookController.js";
import * as controller from '../controllers/bookControllerFunc.js'
export const bookRouter = express.Router();

//const controller = new BookController();

// bookRouter.get('/',(req:Request, res:Response) => {
//     controller.getAllBooks(req, res);
// })
//
// bookRouter.post('/', (req:Request, res:Response) => {
//     console.log(req.body)
//     controller.addBook(req, res);
// } )

bookRouter.get('/', controller.getAllBooks);
bookRouter.post('/', controller.addBook);
bookRouter.delete('/',controller.removeBook);
bookRouter.patch('/pickup',controller.pickUpBook);
bookRouter.patch('/return',controller.returnBook);
bookRouter.get('/genre', controller.getBooksByGenre);

import express, {Request, Response, NextFunction} from 'express';
import {BookController} from "../controllers/BookController.js";
import * as controller from '../controllers/bookControllerFunc.js';
import {bodyValidation} from "../validation/bodyValidation.js";
import {BookDtoSchema} from "../validation/joiSchemas.js";
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
//========================Lost Context=====================
// bookRouter.get('/', controller.getAllBooks.bind(controller));
// bookRouter.post('/', controller.addBook.bind(controller));

 bookRouter.get('/', controller.getAllBooks);
 bookRouter.post('/', bodyValidation(BookDtoSchema), controller.addBook);
bookRouter.delete('/',controller.removeBook);
bookRouter.patch('/pickup',controller.pickUpBook);
bookRouter.patch('/return',controller.returnBook);
bookRouter.get('/genre', controller.getBooksByGenre);
bookRouter.get('/gen_st', controller.getBooksByGengreAndStatus);


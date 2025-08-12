import {Response, Request} from "express";
import {libServiceEmbedded} from "../services/libServiceImplEmbedded.js";
import {Book, BookDto} from "../model/Book.js";
import {convertBookDtoToBook, getGenre} from "../utils/tools.js";
import {HttpError} from "../errorHandler/HttpError.js";

export const getBooksByGenre = async (req: Request, res: Response) => {
    const {genre} = req.query;
    const genre_upd = getGenre(genre as string);
    const result = await libServiceEmbedded.getBooksByGenre(genre_upd);
    res.json(result);
}


export const returnBook = async (req: Request, res: Response) => {
    const {id} = req.query;
    await libServiceEmbedded.returnBook(id as string);
    res.send("Book returned")
}


export const pickUpBook = async (req: Request, res: Response) => {
    const {id, reader} = req.query;
    await libServiceEmbedded.pickUpBook(id as string, reader as string);
    res.send(`Book picked by ${reader}`)
}


export const addBook = async (req: Request, res: Response) => {
    const dto = req.body as BookDto;
    const book: Book = convertBookDtoToBook(dto);
    const result = await libServiceEmbedded.addBook(book);
    if (result)
        res.status(201).json(book)
    else throw new HttpError(409, 'Book not added. Id conflict')
}

export const getAllBooks =async (req: Request, res: Response) => {
    const result = await libServiceEmbedded.getAllBooks();
    res.json(result);
}

export const removeBook = async (req: Request, res: Response) => {
    const {id} = req.query;
    const result = await libServiceEmbedded.removeBook(id as string);
    res.json(result);
}


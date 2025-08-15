import {LibService} from "./libService.js";
import {Book, BookGenres} from "../model/Book.js";
import {pool} from "../config/libConfig.js";

export class LibServiceImplSQL implements  LibService{

    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status])
        console.log(result)
        if(!result)
        return Promise.resolve(false);
        else return Promise.resolve(true);
    }

    getAllBooks(): Promise<Book[]> {
        return Promise.resolve([]);
    }

    getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        return Promise.resolve([]);
    }

    pickUpBook(id: string, reader: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    removeBook(id: string): Promise<Book> {
        throw  ""
    }

    returnBook(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}

export const libServiceSql = new LibServiceImplSQL();
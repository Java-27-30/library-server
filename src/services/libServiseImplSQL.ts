import {LibService} from "./libService.js";
import {Book, BookGenres, BookStatus} from "../model/Book.js";
import {pool} from "../config/libConfig.js";
import {HttpError} from "../errorHandler/HttpError.js";

export class LibServiceImplSQL implements  LibService{

    async addBook(book: Book): Promise<boolean> {
        const result = await pool.query('INSERT INTO books VALUES(?,?,?,?,?)',
            [book.id, book.title, book.author, book.genre, book.status])
       // console.log(result)
        if(!result)
        return Promise.resolve(false);
        else return Promise.resolve(true);
    }

    async getAllBooks(): Promise<Book[]> {
        const [result] = await pool.query('SELECT * FROM books')
        return result as unknown as Book[];
    }

    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const [result] = await pool.query('SELECT * from books WHERE genre = ?', [genre])
        return result as Book[];
    }

    async pickUpBook(id: string, reader: string): Promise<void> {
        const book = await this.getBookById(id);
        if (book.status !== BookStatus.ON_STOCK)
            throw new HttpError(400, "Wrong book status")

        let queriedReader = await this.getReaderByName(reader);
        if (!book)
            throw new HttpError(400,"Can't return book because this book or reader not exists");
        if (!queriedReader) {
            await pool.query('INSERT INTO readers VALUES (null, ?)', [reader]);
            queriedReader = await this.getReaderByName(reader);
        }

        await pool.query('INSERT INTO books_readers VALUES(?, ?, ?, ?)',
            [book.id, queriedReader.reader_id, new Date().toDateString(), null]);
        pool.query('UPDATE books SET status = "on_hand" WHERE id = ?', [id])

    }

    private getReaderByName = async (reader: string) => {
        const query = 'SELECT * FROM readers WHERE name = ?'
        const [result] = await pool.query(query, [reader]);
        const readersArr = result as { reader_id: number, name: string }[];
        const [queriedReader] = readersArr;
        return queriedReader;
    }

    async removeBook(id: string): Promise<Book> {
        const book = await this.getBookById(id);
        if (book.status !== BookStatus.ON_STOCK)
            throw new HttpError(400, "Wrong book status. Book on hand yet");
        book.status = BookStatus.REMOVED;
        pool.query('DELETE FROM books_readers WHERE book_id = ?', [id])
        pool.query('DELETE FROM books WHERE id = ?', [id])
        return book;
    }

    async returnBook(id: string): Promise<void> {
        const book = await this.getBookById(id);
        if (book.status !== BookStatus.ON_HAND)
            throw new HttpError(400,"Wrong book status");
        pool.query('UPDATE books SET status = "on_stock" WHERE id = ?', [id])
        await pool.query('UPDATE books_readers SET return_date = ? WHERE book_id = ? AND return_date IS NULL', [new Date().toDateString(), id]);
    }

    async getBookById(id: string): Promise<Book> {
        const query = 'SELECT * FROM books WHERE id = ?';
        const value = [id]
        const [result] = await pool.query(query, value);
        const books = result as Book[];

        if (books.length) {
            let queryedBook = books[0];
            const pickRecords = await this.getPickRecordsByBookId(queryedBook.id)
            queryedBook.pickList = pickRecords;
            return Promise.resolve(queryedBook)
        }
        throw new HttpError(404,`Book with id ${id} not found`);
    }

    getBooksByGenreAndStatus(genre: BookGenres, status: BookStatus): Promise<Book[]> {
        return Promise.resolve([]);
    }

    getPickRecordsByBookId = async (id: string) => {
        const query = 'SELECT pick_date, return_date, name as reader FROM (books_readers as b_r JOIN readers as r ON b_r.reader_id = r.reader_id) WHERE b_r.book_id = ?'
        const [result] = await pool.query(query, [id])
        return result as {pick_date: string, return_date:string, reader: string}[];
    }

}

export const libServiceSql = new LibServiceImplSQL();
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import {Roles} from "../utils/libTypes.js";


export const PORT=3500;
export const MONGO_URI = 'mongodb+srv://konspirin:lEUH2CDZKqCvxdCx@cluster0.chmbb0u.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0'
dotenv.config();
//===============mySQL Connection================
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export const SKIP_ROUTES = [
    "POST/accounts", "GET/api/books"
]
/*
    USER: getAccById(?), changePass(?), updateAcc(?) || HW || getBookById getBookByJenre
    ADMIN: getAccById, updateAcc, addBook, removeBook, getBookById, getBooksByReader
    SUPERVISOR: deleteAcc, changeRoles
    LIBRARIAN: pickUpbook, returnBook, getters
 */
export const PATH_ROUTES = {
 "GET/accounts/reader_id" : [Roles.USER, Roles.ADMIN],
    "PATCH/accounts/password" : [Roles.USER],
    "DELETE/accounts" : [Roles.SUPERVISOR],
    "PATCH/accounts" : [Roles.USER,Roles.ADMIN],
    "PUT/accounts/roles" : [Roles.SUPERVISOR],
    //===========================HW==================
    "GET/api/books/book_id" : [Roles.USER, Roles.ADMIN],
    "GET/api/books/genre" : [Roles.USER, Roles.LIBRARIAN],
    "GET/api/books/gen_st" : [Roles.LIBRARIAN],
    "POST/api/books":[Roles.ADMIN],
    "DELETE/api/books":[Roles.ADMIN],
    "PATCH/api/books/pickup":[Roles.LIBRARIAN],
    "PATCH/api/books/return":[Roles.LIBRARIAN],
    "GET/api/books/books_reader":[Roles.ADMIN, Roles.LIBRARIAN]
}

export const CHECK_ID_ROUTES = [
    "GET/accounts/reader_id", "PATCH/accounts/password", "PATCH/accounts"
]
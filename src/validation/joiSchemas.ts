import Joi, {string} from 'joi'
import {Roles} from "../utils/libTypes.js";

export const BookDtoSchema = Joi.object({
    title:Joi.string().min(2).required(),
    author:Joi.string().min(1).required(),
    genre:Joi.string().required(),
    quantity:Joi.number().min(1).max(10)
});

export const ReaderDtoSchema = Joi.object({
    id:Joi.number().positive().max(999999999).min(100000000).required(),
    userName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required(),
    birthdate: Joi.string().isoDate().required()
})

export const ChangePassDtoSchema = Joi.object({
    id:Joi.number().positive().max(999999999).min(100000000).required(),
    oldPassword: Joi.string().alphanum().min(8).required(),
    newPassword: Joi.string().alphanum().min(8).required(),
});
export const UpdateAccountSchema = Joi.object({
    userName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    birthdate: Joi.string().isoDate().required()
})

 export const ChangeRolesSchema = Joi.array<Roles[]>()

export type ArraySchema = typeof ChangeRolesSchema;
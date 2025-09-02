/*
PATCH/accounts/password => Roles.USER,
GET/accounts/reader_id => ROLES.USER, ROLES.ADMIN
 */

import {AuthRequest, Roles} from "../utils/libTypes.js";
import {NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import {configuration} from "../config/libConfig.js";

export const authorize = (pathRoute:Record<string, Roles[]>)=>
    (req:AuthRequest, res:Response, next:NextFunction)=> {
    const route = req.method + req.path
        const roles = req.roles;
    if(!roles || roles.some(r => pathRoute[route].includes(r))){
        next();
    }
    else throw new HttpError(403, "")
    }


    export  const checkAccountById = (checkPathId:string[]) => {
        return (req:AuthRequest, res:Response, next:NextFunction)=> {
            const route = req.method + req.path;
            const roles = req.roles;
            if(!roles || !checkPathId.includes(route) || (!req.roles!.includes(Roles.ADMIN)
                && req.roles!.includes(Roles.USER)
                && req.userId == req.query.id))
                next();
            else throw new HttpError(403, "You can modify only your own account")
        }
    }

    export const checkRequestLimit = (reqList: Map<number, number[]>) => {
        return (req:AuthRequest, res:Response, next:NextFunction)=> {
            if(req.roles?.length === 1 && req.roles.includes(Roles.USER)){
                const currTime = new Date().getTime();
                const id = +req.userId!;
                const requests = reqList.get(id);
                console.log(requests)
                if(!requests)
                    reqList.set(id, [currTime]);
                else {
                    if(currTime - requests[0] > configuration.timeWindowMs){
                        reqList.set(id, [currTime]);
                        console.log(reqList.get(id));
                    }
                    else if(requests.length< configuration.requestLimit){
                        requests.push(currTime);
                        console.log(reqList.get(id));
                    }
                    else throw new HttpError(403, "Too many requests!")
                }
            }

            next();
        }
    }
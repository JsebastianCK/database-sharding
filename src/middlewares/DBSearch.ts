import {Request, Response} from 'express';
import * as crypto from 'crypto';
import { iDbSearcher } from '../interfaces/IDbSearcher';
import { IExtendedRequest } from '../interfaces/IExtendedRequest';
import { DB } from '../db/DB';

/**
 * Searches the port where the database is located based
 * on the hashed parameter
 * @param param
 */
export const searchDatabase = (param: iDbSearcher) => (req: IExtendedRequest, res: Response, next: CallableFunction) => {
    let parama = req.params[param.param];

    let hash = crypto.createHash('sha256').update(parama).digest('base64');
    let hashId = hash.substr(0,5);

    let port = Number(param.hashRing.get(hashId));

    req.database = DB.getClient(port);
    req.databasePort = port;

    next();
}
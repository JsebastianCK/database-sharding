import { Request } from "express";
import { Client } from "pg";

export interface IExtendedRequest extends Request {
    database: Client,
    databasePort: number
}
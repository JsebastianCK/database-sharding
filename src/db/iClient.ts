import { Client } from "pg";

export interface iClient {
    id: number,
    client: Client
}
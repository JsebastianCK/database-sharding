import { Client } from 'pg';
import { iClient } from './iClient';

/**
 * Database handler
 */
export class DB {

    static host: string = 'localhost';

    static user: string = 'admin';

    static database: string = 'admin';

    static password: string = 'admin';

    /**
     * 
     */
    static clients: Array<iClient> = [
        {
            id: 5432,
            client: new Client({
                'host': DB.host,
                'port': 5432,
                'user': DB.user,
                'password': DB.password,
                'database': DB.database
            })
        },
        {
            id: 5433,
            client: new Client({
                'host': DB.host,
                'port': 5433,
                'user': DB.user,
                'password': DB.password,
                'database': DB.database
            })
        },
        {
            id: 5434,
            client: new Client({
                'host': DB.host,
                'port': 5434,
                'user': DB.user,
                'password': DB.password,
                'database': DB.database
            })
        }
    ];

    private static initUserTable: string = `CREATE TABLE person
    (
        ID INT NOT NULL primary key,
        name text
    )`;

    /**
     * Return all available clients
     */
    static getClients(): Array<iClient>
    {
        return this.clients;
    }

    /**
     * Returns a specific client
     * @param id Client id
     */   
    static getClient(id: number): Client
    {
        let client = this.clients.filter(client => client.id == id)[0].client;
        return client;
    }

    static async connectDatabases()
    {
        await this.clients.map(async client => {
            await client.client.connect()
            console.log(`Base de datos ${client.id} conectada`);
            await client.client.query(this.initUserTable)
                .then(() => console.log(`Tabla de persona creada en ${client.id}`))
                .catch((e) => console.log(`Tabla de persona ya existia en ${client.id}`));
        })
    }
}
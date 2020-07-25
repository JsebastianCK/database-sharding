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


    /**
     * Return all available clients
     */
    static getClients(): Array<iClient>
    {
        return this.clients;
    }

    /**
     * Returns a specific client
     */   
    static getClient(id: number): Client
    {
        let client = this.clients.filter(client => client.id == id)[0].client;
        return client;
    }

    static async connectDatabases(): Promise<void>
    {
        this.clients.map(client => {
            client.client.connect()
                .then(() => console.log('Database connected'))
                .catch(e => console.log(e));
        })
    }
}
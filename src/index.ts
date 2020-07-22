import * as express from 'express';
import * as http from 'http';
import * as HashRing from "consistent-hash";
import * as crypto from 'crypto';
import {DB} from './db/DB';
import { searchDatabase } from './middlewares/DBSearch'
import { IExtendedRequest } from './interfaces/IExtendedRequest';
import * as personas from './db/data.json';

const app = express();
const server = http.createServer(app);
const PORT: number = 8000;

const hr = new HashRing();
DB.getClients().map(client => hr.add(client.id));

server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:8000`);
    await DB.connectDatabases();
    personas.forEach(async persona => {
        let id =  persona.id;

        let hash = crypto.createHash('sha256').update(id).digest('base64');
        let hashId = hash.substr(0,5);
        let port = Number(hr.get(hashId));

        await DB.getClient(port).query(`INSERT INTO usuario (id, name) VALUES(${persona.id}, ${persona.name})`).catch((err) => console.log('No se pudo guardar'));
    });
})



app.get(
    '/:id',
    searchDatabase({param: 'id', hashRing: hr}),
    async (req: IExtendedRequest, res: express.Response) => {
        let idUsuario = req.params.id;
        let response = await req.database.query(`SELECT * FROM usuario WHERE id = ${idUsuario}`);

        res.json({
            'persona': response.rows[0],
            'db': req.databasePort
        });
    }
);
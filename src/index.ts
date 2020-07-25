import * as express from 'express';
import * as http from 'http';
import * as HashRing from "consistent-hash";
import * as crypto from 'crypto';
import {DB} from './db/DB';
import { searchDatabase } from './middlewares/DBSearch'
import { IExtendedRequest } from './interfaces/IExtendedRequest';
import * as people from './db/data.json';

const app = express();
const server = http.createServer(app);
const PORT: number = 8000;

const hr = new HashRing();
DB.getClients().map(client => hr.add(client.id));

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:8000`);
    DB.connectDatabases().then(() => {
        people.forEach(person => {
            let id =  person.id;
    
            let hash = crypto.createHash('sha256').update(id).digest('base64');
            let hashId = hash.substr(0,5);
            let port = Number(hr.get(hashId));
    
            DB.getClient(port)
                .query(`INSERT INTO person (id, name) VALUES(${person.id}, '${person.name}')`)
                .then(() => console.log(`${person.name} inserted successfully`))
                .catch((err) => `Could not insert ${person.id}`);
        });
    });
})



app.get(
    '/:id',
    searchDatabase({param: 'id', hashRing: hr}),
    async (req: IExtendedRequest, res: express.Response) => {
        let idUsuario = req.params.id;
        let response = await req.database.query(`SELECT * FROM person WHERE id = ${idUsuario}`);

        if(response.rowCount > 0) {
            res.status(200).send({
                'person': response.rows[0],
                'db': req.databasePort
            });
        } else {
            res.status(400).send({
                'error': 'Person not found'
            });
        }
    }
);
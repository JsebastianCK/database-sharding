# Database Sharding
This is a proof of concept implementation for sharding a **PostgreSQL** database, specifically applying a **key based** sharding architecture.

### Key Based Sharding Architecture <sup><sub>[source](https://www.digitalocean.com/community/tutorials/understanding-database-sharding#key-based-sharding)</sub></sup>
Key based sharding, also known as hash based sharding, involves using a value taken from newly written data — such as a customer’s ID number,
a client application’s IP address, a ZIP code, etc. — and plugging it into a hash function to determine which shard the data should go to.
A hash function is a function that takes as input a piece of data (for example, a customer email) and outputs a discrete value, known as a hash value.
In the case of sharding, the hash value is a shard ID used to determine which shard the incoming data will be stored on.

### Installation
You will need:
* NPM, Node
* Docker, Docker-compose

Initialize the database instances
```bash
docker-compose up -d --scale db=3
```

Install dependencies
```bash
npm install
```

Run code
```bash
npm start
```

You can see the API specification by running
```bash
raml2html -i api.raml -o api.html
```
<sup>You will need to have [raml2html](https://github.com/raml2html/raml2html) installed</sup>

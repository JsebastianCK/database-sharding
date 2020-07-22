import HashRing = require("hashring");

export interface iDbSearcher {
    /**
     * Parameter being used as reference
     * to search the database port
     */
    param: string,

    /**
     * Consistent Hash object where all
     * the ports of the databases are stored
     */
    hashRing: HashRing
}
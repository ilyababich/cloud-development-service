import { Client } from "pg";

import PostgresProductService from './postgressProductService';

const databaseClient = new Client();
databaseClient.connect();

const productService = new PostgresProductService(databaseClient);

export default productService;
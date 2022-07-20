import { Client } from 'pg';

type TProduct = {
    title: string;
    description: string;
    price: number;
}

class PostgressProductService {
    private productsTable = 'products';
    private stocksTable = 'stocks';

    constructor(private databaseClient: Client) {}

    public async getProductList () {
        const query = {
            text: `select p.id, p.title, p.description, p.price, s.count from ${this.productsTable} p, ${this.stocksTable} s where p.id = s.product_id;`
        }

        const result = await this.databaseClient.query(query);

        return result.rows ? result.rows : null;
    }

    public async getProductById (id: string) {
        const query = {
            text: `select p.id, p.title, p.description, p.price, s.count from ${this.productsTable} p, ${this.stocksTable} s where p.id = s.product_id and p.id = $1;`,
            values: [id],
        }

        const result = await this.databaseClient.query(query);
        return result.rows[0] ? result.rows[0] : null;

    }

    public async createProduct ({ title, description, price }: TProduct) {
        const createProductQuery = {
            text: `insert into ${this.productsTable} (title, description, price) values ($1,$2,$3);`,
            values: [title, description, price]
        }

        const result = await this.databaseClient.query(createProductQuery);

        
        return result.rows[0] ? result.rows[0] : null;
    }
}

export default PostgressProductService;
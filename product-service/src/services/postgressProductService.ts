import { Client, Pool } from 'pg';

export type TProduct = {
    title: string;
    description: string;
    price: number;
    count: number;
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

    public async createProduct ({ title, description, price, count }: TProduct) {

        const pool = new Pool();

        try {
            await pool.query('BEGIN');

            const createProductQuery = {
                text: `insert into ${this.productsTable} (title, description, price) values ($1,$2,$3) returning id;`,
                values: [title, description, price]
            };

            const productsResult = await pool.query(createProductQuery);

            console.log('Product added to products table');

            const [entry] = productsResult.rows;

            const createStockQuery = {
                text: `insert into ${this.stocksTable} (product_id, count) values ($1,$2)`,
                values: [entry.id, count]
            };

            await pool.query(createStockQuery);

            console.log('Count added to stock table');

            await pool.query('COMMIT');

            const result = this.getProductById(entry.id);

            await pool.query('COMMIT');

            return result;
        } catch(error) {
            console.log('Database error:', error);
            await pool.query('ROLLBACK');
            throw error;
        } finally {
            pool.end();
        }
        


    }
}

export default PostgressProductService;
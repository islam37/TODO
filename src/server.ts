import express, { Request, Response } from 'express';
import{Pool} from "pg"

const app = express();
const PORT = 3000;

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}));// for form data

//bd connection 
const pool=new Pool({
  connectionString:`postgresql://neondb_owner:npg_p46bMGdmHZRu@ep-polished-smoke-ap6rvrrd-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
})

const initDB=async()=>{
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      age INT,
      phone VARCHAR(20),
      adress Text,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tosdos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
       description TEXT,
       Completed BOOLEAN DEFAULT FALSE,
       due_date DATE,
       created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
       
      )

        
    `)
};

initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express! yeah');
});

app.post('/',(req:Request,res:Response)=>{
   console.log(req.body);
    res.status(201).json({
        success: true,
        message: "api is working"
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

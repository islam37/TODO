import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;
app.use(express.json())

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

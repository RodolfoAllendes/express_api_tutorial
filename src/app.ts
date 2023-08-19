import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json({limit: '10mb'})); // limit for the request body
app.use(cors());

// default route
app.get('/', (req: Request, res: Response) => res.send('API is alive') );

app.listen(3000, () => {
	console.log(`app is listening on port 3000`);
});

process.on('uncaughtException', err => console.log(`Undhandled error ${err}`));
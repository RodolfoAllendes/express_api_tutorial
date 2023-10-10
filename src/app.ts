import express, { Request, Response } from 'express';
import cors from 'cors';

import { utils } from './utils';
import users from './routes/users';

const app = express();
app.use(express.json({limit: '10mb'})); // limit for the request body
app.use(cors());

// default route
app.get('/', (req: Request, res: Response) => res.send('API is alive') );

app.get('/ls', (_: Request, res: Response) => {
	utils.ls()
	.then(msg => {
		res.status(200).json(msg);
	})
	.catch(error => {
		res.status(409).json({error: error});
	});
});

app.get('/greet/', (req: Request, res: Response) => {
	let name = req.params.name;
	res.status(200).json(`Well hello there.`);
});

app.get('/greet/:name/', (req: Request, res: Response) => {
	let name = req.params.name;
	res.status(200).json(`Greetings ${name}`);
});

app.use('/users', users);

app.listen(3000, () => {
	console.log(`app is listening on port 3000`);
});

process.on('uncaughtException', err => console.log(`Undhandled error ${err}`));
import express, { Request, Response } from 'express';
import { utils } from "../utils"; 

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
	utils.users()
	.then(msg => {
		console.log(msg);
		res.status(200).json(msg);
	})
	.catch(error => {
		console.log(error);
		res.status(300).json({error: error.msg});
	});
});

router.post('/new', (req: Request, res: Response) => {
	utils.addUser(req.body.id, req.body.name)
	.then(msg => {
		console.log(msg);
		res.status(200).json(msg);
	})
	.catch(error => {
		console.log(error);
		res.status(300).json({error: error.msg});
	});
});

export default router;
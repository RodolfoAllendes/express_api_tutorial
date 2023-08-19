# Creating an API with Express.js

> **Warning**
>  
> Express.js is a web application framework used to build server applications for Node.js. As such, and since there are various versions (sometimes incompatible) of Node.js around, we highly encourage for you to install Node Version Manager (nvm) before proceeding with this tutorial.
>
> Instructions to install nvm can be found on their GitHub repository: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm). Notice that, since we are using nvm , there is a `.nvmrc` file at the root of this repository, which defines the  version of Node that we will be using for this project.
>
> You might need to run `nvm install lts/gallium`.

## Express.js installation

```console
foo@bar:~$ nvm exec npm install express
Found '~/express_api_tutorial/.nvmrc' with version <lts/gallium>
Running node v16.20.2 (npm v8.19.4)

added 58 packages, and audited 59 packages in 3s

found 0 vulnerabilities
```

> **Warning**
>
> After installing Express.js, we will also include a `.gitignore` file in our project, to avoid loading to GitHub the whole `node_modules` folder.

Additional to Express, we will also install `cors` and `nodemon`.

```console
foo@bar:~$ nvm exec npm install nodemon --save-dev
added 33 packages, and audited 104 packages in 9s

foo@bar:~$ nvm exec npm install cors
added 2 packages, and audited 106 packages in 669ms

foo@bar:~$ nvm exec npm install @types/cors --save-dev
added 1 package, and audited 107 packages in 2s
```

## TypeScript installation

We will use TypeScript (rather than plain Javascript) to code the Express server, so for that, we need to install the `typescript` package and the TypeScript type definitions used with Node and Express.

```console
foo@bar:~$ nvm exec npm install typescript @types/express @types/node --save-dev
Found '~/express_api_tutorial/.nvmrc' with version <lts/gallium>
Running node v16.20.2 (npm v8.19.4)

added 12 packages, and audited 71 packages in 5s

found 0 vulnerabilities
```

The basic configuration of TypeScript is made through the definition of a `tsconfig.json` file.

Also, in order to configure the commands we will use for the compilation and deployment of the application, we add some additional configuration to our `package.json` file.

## Basic Server Definition

Finally, we define our basic application by including file `src/app.ts` as follows:

```javascript
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
```

In order to launch our server on development mode, we execute the following commmand:

```console
foo@bar:~$ nvm exec npm run dev
Found '/express_api_tutorial/.nvmrc' with version <lts/gallium>
Running node v16.20.2 (npm v8.19.4)

> server@1.0.0 dev
> nodemon -L -e ts --exec "npm run build && npm start"

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts
[nodemon] starting `npm run build && npm start`

> server@1.0.0 build
> tsc

> server@1.0.0 start
> node ./dist/app.js

app is listening on port 3000
```
Note the message at the end is the same as the one defined in method `app.listen` of our `app.ts` definition. Also, if you open your web browser to [localhost:3000](http://localhost:3000) you should see a simple site with the message `API is alive` on it.

### Link to local applications

Through a specific route in the server, we will provide functionality to run a simple local command i.e. `ls -lh`.

We add a new file `src\utils.ts` to our project, where we implement a function that calls the `ls -lh` locally to the server machine. The function implemented is as follows:

```javascript
export function ls(): Promise<any>{
	return new Promise(async(resolve, reject) => {
		let msg = '';
		const process = spawn('ls',
			['-lh'],
			{
				timeout: 1000
			});
		process.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
			msg += `${data}`;
		});
		process.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
			reject(data);
		});
		process.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
			resolve(msg);
		});
	});
}
```

Notice that, given the asynchronous nature of the `spawn` method, we define the return value of the function as a Promise that resolves once the command is finished. The promise is rejected when an error occurs.

Then, we modify the `app.ts` file in order to link a new route [localhost:3000/ls/](http://localhost:3000/ls) to the `ls()` function implemented in `utils.ts`. Once the function resolves, then the server will reply with the corresponding message to the client.

```javascript
import { utils } from './utils'

app.get('/ls', (_: Request, res: Response) => {
	utils.ls()
	.then(msg => {
		res.status(200).json(msg);
	})
	.catch(error => {
		res.status(409).json({error: error});
	});
});
```

On selecting that route, the browser should display the contents of the folder where the Express API is being implemented. If unable to use a browser, you can also try the route is working by using curl as follows:

```console
foo@bar:~$ curl -X GET http://localhost:3000/ls/
"total 104K\ndrwxrwxr-x  2 rallendes rallendes 4.0K  8月 20 01:16 dist\ndrwxrwxr-x  2 rallendes rallendes 4.0K  8月 19 23:00 docs\ndrwxrwxr-x 95 rallendes rallendes 4.0K  8月 19 23:39 node_modules\n-rw-rw-r--  1 rallendes rallendes  641  8月 19 23:47 package.json\n-rw-rw-r--  1 rallendes rallendes  74K  8月 19 23:39 package-lock.json\n-rw-rw-r--  1 rallendes rallendes   22  8月 19 22:43 README.md\ndrwxrwxr-x  2 rallendes rallendes 4.0K  8月 20 01:16 src\n-rw-rw-r--  1 rallendes rallendes  973  8月 19 23:33 tsconfig.json\n"
```
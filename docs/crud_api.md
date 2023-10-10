# HTTP API

In the previous section we introduced the basics of implementing a server to provide an API for our locally developed tools. Here we will extend the definition of the server, in order to make it able to handle more complex requests.

There are several [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods); however, here we will only focus in those that provide CRUD functionality, i.e. (create, read, update and delete).

## HTTP GET

Corresponding to a *read* in the CRUD model, as the name suggest, this request will allow us to `get` information from our web server. 

As seen previously, http `GET` requests can be implemented by assigning a route to the express `get` method of our defined application.  

```javascript
app.get('/greet/', (_: Request, res: Response) => {
	res.status(200).json(`Well hello there.`);
});
```
We can also include parameters to the `GET` requests by adding them to the routes definition in the following way. 
```javascript
app.get('/greet/:name/', (req: Request, res: Response) => {
	let name = req.params.name;
	res.status(200).json(`Greetings ${name}`);
});
```
In both cases, the response from the method is done through a JSON object that is to be later used by the client application.

### GET file content

Let us do something a little bit more complicated. Assume that we have a list of users stored in a file on our server, like the one under `/data/users.json`.

Then, we will define a series of routes to access this list of users. We stores these routes in a different file, under `/src/routes/users.ts`, and we link these routes to our application by adding the following code to our `app.ts` definition:

```javascript
import users from './routes/users';
...
app.use('/users', users);
``` 
Like before, `users.ts` includes the definition of a route where our server will listen to `GET` requests: `localhost:3000/users/`, and link it to a method defined in `utils.ts`:

```javascript
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
```
whilst the function in utils reads and returns the contents of the users file, as follows:

```javascript
export function users(): Promise<any>{
	const result: Promise<any> = new Promise(async(resolve, reject) => {
		try{
			const msg = await fs.readFile('./data/users.json', 'utf-8');
			resolve(JSON.parse(msg));
		} catch (e: any) {
			const msg = 'Users not found;';
			reject(msg);
		}
	});
	return result;
}
```

## HTTP POST

The HTTP `POST` method sends data to the server. A detailed definition of the POST method can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).

For example, it is possible to use a `POST` route to add new users to the file we previously showed. We start by adding a method to handle the new route to the `routes/users.ts` file:
```javascript
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
```
Notice that wee make use of the `body` of the request object. The two properties retrieved from the request (the id and name of the new user), are in turn used as parameters for the function that actually performs the addition in `utils.ts`.

```javascript
export function addUser(id: number, name: string): Promise<any>{
	const result = new Promise(async(resolve, reject) =>{
		try{
			let text = await fs.readFile('./data/users.json', 'utf-8');
			let json = JSON.parse(text);
			console.log('json1', json);
			json.users.push({id, name});
			console.log('json2', json);
			await fs.writeFile('./data/users.json', JSON.stringify(json));
			resolve('New user added');
		} catch(e: any){
			const msg =('Failed to add user');
			reject(msg);
		}
	});
	return result;
}
```
Finally, we can a curl command to test our implementation works. For example, if we wanted to add a user with id: 3, and name Taro, we can do so by writing the following command:

```console
curl -X POST http://localhost:3000/users/new \
	-H "Content-Type: application/json" \
	-d '{"id": 3, "name": "Taro"}' 
```

If the addition of the new user is performed correctly, you should also be able to verify it by calling the `localhost:3000/users/` route on your browser.

## HTTP PUT

Coming soon

## HTTP DELETE

Coming soon
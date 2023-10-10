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



## HTTP PUT

Coming soon

## HTTP DELETE

Coming soon
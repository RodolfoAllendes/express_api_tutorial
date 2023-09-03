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

## HTTP POST

Coming soon

## HTTP PUT

Coming soon

## HTTP DELETE

Coming soon
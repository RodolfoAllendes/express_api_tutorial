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
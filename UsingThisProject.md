#Node Web Service Application

Welcome to your Node Web Service Application. This brief introduction will help 
you make the best use of this product for development with Node.js.

This project is a [LoopBack](http://loopback.io/) based application, which 
exposes web services allowing manipulation of two sample resources.

To learn more about the project created, jump to the 
*Getting to know your Project* section, else read on to get started with
development immediately.

##Working with Node.js

**Deploying the Application**

The simplest way to start your application would be to open a new console in the
Terminal+ view (ensure your project is selected) and then execute 
>`node .`

After the application is correctly served, it can be explored using the in-built
[LoopBack API Explorer](http://localhost:3000/explorer/).

**Making Changes to the Application**

The [LoopBack Core Concepts](http://loopback.io/doc/en/lb3/LoopBack-core-concepts.html)
document is a good place to start learning about LoopBack. You should also check
the [Getting Started](http://loopback.io/doc/en/lb3/Getting-started-with-LoopBack.html)
documentation.

Since this application was generated using LoopBack, ensure you have the CLI 
globally installed by typing 
>`npm install -g loopback-cli`

You can now add to the model using the `lb model` command, for instance. See
[this document](http://loopback.io/doc/en/lb3/Command-line-tools.html) for more 
on what you can accomplish with the CLI.

###Web Development Features

Whether you develop your application using TypeScript or JavaScript, we have 
features that will ease everyday development. 

	- Exceptional support for the latest JS & TS versions
	- Advanced content assist and fast validation
	- Superior syntax highlighting
	- Powerful debugger for JavaScript, TypeScript and Node.js
	- Refactoring, formatting, call/type hierarchies, etc.
	
For more details, please see 
[this](https://www.genuitec.com/products/webclipse/) link.


##Getting to Know Your project

###Key Project Elements

**tsconfig.json**
This file contains your project's TypeScript settings, controlling source 
locations, JavaScript targets (like ES5 or ES6), compilation, how types are 
resolved, and several other settings.

**package.json**
This is another TypeScript specific file, which primarily contains your 
project's dependencies, listed as Node.js modules and their corresponding 
versions. 

**node_modules folder**
This folder contains all the Node packages your project is dependent on, these 
are defined in package.json and downloaded by the Node Package Manager (NPM).

`server/model-config.json` defines model properties, and specifies where
models can be found in this project.

`common/models/note.json` a sample _Note_ model; the _User_ model is a
[built-in](http://loopback.io/doc/en/lb3/Using-built-in-models.html) model and 
is therefore not externally defined in your project.
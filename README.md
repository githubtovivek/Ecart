Steps to launch Ecart App
This application is divided in to below parts.
1.	Server (used node, express)
2.	Client (used OO/Advanced Javascript, Handlebar, UnderScore, Jquery, Bootstrap, CSS, Html5..)
To configure the node JS server, below are the steps.

1.	Install node js
2.	Install express-generator by using command: npm install -g express-generator
3.	Create an express project : C:\node>express EcartServer, EcartServer is my project name
4.	C:\xampp\EcartServer>npm install to install dependencies
Configure the app.js file according to the requirement, in my case I have require my data provider app and configure one route url to expose the route for the client.

To configure the client application below are the steps.
1.	Create client project.
2.	Create one framework to load all the applications, in my case now I have only two applications to load.
3.	EcartDataPresenter : used to render the data
4.	EcartDataProvider. Used to get the data from the server based on the query provided by the app EcartDataPresenter.
In this client application there are some framework files
Framework.js : to start the framework structure.
ApplicationManager : load all the applications
ResourceLoader: load all the resources i.e js files, css files.
templateManager: to load and create the template object because I have used Handlebar templating to handle rendering of data.
To run the application on local I have used Apache server.


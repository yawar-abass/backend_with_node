## Learning Backend in Node.js from Udemy

        This repository contains the code and resources for the Backend course on Udemy.



        ## EJS (Embedded JavaScript)

        EJS is a popular templating engine for Node.js that allows you to generate dynamic HTML pages by embedding JavaScript code within your HTML templates. It provides a simple and intuitive syntax for injecting data into your views.

        To use EJS in your Node.js project, follow these steps:

        1. Install the EJS package by running the following command:

            ```bash
            npm install ejs
            ```

        2. Set up EJS as the view engine in your Express.js application. In your main server file (e.g., `app.js` or `index.js`), add the following code:

            ```javascript
            const express = require('express');
            const app = express();

            // Set EJS as the view engine
            app.set('view engine', 'ejs');
            ```



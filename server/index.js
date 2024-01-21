const express = require('express');
const cors = require('cors');
const UserRouter = require("./router/routes.js");
const bodyParser = require("body-parser");
//Database Connection
const port = process.env.PORT ?? 3000;
import("./mongoose/connect_Db/connection.js");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(UserRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// Implement following functionaility using NodeJS/Java as middleware (use any front-end and database of your choice)

// 1. User should be able to register with username and password
// 2. User should be able to login
// 3. A logged in user should be able to upload a file. For every uploaded file, there should be a unique 6 digit code generated.
// 4. An uploaded file should be saved on the file system for future reterival.
// 5. A logged in user should be able to view list of uploaded files for his profile.
// 6. A logged in user should be able to premanantly remove files from his profile.
// 7. The uploaded file should be available for downloading using a URL, and the user should be asked to enter the correct 6 digit code before the file is available for download.

// Deliverable - NodeJS project. Instruction steps to run the project. Share the code via cloud storage or github etc...
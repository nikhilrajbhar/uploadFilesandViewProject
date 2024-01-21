
const express = require('express');
const jwt = require('jsonwebtoken');
const TestUser = require("../mongoose/models/testUser");
const UserRouter = new express.Router();
var fs = require('fs');
const multer = require('multer');
const upload = multer({});
const secretKey = 'nikproject123';
const sessionExpiresInSeconds = '10 years';

// Login 
UserRouter.post('/login', async (req, res) => {
    try {
        let userfind = await TestUser.findOne({ 'name': req.body.name });
        if (userfind) {
            if (userfind?.password === req.body.password) {
                const token = jwt.sign({ id: userfind._id }, secretKey, { expiresIn: sessionExpiresInSeconds });
                res.status(200).json({ success: true, token: token, user: userfind, message: 'Login successful.' });
            } else {
                res.status(200).json({ error: "wrong credentials" });
            }
            console.log(userfind?.password);
        }
        else {
            res.status(200).json({ error: "Login Failed" });
        }
    } catch (error) {
        res.status(401).json({ error });
    }
})

// Register
UserRouter.post('/register', async (req, res) => {
    try {
        const usersaved = await new TestUser(req.body).save()
        res.status(201).json({ usersaved });
    } catch (error) {
        res.status(401).json({ error });
    }
})

// View all files 
UserRouter.get('/viewFiles', async (req, res) => {
    try {
        const folderName = req.query.username;
        let filePathdir = `./${folderName}/`
        fs.readdir(filePathdir, (error, files) => {
            if (error) {
                res.status(201).json({ error });
                return;
            }
            console.log('files', files);
            res.status(200).json({ success: true, files });
        });
    } catch (error) {
        res.status(401).json({ error });
    }
})

// View Single file
UserRouter.get('/viewFile', async (req, res) => {
    console.log("req.query", req.query);
    try {
        const code = req.query?.code;
        const userId = req.query?.userId;
        const userfile = await TestUser.findOne({ _id: userId });
        const codematch = userfile?.files.find((x) => x.code == code);
        if (!codematch) {
            res.status(404).json({ sucess: false, message: "You entered wrong code" });
            return;
        }
        let filePathdir = `./${userfile?.name}/${codematch?.filename}`;
        fs.readFile(filePathdir, (error, files) => {
            if (error) {
                res.status(201).json({ error });
                return;
            }
            console.log('files', files);
            res.download(filePathdir);
        });
    } catch (error) {
        res.status(400).json({ error });
    }
})

UserRouter.post('/upload', upload.any(), async (req, res) => {
    try {
        // console.log(req.files);
        console.log(req.query.userId);
        console.log(req.query.username);
        const folderName = req.query.username;
        const userId = req.query.userId;
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const options = { new: true }
        await TestUser.findOneAndUpdate(
            { _id: userId },
            { $push: { files: { code, filename: req.files[0]?.originalname } } },
            options
        )
        let filePath = `./${folderName}/${req.files[0]?.originalname}`
        fs.writeFile(filePath, req.files[0]?.buffer, function (err) {
            if (err) throw err;
            res.send({ success: true, message: "File uploaded and moved!", code })
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error });
    }
})

UserRouter.delete('/delete', async (req, res) => {
    try {
        const file = req.query?.file;
        console.log('file=====', file);
        const userId = req.query?.userId;
        const folderName = req.query.username;
        TestUser.updateOne({ _id: userId }, { "$pull": { "files": { "filename": file } } }, { safe: true, multi: true }, function (err, obj) {
            //do something smart
            if (err) {
                console.log(err);
                return;
            } else {
                let filePathdir = `./${folderName}/${file}`
                fs.unlink(filePathdir, (error, files) => {
                    if (error) {
                        res.json({ error });
                        return;
                    }
                    res.status(200).json({ success: true, files });
                });
            }
        });


    } catch (error) {
        res.status(401).json({ error });
    }
})

// exporting the router
module.exports = UserRouter;
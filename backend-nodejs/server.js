const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();

import { UploadedFile } from 'express-fileupload';

const PORT = 5000;

//app.use(express.static('public'));
//app.use('/images', express.static('images'));

app.use(fileUpload());

app.post('/upload', (req,res) =>{
    if(req.files==null){
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file ;

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})
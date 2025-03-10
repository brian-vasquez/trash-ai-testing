const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();
const PORT = 5000;

app.use(fileUpload());

app.post('/images', (req,res) =>{
    if (req.files == null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/images/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({fileName: file.name, filePath: `/images/${file.name}`});
    })
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})
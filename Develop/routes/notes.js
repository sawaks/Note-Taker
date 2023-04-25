const notes = require('express').Router();
const { readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNotes = {
            title,
            text,
            // note_id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNotes);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 2),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });


        const response = {
            status: 'success',
            body: newNotes,
        };

        console.log(response);

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

module.exports = notes;
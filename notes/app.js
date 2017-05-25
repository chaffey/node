const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note with a specific title', {
        title: titleOptions
    })
    .command('read', 'Read a note with a specific title', {
        title: titleOptions
    })
    .command('list', 'List all the notes')
    .help()
    .argv;

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log(`Note title '${argv.title}' already exists.`);
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`There ${allNotes.length === 1 ? 'is' : 'are'} ${allNotes.length} note${allNotes.length === 1 ? '' : 's'}`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'remove') {
    var removed = notes.deleteNote(argv.title);
    var message = removed ? `Removed note with title '${argv.title}'` : `Unable to find note with title '${argv.title}'`;
    console.log(message);
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note');
        notes.logNote(note);
    } else {
        console.log(`Note with title '${argv.title}' does not exists.`);
    }
} else {
    console.log('Command not recognized');
}

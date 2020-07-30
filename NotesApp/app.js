const validator = require('validator');
const { getNotes, addNote, removeNote, listNotes,readNote } = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');
const { string } = require('yargs');

/* 
    const msg = getNotes();
    console.log(msg);

    console.log(validator.isEmail('asdlfhalsdf@asdf.com'));
    console.log(chalk.inverse.bold.green('Success!'));

    const command = process.argv[2]

    if(command ==='add'){
        console.log(chalk.green('Success'),'Adding Note')
    } else if(command === 'remove'){
        console.log(chalk.green('Success'),'Removing Note')
    } else {
        console.log(chalk.red('Error'),'Please enter a command')
    } 
*/

yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string',
		},
	},
	handler: argv => addNote(argv.title, argv.body),
});

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
	},
	handler: argv => removeNote(argv.title),
});

yargs.command({
	command: 'list',
	describe: 'List the notes',
	handler: () => listNotes(),
});
yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Read a note',
			demandOption: true,
			type: 'string',
		},
	},
	handler: (argv) => readNote(argv.title),
});

yargs.parse();

// console.log(yargs.argv);

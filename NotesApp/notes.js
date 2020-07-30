const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find(note => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});

		saveNotes(notes);
		console.log(chalk.green('New note added!'));
	} else {
		console.log(chalk.red('Note title taken!'));
	}
};

const removeNote = title => {
	const notes = loadNotes();
	const filteredArr = notes.filter(note => note.title !== title);

	if (notes.length > filteredArr.length) {
		saveNotes(filteredArr);
		console.log(chalk.bgGreen('Note removed!'));
	} else if (notes.length === filteredArr.length) {
		console.log(chalk.bgRed('No note found!'));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log('Your notes:');
	notes.forEach(note => console.log(`${note.title}`));
};

const readNote = title => {
    const notes = loadNotes()
    const foundNote = notes.find(note => note.title === title)

    if(foundNote){
        console.log(foundNote.body)
    } else {
        console.log(chalk.red('Note not found!'))
    }
    
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (error) {
		return [];
	}
};

const saveNotes = notes => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};
module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
    listNotes: listNotes,
    readNote, readNote
};

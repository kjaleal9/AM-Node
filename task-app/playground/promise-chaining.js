require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

// User.findByIdAndUpdate('5f287e23a09f09069c255871', { age: 1 })
//     .then(user => {
//         console.log(user);
//         return User.countDocuments({ age: 1 });
//     })
//     .then(result => console.log(result))
//     .catch(e => console.log(e));

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('5f287e23a09f09069c255871', 2)
    .then(count => console.log(count))
    .catch(e => {
        console.log(e);
    });

const deleteTaskAndCount = async id => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
};

deleteTaskAndCount('5f28957bed293c1e58e3b280')
    .then(count => console.log(count))
    .catch(e => {
        console.log(e);
    });

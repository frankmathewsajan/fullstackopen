const mongoose = require('mongoose');

const args = process.argv;

if (args.length < 3) {
    console.log('Usage: node script.js <password> [name] [number]');
    process.exit(1);
}

const password = args[2];
const name = args[3];
const num = args[4];

const url = `mongodb+srv://frankmathewsajan:${password}@fullstackcluster0.d8zdq.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=FullStackCluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Phone = mongoose.model('Phone', phoneSchema);

if (!name || !num) {
    Phone.find({})
        .then((result) => {
            console.log('Phonebook:');
            result.forEach((contact) => {
                console.log(`${contact.name} ${contact.number}`);
            });
            mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error fetching contacts:', err);
            mongoose.connection.close();
        });
} else {
    const phone = new Phone({ name, number: num });

    phone
        .save()
        .then(() => {
            console.log(`Added ${name}'s number ${num} to phonebook`);
            mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error saving contact:', err);
            mongoose.connection.close();
        });
}

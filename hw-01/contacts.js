const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join('./db', 'contacts.json');

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter(item => item.id === contactId);
    console.table(filteredData);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const allContacts = JSON.parse(data);
    const filteredContacts = JSON.stringify(allContacts.filter(item => item.id !== contactId));
    fs.writeFile(contactsPath, filteredContacts, err => {
      if (err) throw err;
      console.log('The file has been saved!');
      console.table(JSON.parse(filteredContacts));
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const oldContactsArr = JSON.parse(data);
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContactsArr = JSON.stringify([...oldContactsArr, newContact]);
    fs.writeFile(contactsPath, newContactsArr, err => {
      if (err) throw err;
      console.log('The file has been saved!');
      console.table(JSON.parse(newContactsArr));
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

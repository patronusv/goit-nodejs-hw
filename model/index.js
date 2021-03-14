const fs = require('fs/promises');
const contacts = require('./contacts.json');
const shortid = require('shortid');

const listContacts = async () => {
  await fs.readFile(contacts, (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
};

const getContactById = async contactId => {
  const contactsList = await fs.readFile(contacts, (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
  const filteredData = contactsList.filter(item => item.id === contactId);
  return filteredData;
};

const removeContact = async contactId => {
  const contactList = await fs.readFile(contacts, (err, data) => {
    if (err) throw err;
    const allContacts = JSON.parse(data);
    return JSON.stringify(allContacts.filter(item => item.id !== contactId));
  });
  await fs.writeFile(contacts, contactList, err => {
    if (err) throw err;
  });
};

const addContact = async body => {
  const contactList = await fs.readFile(contacts, (err, data) => {
    if (err) throw err;
    const oldContactsArr = JSON.parse(data);
    const newContact = { id: shortid.generate(), ...body };
    return JSON.stringify([...oldContactsArr, newContact]);
  });
  await fs.writeFile(contacts, contactList, err => {
    if (err) throw err;
  });
};

const updateContact = async (contactId, body) => {
  const contactList = await fs.readFile(contacts, (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
  const contact = contactsList.find(item => item.id === contactId);
  const updatedContact = { ...contact, ...body };
  const updatedContactList = contactList.map(item => (item.id === contactId ? updatedContact : item));

  await fs.writeFile(contacts, updatedContactList, err => {
    if (err) throw err;
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

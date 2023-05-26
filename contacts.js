const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");


const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const updateListContacts = async (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [removedContact] = contacts.splice(index, 1);
    await updateListContacts(contacts);
    return removedContact;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (contactData) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      ...contactData,
    };
    contacts.push(newContact);
    await updateListContacts(contacts);
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
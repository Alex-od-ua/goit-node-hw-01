const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json"); //абсолютный путь к файлу
// const contactsPath = path.resolve("db", "contacts.json");
// console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath); // в json можно передавать buffer
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts(); // получили список контактов

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }; // создали новый контакт

  contacts.push(newContact); // добавили новый контакт
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // перезаписали json
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};

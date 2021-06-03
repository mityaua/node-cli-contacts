const fs = require("fs").promises;
const path = require("path");

const { customAlphabet } = require("nanoid");
const newId = customAlphabet("1234567890", 10);

const contactsPath = path.join("./db/contacts.json");

// Получаем и выводим весь список контактов в виде таблицы
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    const list = JSON.parse(data);

    return console.table(list);
  } catch (error) {
    console.error(error.message);
  }
}

// Получаем контакт по id
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contact = contacts.filter((contact) => contact.id === Number(contactId));

    return console.table(contact);
  } catch (error) {
    console.error(error.message);
  }
}

// Удаляем контакт
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter((contact) => contact.id != contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    console.log("\x1b[32m Successfully deleted");
    console.table(filteredContacts);
  } catch (error) {
    console.error(error.message);
  }
}

// Добавялем контакт
async function addContact(name, email, phone) {
  const contact = {
    id: Number(newId()),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    contacts.push(contact); // Нужны доп проверки при добавлении?

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("\x1b[32m Successfully added");
    console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

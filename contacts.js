const fs = require("fs").promises;
const path = require("path");

const { customAlphabet } = require("nanoid");
const newId = customAlphabet("1234567890", 10);

// Полный путь к папке с текущим модулем / папка / файл
const contactsPath = path.join(__dirname, "db", "contacts.json");

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

    if (!contacts.includes(contactId)) {
      console.error("\x1B[31m This contact does not exist");
      return;
    }

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

    if (!contacts.includes(contactId)) {
      console.error("\x1B[31m This contact does not exist");
      return;
    }

    const filteredContacts = contacts.filter((contact) => contact.id != contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    console.table(filteredContacts);
    console.log("\x1b[32m Successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
}

// Добавялем контакт
async function addContact(name, email, phone) {
  const newContact = {
    id: Number(newId()),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);

    const contacts = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.table(contacts);
    console.log("\x1b[32m Successfully added");
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

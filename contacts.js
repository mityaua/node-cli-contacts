const fs = require("fs").promises;
const path = require("path");

const { customAlphabet } = require("nanoid");
const newId = customAlphabet("1234567890", 10);

const contactsPath = path.resolve("./db/contacts.json");

// Получаем и выводим весь список контактов в виде таблицы
function listContacts() {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");

      return console.table(JSON.parse(data));
    } catch (error) {
      console.error(error.message);
    }
  })();
}

// Получаем контакт по id
function getContactById(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);

      const contact = contacts.filter((contact) => contact.id === Number(contactId));

      return console.log(contact);
    } catch (error) {
      console.error(error.message);
    }
  })();
}

// Удаляем контакт
function removeContact(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);

      const filteredContacts = contacts.filter((contact) => contact.id != contactId);

      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    } catch (error) {
      console.error(error.message);
    }
  })();
}

// Добавялем контакт
function addContact(name, email, phone) {
  (async () => {
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
    } catch (error) {
      console.error(error.message);
    }
  })();
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

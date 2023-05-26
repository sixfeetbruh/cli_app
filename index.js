const contactsBase = require('./contacts.js');
const { Command } = require('commander');
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone}) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactsBase.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const targetContact = await contactsBase.getContactById(id);
        console.log(targetContact);
        break;

      case "add":
        const newContact = await contactsBase.addContact({
          name,
          email,
          phone,
        });
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contactsBase.removeContact(id);
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    } 
  } catch (err) {
      console.error(err);
    }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
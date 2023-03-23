const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      console.log(addContact);
      break;

    case "update":
      const updateContact = await contacts.updateById(id, { name, email, phone });
      console.log(updateContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("--name <type>")
  .option("--email <type>")
  .option("--phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);

///////////////////////////////////////////////////
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
//
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);
///////////////////////////////////////////////////
// const actionIndex = process.argv.indexOf("--action");

// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }
////////////////////////////////////////////////////
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "vza2RIzNGIwutCVCs4mC" });
// invokeAction({ action: "add", name: "Name", email: "email@gmail.com", phone: "000-000-000" });
// invokeAction({
//   action: "update",
//   id: "pHwzMKneOu5RfYuTkSa3v",
//   name: "newName",
//   email: "new_email@gmail.com",
//   phone: "111-222-333",
// });
// invokeAction({ action: "remove", id: "Sj-o9lNqBt7Icm3BoCfIL" });

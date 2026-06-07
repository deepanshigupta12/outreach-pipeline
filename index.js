require("dotenv").config();
const { findPeople } = require("./services/prospeo");
const { sendEmail } = require("./services/brevo");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askConfirmation() {
  return new Promise((resolve) => {
    rl.question("\nSend emails? (yes/no): ", (answer) => {
      resolve(answer.toLowerCase() === "yes");
    });
  });
}

async function main() {
  const domain = process.argv[2];

  if (!domain) {
    console.log(" Provide domain (example: amazon.com)");
    process.exit(1);
  }

  console.log(`\n Finding people for ${domain}...\n`);

  const people = await findPeople(domain);

  if (!people || people.length === 0) {
    console.log(" No people found.");
    process.exit(0);
  }

  people.forEach((person, index) => {
    console.log(`\n Person ${index + 1}`);
    console.log(`Name: ${person.first_name} ${person.last_name}`);
    console.log(`Email: ${person.email}`);
  });

  const confirm = await askConfirmation();

  if (!confirm) {
    console.log(" Cancelled.");
    rl.close();
    process.exit(0);
  }

  console.log("\n Sending emails...\n");

  for (const person of people) {
    const fullName = `${person.first_name} ${person.last_name}`;
    await sendEmail(person.email, fullName, domain);

    // small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n Done.");
  rl.close();
}

main();
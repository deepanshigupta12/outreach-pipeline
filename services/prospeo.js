async function findPeople(domain) {
  console.log("⚠️ Using mock data (API deprecated)");

  return [
    {
      first_name: "John",
      last_name: "Doe",
      email: "deepanshigupta877@gmail.com", // your email
      linkedin_url: "https://linkedin.com/in/johndoe"
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "your_name@gmail.com", //  different email (VERY IMPORTANT)
      linkedin_url: "https://linkedin.com/in/janesmith"
    }
  ];
}

module.exports = { findPeople };
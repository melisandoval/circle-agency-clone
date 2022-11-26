import { db, initBurgerMenu } from "./common.js";

// init burger mobile menu:
initBurgerMenu();

const submitButton = document.getElementById("submit-form");
const form = document.getElementById("contact-form");
const formResponse = document.querySelector(".form-response");

const sendContactToDB = (e) => {
  e.preventDefault();

  const contact = {
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  db.collection("contacts")
    .add(contact)
    .then(() => {
      formResponse.removeAttribute("hidden");
    })
    .then(form.reset())
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

submitButton.addEventListener("click", sendContactToDB);

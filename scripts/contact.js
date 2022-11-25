import { db } from "./common.js";

const submitButton = document.getElementById("submit-form");
const form = document.getElementById("contact-form");

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
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .then(form.reset())
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

submitButton.addEventListener("click", sendContactToDB);

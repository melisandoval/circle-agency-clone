const firebaseConfig = {
  apiKey: "AIzaSyDnkA1wS-t-BKYT4lbbBtSyijJbLno7-pg",
  authDomain: "circle-agency-clone.firebaseapp.com",
  projectId: "circle-agency-clone",
  storageBucket: "circle-agency-clone.appspot.com",
  messagingSenderId: "489067067254",
  appId: "1:489067067254:web:4ba93837c9fe5ff3c82c57",
};
// Firebase apiKey info: https://firebase.google.com/docs/projects/api-keys

// conexion with Firebase databa base:
export const db = firebase.initializeApp(firebaseConfig).firestore();

// handle suscribe button in CTA Section:
export function sendEmailtoDb(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // const formDiv = document.getElementById("form-container");
  // const sectionParagraph = document.getElementById("cta-p");
  const invalidEmailMessage = document.getElementById("invalid-email-message");
  const errorMessage = document.getElementById("error-message");
  const emailReceivedMessage = document.querySelector(".suscribe-response");
  const form = document.querySelector(".CTA-section form");

  if (emailRegex.test(email)) {
    db.collection("emails")
      .add({
        email: email,
      })
      .then(() => {
        emailReceivedMessage.removeAttribute("hidden");
        invalidEmailMessage.hidden = true;
        errorMessage.hidden = true;
        form.reset();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        errorMessage.removeAttribute("hidden");
      });
  } else invalidEmailMessage.removeAttribute("hidden");
}

// Function that returns Project card HTML template:
export const getProjectCardTemplate = (img, title, subtitle, id) => {
  return `
  <a href="project.html?id=${id}">
    <div class="project-card">
      <img
          src=${img}
          alt="Project image"
      />
      <div class="project-card-text-container">
          <h3>${title}</h3>
          <p class="grey-p">${subtitle}</p>
          <a href="project.html?id=${id}" class="blue-link">Learn more</a>
      </div>
    </div>
  </a>`;
};

// Init suscribe button of CTA section:
export const initSuscribeButton = () => {
  const suscribeBtn = document.getElementById("suscribe");
  suscribeBtn.addEventListener("click", sendEmailtoDb);
};

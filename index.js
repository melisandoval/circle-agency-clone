const firebaseConfig = {
  apiKey: "AIzaSyDnkA1wS-t-BKYT4lbbBtSyijJbLno7-pg",
  authDomain: "circle-agency-clone.firebaseapp.com",
  projectId: "circle-agency-clone",
  storageBucket: "circle-agency-clone.appspot.com",
  messagingSenderId: "489067067254",
  appId: "1:489067067254:web:4ba93837c9fe5ff3c82c57",
};

const db = firebase.initializeApp(firebaseConfig).firestore();

// function sendEmailtoDb that handles suscribe button in homepage:
function sendEmailtoDb(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const formDiv = document.getElementById("form-container");
  const sectionParagraph = document.getElementById("cta-p");
  const invalidEmailMessage = document.getElementById("invalid-email-message");
  const errorMessage = document.getElementById("error-message");

  if (emailRegex.test(email)) {
    db.collection("emails")
      .add({
        email: email,
      })
      .then(() => {
        sectionParagraph.innerHTML = "";
        formDiv.innerHTML =
          "<p class='suscribe-response'>Your email has been received 🎉<br> We will contact you very soon!</p>";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        errorMessage.removeAttribute("hidden");
      });
  } else invalidEmailMessage.removeAttribute("hidden");
}

window.addEventListener("load", () => {
  const suscribeBtn = document.getElementById("suscribe");
  suscribeBtn.addEventListener("click", sendEmailtoDb);
});

window.addEventListener("load", () => {
  const projectsContainer = document.querySelector(".projects-container");
  const loadingGif = document.getElementById("loading-gif");

  // Function that return Project card HTML template:
  const projectCardTemplate = (img, title, paragraph, id) => {
    return `<div class="project-card">
              <img
                src=${img}
                alt="Project image"
              />
              <div class="project-card-text-container">
                <h3>${title}</h3>
                <p class="grey-p">
                  ${paragraph}
                </p>
                <a href="#/${id}" class="blue-link">Learn more</a>
              </div>`;
  };

  try {
    db.collection("projects")
      .where("projectNumber", "<=", 3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const project = doc.data();
          loadingGif.remove();
          projectsContainer.innerHTML += projectCardTemplate(
            project.img,
            project.title,
            project.paragraph,
            project.projectNumber
          );
        });
      });
  } catch (error) {
    console.log(error);
  }
});

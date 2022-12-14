import {
  db,
  initSuscribeButton,
  getProjectCardTemplate,
  initBurgerMenu,
} from "./common.js";

// init burger mobile menu:
initBurgerMenu();

// get ID from the URL:
const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get("id");

// get HTML elements:
const projectSection = document.querySelector(".project-section");
const otherProjectsContainer = document.getElementById("other-projects");
const loadingGif = document.getElementById("loading-gif");

// get ref to the specific project of this page on Firebase:
const docRef = db.collection("projects").doc(urlId);

// generate HTML template Project post:
const getProjectHTMLTemplate = (title, subtitle, img, date, paragraphs) => {
  return `
        <h1>${title}</h1>
        <div class="project-subtitle-and-date-container">
          <p class="project-subtitle">${subtitle}</p>
          <p class="project-completed-on">Completed on <span class="project-date">${date}</span></p>
        </div>
        <div class="project-and-shadow-wrap">
          <img id="project-img" src=${img} alt="Project image">
          <img id="shadow-project-img" src=${img} alt="Project image">
        </div>
        <div>
          ${paragraphs.map((p) => `<p>${p}</p>`).join("")}
        </div>
    `;
};

// get data to generate Project HTML template:
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      const project = doc.data();
      projectSection.innerHTML = getProjectHTMLTemplate(
        project.title,
        project.subtitle,
        project.img,
        transformDate(project.date),
        project.paragraphs
      );
    } else {
      console.log("No documents with that id");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

// receives a timestamp and returns the string for the date in the project page:
function transformDate(timestamp) {
  const date = timestamp.toDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

// get data for the cards of "Other projects" section:
try {
  db.collection("projects")
    .where("id", "!=", urlId)
    .limit(3)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const project = doc.data();
        loadingGif.remove();
        otherProjectsContainer.innerHTML += getProjectCardTemplate(
          project.img,
          project.title,
          project.subtitle,
          doc.id
        );
      });
    });
} catch (error) {
  console.log(error);
}

// init suscribe button of CTA section:
initSuscribeButton();

import { db, initSuscribeButton, getProjectCardTemplate } from "./common.js";

// init suscribe button of CTA section:
initSuscribeButton();

const getProjectHTMLTemplate = (title, subtitle, img, date, paragraphs) => {
  return `
        <h1>${title}</h1>
        <div class="project-subtitle-and-date-container">
          <p class="project-subtitle">${subtitle}</p>
          <p class="project-completed-on">Completed on <span class="project-date">June 22, 2021</span></p>
        </div>
        <div class="project-and-shadow-wrap">
          <img id="project-img" src=${img} alt="Project image">
          <img id="shadow-project-img" src=${img} alt="Project image">
        </div>
        <div>
          <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt quix duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
          <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.Aliqua id fugiat nostrud irure ex duis ea quis id quis ad e dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.Aliqua id fugiat nostrud irure ex duis ea quis id quis ad e dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nis cillum minim tempor enim. </p>
        </div>
    `;
};

const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get("id");
const projectSection = document.querySelector(".project-section");

const docRef = db.collection("projects").doc(urlId);

docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      const project = doc.data();
      projectSection.innerHTML = getProjectHTMLTemplate(
        project.title,
        project.subtitle,
        project.img
      );
    } else {
      console.log("No documents with that id");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

// init Other projects section of Project page:
window.addEventListener("load", () => {
  const projectsContainer = document.getElementById("other-projects");
  const loadingGif = document.getElementById("loading-gif");

  try {
    db.collection("projects")
      .where("category", "==", "")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const project = await doc.data();
          loadingGif.remove();
          projectsContainer.innerHTML += getProjectCardTemplate(
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
});

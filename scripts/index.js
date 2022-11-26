import {
  db,
  initSuscribeButton,
  getProjectCardTemplate,
  initBurgerMenu,
} from "./common.js";

// init burger mobile menu:
initBurgerMenu();

//get DOM elements:
const projectsContainer = document.getElementById("recent-projects");
const loadingGif = document.getElementById("loading-gif");

// get data from Firebase and use getProjectCardTemplate() to generate HTML of the Projects cards:
try {
  db.collection("projects")
    .where("category", "==", "featured")
    .limit(3)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const project = doc.data();
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

// init suscribe button of CTA section:
initSuscribeButton();

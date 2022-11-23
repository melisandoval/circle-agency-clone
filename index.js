import { db, initSuscribeButton, getProjectCardTemplate } from "./common.js";

// init suscribe button of CTA section:
initSuscribeButton();

// init Recent Projects section of Homepage:
window.addEventListener("load", () => {
  const projectsContainer = document.getElementById("recent-projects");
  const loadingGif = document.getElementById("loading-gif");
  console.log(projectsContainer);
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
});

const firebaseConfig = {
  apiKey: "AIzaSyDnkA1wS-t-BKYT4lbbBtSyijJbLno7-pg",
  authDomain: "circle-agency-clone.firebaseapp.com",
  projectId: "circle-agency-clone",
  storageBucket: "circle-agency-clone.appspot.com",
  messagingSenderId: "489067067254",
  appId: "1:489067067254:web:4ba93837c9fe5ff3c82c57",
};

//Initialize firestore
const db = firebase.initializeApp(firebaseConfig).firestore();

function sendEmailtoDb(e) {
  const email = document.getElementById("email").value;
  e.preventDefault();

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (emailRegex.test(email)) {
    db.collection("emails")
      .add({
        email: email,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else console.log("Please write a valid email");
}
// Add a new email to Firestore with a generated id.

window.addEventListener("load", () => {
  const suscribeBtn = document.getElementById("suscribe");

  suscribeBtn.addEventListener("click", sendEmailtoDb);
});

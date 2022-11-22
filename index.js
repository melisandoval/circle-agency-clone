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
  console.log(email);
  e.preventDefault();

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
}
// Add a new email to Firestore with a generated id.

window.addEventListener("load", () => {
  const suscribeBtn = document.getElementById("suscribe");

  suscribeBtn.addEventListener("click", sendEmailtoDb);
});

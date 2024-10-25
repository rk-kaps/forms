// Import Firebase SDK for modular usage
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set, update, push ,get} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase configuration (Hardcoded, no Vite usage)
const firebaseConfig = { 
   apiKey: "AIzaSyAdYqEKabIlm02vRfVOuBJYJF0PKCpavkQ",
    authDomain: "sportsday-c7a16.firebaseapp.com",
    databaseURL: "https://sportsday-c7a16-default-rtdb.firebaseio.com",
    projectId: "sportsday-c7a16",
    storageBucket: "sportsday-c7a16.appspot.com",
    messagingSenderId: "894609801143",
    appId: "1:894609801143:web:d8cb620c60a278c0c07232"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form submission handling
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedClass = document.getElementById('class').value;
    const selectedEvent = document.getElementById('event').value;
    const studentName = document.getElementById('studentName').value;
    //const selectedHouse = document.getElementById('house').value;

    if (!studentName) {
        alert("Please enter the student's name.");
        return;
    }

    
     // Reference to the PARTICIPANTS path
     const participantsRef = ref(database, `Classes/${selectedClass}/EVENTS/${selectedEvent}/PARTICIPANTS`);

     // Get the current list of participants to determine the next index
     get(participantsRef).then((snapshot) => {
         let nextIndex = 0;
         if (snapshot.exists()) {
             nextIndex = snapshot.size; // Use the current size as the next index
         }
 
         // Add the new participant with the determined index
         set(ref(database, `Classes/${selectedClass}/EVENTS/${selectedEvent}/PARTICIPANTS/${nextIndex}`), studentName)
         .then(() => {
             alert("Data submitted successfully!");
             document.getElementById('eventForm').reset(); // Reset form after submission
         })
         .catch((error) => {
             console.error("Error submitting data:", error);
             alert("Error submitting data.");
         });

         //const participantRef = ref(database, `Classes/${selectedClass}/EVENTS/${selectedEvent}/PARTICIPANTS`);
        
         update(ref(database, 'ParticipantList'), {
            [studentName]: 0
        }).then(() => {
            alert("Data submitted successfully!");
            document.getElementById('eventForm').reset(); // Reset form after submission
        }).catch((error) => {
            console.error("Error submitting data:", error);
            alert("Error submitting data.");
        });

     }).catch((error) => {
         console.error("Error fetching data:", error);
     });

 });

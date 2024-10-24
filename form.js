// Import Firebase SDK for modular usage
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = { 
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


document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedClass = document.getElementById('class').value;
    const selectedEvent = document.getElementById('event').value;
    const studentName = document.getElementById('studentName').value;
    const selectedHouse = document.getElementById('house').value;

    
    if (!studentName) {
        alert("Please enter the student's name.");
        return;
    }

    
    const entryId = new Date().getTime();

    
    set(ref(database, `Submissions/${entryId}`), {
        class: selectedClass,
        event: selectedEvent,
        studentName: studentName,
        house: selectedHouse
    }).then(() => {
        alert("Data submitted successfully!");
        document.getElementById('eventForm').reset(); // Reset form after submission
    }).catch((error) => {
        console.error("Error submitting data:", error);
        alert("Error submitting data.");
    });
});

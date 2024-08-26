// Import and configure Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBNnVgeZ3ksI0b8RfpDiowtuBMIXquD8S0",
  authDomain: "mission2-62d9c.firebaseapp.com",
  projectId: "mission2-62d9c",
  storageBucket: "mission2-62d9c.appspot.com",
  messagingSenderId: "32310739750",
  appId: "1:32310739750:web:01d38bf4d82b889397b7e7",
  measurementId: "G-ZLNZS75XH8"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');

    db.collection('posts').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const textElement = document.createElement('p');
            textElement.textContent = data.text;
            postElement.appendChild(textElement);

            const imageElement = document.createElement('img');
            imageElement.src = data.imageUrl;
            imageElement.alt = 'Uploaded image';
            postElement.appendChild(imageElement);

            contentDiv.appendChild(postElement);
        });
    }).catch((error) => {
        console.error('Error fetching documents: ', error);
    });
});

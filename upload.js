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
const storage = firebase.storage();

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const textContent = document.getElementById('text-content').value;
    const imageFile = document.getElementById('image').files[0];
    const uploadMessage = document.getElementById('upload-message');

    if (textContent && imageFile) {
        const imageRef = storage.ref().child('images/' + imageFile.name);
        imageRef.put(imageFile).then(() => {
            imageRef.getDownloadURL().then((url) => {
                db.collection('posts').add({
                    text: textContent,
                    imageUrl: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    uploadMessage.textContent = 'Upload successful!';
                }).catch((error) => {
                    uploadMessage.textContent = 'Error uploading data: ' + error.message;
                });
            });
        }).catch((error) => {
            uploadMessage.textContent = 'Error uploading image: ' + error.message;
        });
    }
});

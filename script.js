// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// For the upload page
if (document.getElementById('uploadForm')) {
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const text = document.getElementById('textInput').value;
        database.ref('text').set({ text: text })
            .then(() => alert('Text uploaded successfully!'))
            .catch(error => alert('Error uploading text: ' + error));
    });
}

// For the receiving page
if (document.getElementById('textDisplay')) {
    window.addEventListener('load', function() {
        database.ref('text').once('value')
            .then(snapshot => {
                const data = snapshot.val();
                document.getElementById('textDisplay').innerText = data ? data.text : 'No text available.';
            })
            .catch(error => document.getElementById('textDisplay').innerText = 'Error loading text: ' + error);
    });
}

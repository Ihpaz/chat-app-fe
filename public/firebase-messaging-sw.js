importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAavofJwKQCY9zLk9yuEu5hAnpc3rPE6Oo",
    authDomain: "chat-app-cb803.firebaseapp.com",
    projectId: "chat-app-cb803",
    storageBucket: "chat-app-cb803.firebasestorage.app",
    messagingSenderId: "373289971452",
    appId: "1:373289971452:web:7493265ae65b3acaa2f179",
    measurementId: "G-LZ05SEH3HR"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);

   
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
          client.navigate(client.url); // Reload halaman
        });
      });
      
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png", // Change this to your app logo
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

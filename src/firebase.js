import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import mitt from "mitt";

const eventBus = mitt();
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAavofJwKQCY9zLk9yuEu5hAnpc3rPE6Oo",
    authDomain: "chat-app-cb803.firebaseapp.com",
    projectId: "chat-app-cb803",
    storageBucket: "chat-app-cb803.firebasestorage.app",
    messagingSenderId: "373289971452",
    appId: "1:373289971452:web:7493265ae65b3acaa2f179",
    measurementId: "G-LZ05SEH3HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register the service worker manually
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}

// Request Permission and Get Token
export const requestPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: "BISpJHt4ryLP14UopzrDug9yVB8rP-66qROSD_Zfs97t1XqI86UdRvDPaffwDOx4kImxA-VQZd1hol2BFlygxpI",
                serviceWorkerRegistration: await navigator.serviceWorker.ready, // Use registered SW
            });
            console.log("FCM Token:", token);
            return token;
        } else {
            console.log("Permission denied");
        }
    } catch (error) {
        console.error("Error getting FCM token", error);
    }
};

// Listen for messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Notification received:", payload);

            if (payload.notification.title) {
                eventBus.emit(payload.notification.title); // Emit event for chatroom
              }

            toast(payload.notification.body, {
                autoClose: 5000, // Closes after 5 seconds
                position: "top-right",
                theme: "light",
              });

            resolve(payload);
        });
});


export { eventBus };

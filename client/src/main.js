import "./assets/main.css";
import { registerSW } from 'virtual:pwa-register';
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

function promptForRefresh() {
  const userResponse = confirm(
    "A new version of the app is available. Would you like to refresh the page to update?"
  );
  if (userResponse) {
    window.location.reload();
  }
}

// Function to show an offline ready message
function notifyOfflineReady() {}

// Function to display offline message
function showOfflineMessage() {
  const offlineMessage = document.createElement("div");
  offlineMessage.id = "offline-message";
  offlineMessage.textContent = "Please connect to Wi-Fi";
  offlineMessage.style.position = "fixed";
  offlineMessage.style.bottom = "0";
  offlineMessage.style.width = "100%";
  offlineMessage.style.backgroundColor = "red";
  offlineMessage.style.color = "white";
  offlineMessage.style.textAlign = "center";
  offlineMessage.style.padding = "10px 0";
  offlineMessage.style.fontFamily="K2D"
  document.body.appendChild(offlineMessage);
}

// Function to remove offline message
function removeOfflineMessage() {
  const offlineMessage = document.getElementById("offline-message");
  if (offlineMessage) {
    document.body.removeChild(offlineMessage);
  }
}

// Register the service worker with custom prompts
registerSW({
  onNeedRefresh() {
    promptForRefresh();
  },
  onOfflineReady() {
    notifyOfflineReady();
  },
});

// Event listeners for online and offline events
window.addEventListener("offline", showOfflineMessage);
window.addEventListener("online", removeOfflineMessage);

// Check initial online status
if (!navigator.onLine) {
  showOfflineMessage();
}

app.use(createPinia());
app.use(router);

app.mount("#app");

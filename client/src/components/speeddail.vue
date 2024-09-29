<template>
    <div class="speed-dial-container">
      <button @click="toggleDialer" class="speed-dial-button">
        <span class="plus-icon" :class="{ open: isOpen }">+</span>
      </button>
  
      <transition-group name="slide" tag="ul" class="speed-dial-options">
        <router-link to="/" v-show="isOpen" :key="1" class="speed-dial-item">FeedBack</router-link>
        <router-link to="/" v-show="isOpen" :key="2" class="speed-dial-item">Add Subject</router-link>
        <router-link to="/" v-show="isOpen" :key="3" class="speed-dial-item">Dark Mode</router-link>
      </transition-group>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isOpen = ref(false);
  

  
  const toggleDialer = () => {
    isOpen.value = !isOpen.value;
  };
  

  </script>
  
  <style scoped>
.speed-dial-container {
  position: relative;
  display: inline-block;
}

.speed-dial-button {
  background-color: #ff5252;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.plus-icon {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.plus-icon.open {
  transform: rotate(45deg);
}

.speed-dial-options {
  position: absolute;
    bottom: 70px;
    right: 0;
    width: 133px;
    /* height: 10px; */
    z-index: 1;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
}

.speed-dial-item {
  background-color: #ff5252;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  animation: showOption 0.3s forwards ease-out;
}

@keyframes showOption {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
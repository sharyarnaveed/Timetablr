        <script setup>
        
import AddTeacher from './AddTeacher.vue';
import ViewTeacher from "./ViewTeacher.vue"

import { ref } from 'vue';
const currentTab = ref('AddTeacher')
const tabs={
    AddTeacher,
    ViewTeacher
}

        </script>
<template>
    <button
    v-for="(_ ,tab) in tabs"
    :key="tab"
     :class="['tab-button', { active: currentTab === tab }]"
    @click="currentTab=tab"
    >
{{ tab }}
    </button>

    <component :is="tabs[currentTab]" class="tab"></component>
</template>


<style  scoped>

.tab-button {
  padding: 16px 12px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: 20px;

}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
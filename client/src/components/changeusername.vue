<template>
    <main class="signupconn">
    
    <section class="signupsec">
      <form @submit.prevent="handlesubmit" class="signupform" action="">
        <h2>Change Username </h2>

        <div class="signupinputs">
          <p class="error" v-if="messageactive" >{{message}}</p>
          <input
            required
            pattern="^[A-Za-z0-9_]+$"
            title="Symbols ' - = are not allowed"
       v-model="changeusername.username"
            placeholder="New UserName"
            type="text"
          />

          
          <button>Change</button>
        </div>

       
      </form>
    </section>
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
const message=ref("");
const messageactive=ref(false)

const handlesubmit=async()=>
{
    try {
        const responce=await axios.post("/api/user/changeusername",changeusername.value)
        message.value=responce.data.message;
        messageactive.value=true
        console.log(responce);
    } catch (error) {
        console.log("error in changing Username");
    }
}


const changeusername=ref({
    username:""
})
</script>


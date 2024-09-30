<template>
    <main class="signupconn">
    
    <section class="signupsec">
      <form @submit.prevent="handlesubmit" class="signupform" action="">
        <h2>Change Password </h2>

        <div class="signupinputs">
          <p class="error" v-if="whenSuccess" >{{message}}</p>
          <input
            required
            pattern="^[A-Za-z0-9_]+$"
            title="Symbols ' - = are not allowed"
         v-model="changepassword.oldpassword"
            placeholder="Old Password"
            type="password"
          />

          <input
            required
            pattern="^[A-Za-z0-9_]+$"
            title="Symbols ' - = are not allowed"
             v-model="changepassword.newpassword"
            placeholder="New Password"
            type="password"
          />
          <input
            required
            pattern="^[A-Za-z0-9_]+$"
            title="Symbols ' - = are not allowed"
            v-model="repeatpassword"
            placeholder=" Repeat New Password"
            type="password"
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
const whenSuccess=ref(false)
const repeatpassword=ref("")
const changepassword=ref({
oldpassword:"",
newpassword:"",
})
const message=ref("")

const handlesubmit=async()=>
{
    console.log(changepassword.value)
    console.log(repeatpassword.value)
    if(changepassword.value.newpassword==repeatpassword.value)
{
    try {
        const responce=await axios.post("/api/user/changepassword",changepassword.value);
        console.log(responce);
        message.value=responce.data.message
        whenSuccess.value=true
    } catch (error) {
        
        console.log("errror In Changing Password");
    }
}
else{
    whenSuccess.value=true
    message.value="Passwords Doesnot Match"
}

}


</script>


<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";


const userdetails=ref({
  username:'',
  password:'',

})

// const successmessage = ref('');

const handlesignin = async() => {
try {
  const responce= await axios.post("/api/admin/login",userdetails.value);
  console.log(responce.data);
  if(responce.data.message=="Login Successfull")
{
  router.push("/adminhome")
}
  console.log(responce);
} catch (error) {
  
}
};
</script>

<template>
  <!-- <div v-if="successmessage" class="tyeconfirmmessgea" >
       
       <h2 >{{ successmessage }}</h2>
   </div> -->

  <section class="signin_conatiner">
    <div class="signinimage">
      <img
        src="https://images.unsplash.com/photo-1711836830357-daff8bc5b560?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
    <div class="signinform">
      <div class="welcome_text"><h1>Sigin In to Admin Panel</h1></div>

      <form @submit.prevent="handlesignin" method="post" class="siginform">
        <input
          v-model="userdetails.username"
          type="text"
          class="siginform_input"
          placeholder="Username"
          name="username"
          id=""
        />
        <input
          v-model="userdetails.password"
          type="password"
          placeholder="Password"
          class="siginform_input"
        />
        <!-- <input type="submit"  value="Sign in">/ -->
        <button type="submit" class="siginform_submit">Sign In</button>
        <br />
      </form>
    </div>
  </section>
</template>

<style scoped>
.signin_conatiner {
  height: 100vh;
  overflow: hidden;
  width: 100%;
  background-color: var(--blue);
  display: flex;
}
.signinimage {
  width: 45%;
}
.signinimage img {
  width: 100%;
  height: 100%;
}
.signinform {
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}
.welcome_text {
  width: 100%;
  display: flex;
  align-items: center;
  height: 10%;
  padding: 0px 40px;
  font-size: 1.1rem;
}
.welcome_text h1 {
  font-family: var(--font);
  color: white;
  font-weight: 100;
  margin: 0px 10%;
  letter-spacing: 3px;
}
.siginform {
  display: flex;
  height: 68%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 100%;
}
.siginform_input {
  width: 50%;
  font-size: 18px;
  height: 11%;
  border-radius: 10px;
  border: none;
  outline: none;
  font-family: var(--font);
  padding: 2px 5px;
  margin: 25px 15%;
}

.siginform_submit {
  width: 20%;
  height: 13%;
  margin: 25px 30%;
  border-radius: 18px;
  border: none;
  background-color: #f0edee;
  font-size: 20px;
  font-family: var(--font);
  cursor: pointer;
}
.siginform_submit:hover {
  background-color: var(--light-blue);
  color: white;
}
.signup_link {
  width: 100%;
  height: 10%;
  padding: 0px 20%;
}
.signup_link p {
  font-size: 1.07rem;
  font-family: var(--font);
  color: white;
}
.signup_routerlink {
  color: rgba(0, 0, 0, 0.966);
}
.signup_routerlink:hover {
  color: rgba(0, 0, 0, 0.466);
}
</style>

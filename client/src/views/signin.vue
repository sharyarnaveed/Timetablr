<script setup>
import api from "@/api";
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
const signindata = ref({
  username: "",
  password: "",
});

const siginerrorresponce = ref("");
const signinerrorcheck = ref(false);

const handlesubmit = async () => {
  try {
    const response = await api.post("/api/user/signin", signindata.value,{withCredentials:true});

    if (response.data.success) {
        router.push("/home");
      } else {
        siginerrorresponce.value = response.data.message || "An error occurred";
        signinerrorcheck.value = true;
      }
  } catch (error) {
    console.log("error in making request", error);
  }
};
</script>

<template>
  <main class="signupconn">
    <div class="logo">
      <h1>Timetablr</h1>
    </div>
    <section class="signupsec">
      <form @submit.prevent="handlesubmit" class="signupform" action="">
        <h2>Sign In</h2>

        <div class="signupinputs">
          <p class="error" v-if="signinerrorcheck">*{{siginerrorresponce}}</p>
          <input
            required
            pattern="^[A-Za-z0-9_]+$"
            title="Symbols ' - = are not allowed"
            v-model="signindata.username"
            placeholder="Username"
            type="text"
          />

          <input
            required
            pattern="^[A-Za-z0-9_]+$"
            title="Symbols ' - = are not allowed"
            v-model="signindata.password"
            placeholder="Password"
            type="password"
          />

          <button>Sign In</button>
        </div>

        <div class="alreadyacc">
          Don't Have Account? <router-link to="/signup">Sign Up</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
@media only screen and (max-width: 349px) {
  .error {
    font-family: var(--majorfont);
    font-size: 1rem;
    color: red;
  }
  .signupconn {
    /* border: 2px solid red; */
    height: 100vh;
    padding: 10px 12px;
  }
  .logo {
    /* border:2px solid green; */
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo h1 {
    font-family: var(--majorfont);
    font-weight: 500;
    font-size: 1.8rem;
  }
  .signupsec {
    /* border:2px solid purple; */
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signupform {
    /* border: 2px solid brown; */
    height: 75%;
    border-radius: 10px;
    align-items: center;
    background-color: var(--peach_color);
    display: flex;
    padding: 8px 5px;
    flex-direction: column;
    width: 90%;
  }
  .signupform h2 {
    font-family: var(--majorfont);
    font-size: 1.5rem;
  }

  .signupinputs {
    /* border: 2px solid purple; */
    height: 87%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .signupinputs input {
    width: 92%;
    background-color: var(--peach_color);
    border: none;
    border-bottom: 2px dotted black;
    height: 14%;
    font-size: 1rem;
    outline: none;
    padding: 2px 5px;
    font-family: var(--majorfont);
    font-family: 500;
  }
  .signupinputs input::placeholder {
    color: black;
  }

  .signupinputs button {
    height: 17%;
    width: 50%;
    background-color: black;
    border: none;
    border-radius: 5px;
    color: var(--peach_color);
    font-family: var(--majorfont);
    font-size: 1rem;
  }
  .alreadyacc {
    /* border: 2px solid blue; */
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-family: var(--majorfont);
  }
  .searchfilter {
    width: 92%;
    height: 12%;
    /* border: 2px solid blue; */
  }
}

@media only screen and (min-width: 350px) {
  .error {
    font-family: var(--majorfont);
    font-size: 1rem;
    color: red;
  }
  .signupconn {
    /* border: 2px solid red; */
    height: 100vh;
    padding: 10px 12px;
  }
  .logo {
    /* border:2px solid green; */
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo h1 {
    font-family: var(--majorfont);
    font-weight: 500;
    font-size: 1.8rem;
  }
  .signupsec {
    /* border:2px solid purple; */
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signupform {
    /* border: 2px solid brown; */
    height: 75%;
    border-radius: 10px;
    align-items: center;
    background-color: var(--peach_color);
    display: flex;
    padding: 8px 5px;
    flex-direction: column;
    width: 90%;
  }
  .signupform h2 {
    font-family: var(--majorfont);
    font-size: 1.5rem;
  }

  .signupinputs {
    /* border: 2px solid purple; */
    height: 87%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .signupinputs input {
    width: 92%;
    background-color: var(--peach_color);
    border: none;
    border-bottom: 2px dotted black;
    height: 14%;
    font-size: 1rem;
    outline: none;
    padding: 2px 5px;
    font-family: var(--majorfont);
    font-family: 500;
  }
  .signupinputs input::placeholder {
    color: black;
  }

  .signupinputs button {
    height: 17%;
    width: 50%;
    background-color: black;
    border: none;
    border-radius: 5px;
    color: var(--peach_color);
    font-family: var(--majorfont);
    font-size: 1rem;
  }
  .alreadyacc {
    /* border: 2px solid blue; */
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-family: var(--majorfont);
  }
  .searchfilter {
    width: 92%;
    height: 12%;
    /* border: 2px solid blue; */
  }
}

@media only screen and (min-width: 567px) {
  .signupconn {
    /* border: 2px solid red; */
    height: 100vh;
    padding: 10px 12px;
  }
  .logo {
    /* border:2px solid green; */
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo h1 {
    font-family: var(--majorfont);
    font-weight: 500;
    font-size: 1.8rem;
  }
  .signupsec {
    /* border:2px solid purple; */
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signupform {
    /* border: 2px solid brown; */
    height: 75%;
    border-radius: 10px;
    align-items: center;
    background-color: var(--peach_color);
    display: flex;
    padding: 8px 5px;
    flex-direction: column;
    width: 70%;
  }
  .signupform h2 {
    font-family: var(--majorfont);
    font-size: 1.5rem;
  }

  .signupinputs {
    /* border: 2px solid purple; */
    height: 87%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .signupinputs input {
    width: 92%;
    background-color: var(--peach_color);
    border: none;
    border-bottom: 2px dotted black;
    height: 14%;
    font-size: 1rem;
    outline: none;
    padding: 2px 5px;
    font-family: var(--majorfont);
    font-family: 500;
  }
  .signupinputs input::placeholder {
    color: black;
  }

  .signupinputs button {
    height: 17%;
    width: 50%;
    background-color: black;
    border: none;
    border-radius: 5px;
    color: var(--peach_color);
    font-family: var(--majorfont);
    font-size: 1rem;
  }
  .alreadyacc {
    /* border: 2px solid blue; */
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-family: var(--majorfont);
  }
  .searchfilter {
    width: 92%;
    height: 12%;
    /* border: 2px solid blue; */
  }
}
</style>

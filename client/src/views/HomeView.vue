<script setup>
import { onMounted } from 'vue';

let theprompt;
onMounted(()=>
{
  window.addEventListener('beforeinstallprompt',(e)=>
{
e.preventDefault();
theprompt=e;

})



})

const installapp=async()=>
{
  if(theprompt)
{
  theprompt.prompt();
  const { outcome } = await theprompt.userChoice;
        // Optionally, log the outcome
        console.log(`User response to the install prompt: ${outcome}`);
        // Clear the saved prompt
        theprompt = null;
}
}



</script>
<template>
  <main class="mainhomesec">
    <nav>
      <h1><b>Timetablr</b></h1>
    </nav>

    <section class="contentsections">
      <div class="images">
        <img src="../assets/homeimg.png" alt="" />
      </div>
      <div class="writtencontent">
        <div class="slogan">
          <h1>
            YOUR TIMETABLE <br />
            -> Simplified
          </h1>
        </div>
        <div class="buttons">
          <button @click="installapp" class="homebuttons">Download</button>
          <button class="homebuttons">Feedback</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@media only screen and (max-width: 349px) {
  nav {
    /* border: 2px solid red; */
    max-height: 11%;
    min-height: 10%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
  nav h1 {
    font-family: var(--majorfont);
    font-size: 1.7rem;
    font-weight: 300;
  }
  .mainhomesec {
    /* border: 2px solid yellow; */
    height: 100vh;
    padding: 10px 10px;
    background-color: var(--peach_color);
  }
  .contentsections {
    /* border: 2px solid blue; */
    height: 90%;
  }
  .images {
    /* border: 2px solid purple; */
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .images img {
    width: 80%;
    height: 90%;

    padding: 10px 10px;
    /* border: 2px solid purple; */
  }
  .writtencontent {
    /* border: 2px solid orange; */
    height: 50%;
  }

  .slogan {
    /* border: 2px solid blue; */
    min-height: 50%;
    display: flex;
    align-items: center;
  }
  .slogan h1 {
    font-family: var(--majorfont);
    font-size: 1.5rem;
  }

  .buttons {
    /* border: 2px solid green; */
    height: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .homebuttons {
    width: 46%;
    height: 49%;
    background-color: black;
    color: var(--peach_color);
    font-size: 1.2rem;
    font-family: var(--minorfont);
    border: none;
    border-radius: 5px;
  }
  .homebuttons:last-child {
    background-color: var(--peach_color);
    border: 2px solid black;
    color: black;
    font-weight: 600;
  }
}

@media only screen and (min-width: 350px) {
  nav {
    /* border: 2px solid red; */
    max-height: 11%;
    min-height: 10%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
  nav h1 {
    font-family: var(--majorfont);
    font-size: 1.7rem;
    font-weight: 500;
  }
  .mainhomesec {
    /* border: 2px solid yellow; */
    height: 100vh;
    padding: 10px 10px;
    background-color: var(--peach_color);
  }
  .contentsections {
    /* border: 2px solid blue;/ */
    height: 90%;
  }
  .images {
    /* border: 2px solid purple; */
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .images img {
    width: 70%;
    height: 90%;

    padding: 10px 10px;
    /* border: 2px solid purple; */
  }
  .writtencontent {
    /* border: 2px solid orange; */
    height: 50%;
  }

  .slogan {
    /* border: 2px solid blue; */
    min-height: 50%;
    display: flex;
    align-items: center;
  }
  .slogan h1 {
    font-family: var(--majorfont);
    font-size: 1.65rem;
  }

  .buttons {
    /* border: 2px solid green; */
    height: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .homebuttons {
    width: 46%;
    height: 52%;
    background-color: black;
    color: var(--peach_color);
    font-size: 1.2rem;
    font-family: var(--minorfont);
    border: none;
    border-radius: 5px;
  }
  .homebuttons:last-child {
    background-color: var(--peach_color);
    border: 2px solid black;
    color: black;
    font-weight: 600;
  }
}

@media only screen and (min-width: 576px) {
  nav {
    /* border: 2px solid red; */
    max-height: 11%;
    min-height: 10%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
  nav h1 {
    font-family: var(--majorfont);
    font-size: 1.7rem;
    font-weight: 500;
  }
  .mainhomesec {
    /* border: 2px solid yellow; */
    height: 100vh;
    padding: 10px 10px;
    background-color: var(--peach_color);
  }
  .contentsections {
    /* border: 2px solid blue; */
    height: 90%;
    display: flex;
  }
  .images {
    /* border: 2px solid purple; */
    height: 90%;
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .images img {
    width: 70%;
    height: 90%;

    padding: 10px 10px;
    /* border: 2px solid purple;/ */
  }
  .writtencontent {
    /* border: 2px solid orange; */
    height: 90%;
    width: 55%;
  }

  .slogan {
    /* border: 2px solid blue; */
    min-height: 50%;
    display: flex;
    align-items: center;
  }
  .slogan h1 {
    font-family: var(--majorfont);
    font-size: 1.9rem;
  }

  .buttons {
    /* border: 2px solid green; */
    height: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .homebuttons {
    width: 40%;
    height: 37%;
    background-color: black;
    color: var(--peach_color);
    font-size: 1.2rem;
    font-family: var(--minorfont);
    border: none;
    border-radius: 5px;
  }
  .homebuttons:last-child {
    background-color: var(--peach_color);
    border: 2px solid black;
    color: black;
    font-weight: 600;
  }
}
</style>

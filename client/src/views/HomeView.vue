<script setup>
import { onMounted } from "vue";

let theprompt;
onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    theprompt = e;
  });
});

const installapp = async () => {
  if (theprompt) {
    theprompt.prompt();
    const { outcome } = await theprompt.userChoice;
    // Optionally, log the outcome
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the saved prompt
    theprompt = null;
  }
};
</script>
<template>
  <main class="mainhomesec">
    <nav>
      <h1><b>Timetablr</b></h1>
    </nav>

    <section class="contentsections">
    
      <div class="writtencontent">
        <div class="slogan">
          <h1>
            YOUR TIMETABLE <br />
            -> Simplified
          </h1>
        </div>
        <div class="buttons">
          <button @click="installapp" class="homebuttons">Download</button>
          <button class="homebuttons">
            <a style="  color: black; text-decoration: none;" href="https://forms.gle/BExGqK2f7hzvtX1G7">Feedback</a>
            </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@media only screen and (max-width: 349px) {
  nav {
    border: 2px solid red;
    max-height: 11%;
    min-height: 10%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
  nav h1 {
    font-family: var(--majorfont);
    font-size: 1.7rem;
    color: whitesmoke;
    font-weight: 300;
  }
  .mainhomesec {
    border: 2px solid yellow;
    background-image: url("https://images.unsplash.com/photo-1701690774955-7d06cfd3f857?q=80&w=1563&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    background-position: 0%;
    background-size: cover;
    height: 100vh;
    padding: 10px 10px;
    /* background-color: var(--peach_color); */
  }
  .contentsections {
    border: 2px solid blue;
    height: 90%;
  }
  .images {
    border: 2px solid purple;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .images img {
    width: 80%;
    height: 90%;

    padding: 10px 10px;
    border: 2px solid purple;
  }
  .writtencontent {
    border: 2px solid orange;
    height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: end;
  }

  .slogan {
    border: 2px solid blue;
    min-height: 20%;
    display: flex;
    align-items: center;
    text-align: center;
    /* justify-content: center; */
  }
  .slogan h1 {
    font-family: var(--majorfont);
    font-size: 1.5rem;
    color:whitesmoke ;
  }

  .buttons {
    border: 2px solid green;
    height: 22%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .homebuttons {
    width: 46%;
    height: 49%;
    background-color: #A020F0;
    color: var(--peach_color);
    font-size: 1.2rem;
    font-family: var(--minorfont);
    border: none;
    border-radius: 5px;
  }
  .homebuttons:last-child {
    background-color: white;
    /* border: 2px solid black; */
    color: rgba(0, 0, 0, 0.651);
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
    font-size: 2rem;
    color: whitesmoke;
    font-weight: 300;
  }
  .mainhomesec {
    /* border: 2px solid yellow; */
    background-image: url("https://images.unsplash.com/photo-1701690774955-7d06cfd3f857?q=80&w=1563&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    background-position: center;
    background-size: cover;
    height: 100vh;
    padding: 10px 10px;
    /* background-color: var(--peach_color); */
  }
  .contentsections {
    /* border: 2px solid blue; */
    height: 90%;
    padding: 10px 2px;
  }

  .writtencontent {
    /* border: 2px solid orange; */
    height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: end;
  }

  .slogan {
    /* border: 2px solid blue; */
    min-height: 80%;
    display: flex;
    /* align-items: center; */
    text-align: center;
padding: 2% 5px;
    justify-content: center;
  }
  .slogan h1 {
    font-family: var(--majorfont);
    font-size: 2rem;
    text-align: center;
  
    color:whitesmoke ;
  }

  .buttons {
    /* border: 2px solid green; */
    height: 22%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .homebuttons {
    width: 46%;
    height: 49%;
    background-color: #A020F0;
    color: var(--peach_color);
    font-size: 1.2rem;
    font-family: var(--minorfont);
    border: none;
    border-radius: 5px;
  }
  .homebuttons:last-child {
    background-color: white;
    /* border: 2px solid black; */
    color: rgba(0, 0, 0, 0.651);
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
    font-size: 2.2rem;
    color: whitesmoke;
    font-weight: 300;
  }
  .mainhomesec {
    /* border: 2px solid yellow; */
    background-image: url("https://images.unsplash.com/photo-1700173318258-3c0134576743?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    background-position: center;
    background-size: cover;
    height: 100vh;
    padding: 10px 10px;
    /* background-color: var(--peach_color); */
  }
  .contentsections {
    /* border: 2px solid blue; */
    height: 90%;
    padding: 10px 2px;
  }

  .writtencontent {
    /* border: 2px solid orange; */
    height: 100%;
 display: flex;
 flex-direction: column;
 justify-content: end;
  }

  .slogan {
    /* border: 2px solid blue; */
    min-height: 80%;
    display: flex;
    align-items: center;
    /* text-align: center; */
padding: 2% 5px;
    justify-content: start;
  }
  .slogan h1 {
    font-family: var(--majorfont);
    font-size: 2.5rem;
    text-align: center;
  
    color:whitesmoke ;
  }

  .buttons {
    /* border: 2px solid green; */
    height: 22%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .homebuttons {
    width: 30%;
    height: 55%;
    background-color: #287AB8;
    color: var(--peach_color);
    font-size: 1.2rem;
    font-family: var(--minorfont);
    border: none;
    border-radius: 5px;
  }
  .homebuttons:last-child {
    background-color: white;
    /* border: 2px solid black; */
    color: rgba(0, 0, 0, 0.651);
    font-weight: 600;
  }
}
</style>

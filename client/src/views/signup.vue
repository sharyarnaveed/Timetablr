<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const options = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4'])
const filteredOptions = ref([])
const showOptions = ref(false)



watch(searchQuery,(oldvalue,newvalue)=>
{
    filteredOptions.value = options.value.filter(option =>
    option.toLowerCase().includes(oldvalue.toLowerCase())
  )

})

const handlesubmit=()=>
{
    console.log(searchQuery.value);
}

const selectOption = (option) => {
  searchQuery.value = option
  showOptions.value = false
}


</script>


<template>
    <main class="signupconn">
       <div class="logo">
      <h1>Timetablr</h1>
       </div>
       <section class="signupsec">
        <form @submit.prevent="handlesubmit" class="signupform" action="">
<h2>Create Account</h2>

<div class="signupinputs">
    <p class="error" >*Passwords Doesn't Match</p>
   <input placeholder="Username" type="text">
   <input placeholder="Department" type="text">

<!-- search filter -->
   <div class="searchfilter">
    <input
      type="text"
      v-model="searchQuery"
      @input="filterOptions"
      placeholder="Program"
      @focus="showOptions = true"
    />
    <ul v-if="showOptions && filteredOptions.length">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>


    </ul>
  </div>


   <input placeholder="Password" type="text">
   <input placeholder="Re-Password" type="text">
   <button>Sign Up</button>
</div>

<div class="alreadyacc">
Already Have an Account ? <router-link to="/signin">Sign In</router-link>
</div>
        </form>
       </section>
    </main>
</template>



<style scoped>

@media only screen and (max-width: 349px) {
.error
{
    font-family: var(--majorfont);
    font-size: 1rem;
    color: red;
}
    .signupconn{
    /* border: 2px solid red; */
    height: 100vh;
    padding: 10px 12px;
}
.logo{
    /* border:2px solid green; */
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  
}
.logo h1
{
    font-family: var(--majorfont);
    font-weight: 500;
    font-size: 1.8rem;
}
.signupsec{
    /* border:2px solid purple; */
    height: 93%;
    display: flex;
    align-items: end;
    /* justify-content: center; */
}

.signupform{
    /* border: 2px solid brown; */
    height: 95%;
    border-radius: 10px;
    align-items: center;
    background-color: var(--peach_color);
    display: flex;
    padding: 8px 5px;
    flex-direction: column;
    width: 100%;
}
.signupform h2
{
    font-family: var(--majorfont);
    font-size: 1.5rem;
}

.signupinputs{
    /* border: 2px solid purple; */
    height: 87%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}
.signupinputs input
{
    width: 92%;
    background-color: var(--peach_color);
    border: none;
    border-bottom: 2px dotted black ;
    height: 10%;
    font-size: 1rem;
    outline: none;
    padding: 2px 5px;
    font-family: var(--majorfont);
    font-family: 500;
}
.signupinputs input::placeholder
{
    color: black;
   
}

.signupinputs button{
height:10% ;
width: 50%;
background-color: black;
border: none;
border-radius: 5px;
color: var(--peach_color);
font-family: var(--majorfont);
font-size: 1rem;
}
.alreadyacc{
    /* border: 2px solid blue; */
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-family: var(--majorfont);
}
.searchfilter{
    width: 92%;
    height: 12%;
    /* border: 2px solid blue; */
}
.searchfilter input
{
    height: 100%;
    width: 100%;
}
ul {
  border: 2px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  position: absolute;
  background-color: white;
  width:50%;
}

li {
padding: 10px;
border-bottom: 2px solid rgba(0, 0, 0, 0.096);
cursor: pointer;
}

li:hover {
  background-color: #eee;
}

}

@media only screen and (min-width: 350px) {
    .error
{
    font-family: var(--majorfont);
    font-size: 1rem;
    color: red;
}
.signupconn{
/* border: 2px solid red; */
height: 100vh;
padding: 10px 12px;

}
.logo{
/* border:2px solid green; */
height: 7%;
display: flex;
justify-content: center;
align-items: center;

}
.logo h1
{
font-family: var(--majorfont);
font-weight: 500;
font-size: 1.8rem;
}
.signupsec{
/* border:2px solid purple; */
height: 93%;
width: 100%;
padding: 0px 10px;
display: flex;
align-items: end;
/* justify-content: center; */
}

.signupform{
/* border: 2px solid brown; */
height: 95%;
border-radius: 10px;
align-items: center;
background-color: var(--peach_color);
display: flex;
padding: 8px 5px;
flex-direction: column;
width: 100%;
}
.signupform h2
{
font-family: var(--majorfont);
font-size: 1.5rem;
}

.signupinputs{
/* border: 2px solid purple; */
height: 87%;
width: 100%;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
}
.signupinputs input
{
width: 92%;
background-color: var(--peach_color);
border: none;
border-bottom: 2px dotted black ;
height: 10%;
font-size: 1rem;
outline: none;
padding: 2px 5px;
font-family: var(--majorfont);
font-family: 500;
}
.signupinputs input::placeholder
{
color: black;

}

.signupinputs button{
height:10% ;
width: 50%;
background-color: black;
border: none;
border-radius: 5px;
color: var(--peach_color);
font-family: var(--majorfont);
font-size: 1rem;
}
.alreadyacc{
/* border: 2px solid blue; */
width: 100%;
height: 6%;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
font-family: var(--majorfont);
}
.searchfilter{
width: 92%;
height: 12%;
/* border: 2px solid blue; */
}
.searchfilter input
{
height: 100%;
width: 100%;
}
ul {
border: 2px solid #ccc;
max-height: 150px;
overflow-y: auto;
padding: 0;
margin: 0;
list-style: none;
position: absolute;
background-color: white;
width:50%;
}

li {
padding: 10px;
border-bottom: 2px solid rgba(0, 0, 0, 0.096);
cursor: pointer;
}

li:hover {
background-color: #eee;
}

}


@media only screen and (min-width: 567px)
{
    .signupsec {
        /* border: 2px solid purple; */
        height: 93%;
        width: 100%;
        padding: 0px 10px;
        display: flex;
        align-items: end;
        justify-content: center;
    }
    .signupform {
        /* border: 2px solid brown; */
        height: 95%;
        border-radius: 10px;
        align-items: center;
        background-color: var(--peach_color);
        display: flex;
        padding: 8px 5px;
        flex-direction: column;
        width: 70%;
    }
}
</style>
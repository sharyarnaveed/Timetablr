<template>
    
    <main class="loadmoremain">
        <router-link class="backrouter" to="/home"><- Back</router-link>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>
<Otherclasscard class="comp"/>





    </main>
</template>

<script setup>
import Otherclasscard from '@/components/otherclasscard.vue';
// import otherclasscard from '@/components/otherclasscard.vue';
</script>

<style scoped>

@media only screen and (max-width: 349px) {

    .loadmoremain{
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    display: flex;
    /* gap: 2%; */
    padding: 10px 15px;
    flex-direction: column;
    justify-content: space-evenly;
    /* align-items: center; */
}
.comp{
    /* border: 2px solid red; */
    margin: 10px 2px;
    height: 120px;
    padding: 10px 10px;
}
.backrouter{
    font-size: 1.1rem;
    font-family: var(--majorfont);
    color: black;
}

}



@media only screen and (min-width: 350px) {

.loadmoremain{
/* border: 2px solid red; */
height: 100vh;
overflow-y: auto;
display: flex;
/* gap: 2%; */
padding: 10px 15px;
flex-direction: column;
justify-content: space-evenly;
/* align-items: center; */
}
.comp{
/* border: 2px solid red; */
margin: 10px 2px;
height: 120px;
padding: 10px 10px;
}
.backrouter{
font-size: 1.1rem;
font-family: var(--majorfont);
color: black;
}

}
</style>
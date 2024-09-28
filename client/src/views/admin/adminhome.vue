<template>
 <main class="adminhome">
    <section class="upperadminhome">

        <section class="userscharts">
    
            <linechart/>
        </section>
    <section class="courseslist">
    
    </section>
    </section>


 </main>
</template>

<script setup>
import linechart from "@/components/linechart.vue"
</script>

<style  scoped>
.adminhome
{
    background-color: #F2F8FD;
    height: 90%;
    border: 2px solid red;
    
    
}
.upperadminhome{
    border: 2px solid orange;
    height: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 15px;
}
.userscharts {
    border: 2px solid purple;
    width: 45%;
    height: 95%;
    background-color: white;
    border-radius: 14px;
}
.userscharts canvas{
width: 100%;
height: 100%;
}
.courseslist
{
    border: 2px solid purple;
    width: 45%;
    height: 95%;
    background-color: white;
    border-radius: 14px;
}
</style>
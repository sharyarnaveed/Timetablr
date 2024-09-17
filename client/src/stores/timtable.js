import {defineStore } from "pinia";


export const useTimetableStore=defineStore('timetable',{
    state:()=>({
        classes:[],
        currentClass:null
    }),
    actions:{
        setClasses(classes)
        {
            this.classes=classes
            console.log("from time js",this.classes);
        },
        findCurrentClass()
        {
            const now=new Date();
           // Assuming the class times are date-time objects
           
           const currenthours=now.getHours();
           const currentminutes=now.getMinutes();
const Totalmins=currenthours*60+currentminutes;

           console.log(Totalmins);
// console.log(timechecking);
           this.currentClass = this.classes.find(c => {
        
const classStart=c.start_time*24*60
const classEnd=c.end_time*24*60
        console.log(classEnd);
        return Totalmins >= classStart && Totalmins <= classEnd;
        })
        console.log(this.currentClass);
    },
    setCurrentClass(currentClass) {
        this.currentClass = currentClass;
        console.log(this.currentClass);
      }
}
})
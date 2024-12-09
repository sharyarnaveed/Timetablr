import { defineStore } from "pinia";

export const useTimetableStore = defineStore("timetable", {
  state: () => ({
    classes: [], // Should be an array of objects
    currentClass: null,
    notcurrentclass: [],
  }),
  actions: {
    setClasses(classes) {
      if (Array.isArray(classes)) {
        this.classes = classes;
        // console.log("Classes set successfully:", this.classes);
      } else {
        // console.error("setClasses expects an array but received:", classes);
      }
    },
    findCurrentClass() {
      const now = new Date();
      const currenthours = now.getHours();
      const currentminutes = now.getMinutes();
      const Totalmins = currenthours * 60 + currentminutes;

      console.log("All classes:", this.classes);

      this.currentClass = this.classes.find((c) => {
        const [startHours, startMinutes] = c.start_time.split(":").map(Number);
        const [endHours, endMinutes] = c.end_time.split(":").map(Number);

        const classStart = startHours * 60 + startMinutes;
        const classEnd = endHours * 60 + endMinutes;

        console.log(`Checking: Start=${classStart}, End=${classEnd}, Now=${Totalmins}`);
        return Totalmins >= classStart && Totalmins <= classEnd;
      });

      // console.log("Current class:", this.currentClass);
    },
    findnotcurrent() {
      const now = new Date();
      const currenthours = now.getHours();
      const currentminutes = now.getMinutes();
      const Totalmins = currenthours * 60 + currentminutes;

      console.log("Finding not current classes. All classes:", this.classes);

      if (!Array.isArray(this.classes)) {
        console.error("this.classes is not an array:", this.classes);
        return;
      }

      this.notcurrentclass = this.classes.filter((c) => {
        const [startHours, startMinutes] = c.start_time.split(":").map(Number);
        const classStart = startHours * 60 + startMinutes;

        // console.log("Class start time in minutes:", classStart);
        return Totalmins < classStart; // Classes after current time
      });
      
      // console.log("Not current classes:", this.notcurrentclass);
    },


  },
});

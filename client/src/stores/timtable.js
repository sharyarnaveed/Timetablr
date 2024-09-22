import { defineStore } from "pinia";

export const useTimetableStore = defineStore("timetable", {
  state: () => ({
    classes: [],
    currentClass: null,
    notcurrentclass: [],
  }),
  actions: {
    setClasses(classes) {
      this.classes = classes;
      // console.log("from set classes",this.classes);
    },
    findCurrentClass() {
      const now = new Date();
      // Assuming the class times are date-time objects

      const currenthours = now.getHours();
      const currentminutes = now.getMinutes();
      const Totalmins = currenthours * 60 + currentminutes;

      console.log("all", this.classes);

      this.currentClass = this.classes.find((c) => {
        const classStart = c.start_time * 24 * 60;
        const classEnd = c.end_time * 24 * 60;
        // console.log(classStart);
        return Totalmins >= classStart && Totalmins <= classEnd;
      });
      // console.log(this.currentClass);
    },
    findnotcurrent() {
      const now = new Date();
      const currenthours = now.getHours();
      const currentminutes = now.getMinutes();
      const Totalmins = currenthours * 60 + currentminutes;

      // console.log("From the Not current",this.classes); // Debug: Log current total minutes

      // Find classes that are scheduled to start after the current time
      this.notcurrentclass = this.classes.filter((c) => {
        const classStart = c.start_time * 24 * 60; // Convert to minutes

        // console.log("Checking clsass start time in minutes:", classStart); // Debug: Log each class start time

        // Check if the class start time is after the current time
        return Totalmins < classStart;
      });
      //   console.log("Classes after the current time:", this.notcurrentclass); // Debug: Log classes after the current time
    },
  },
});

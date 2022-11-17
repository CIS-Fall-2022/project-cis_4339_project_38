<template>
    <main>
      <div>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Delete An Event</h1>
      </div>
      <div class="px-10 py-20">
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm" method="DELETE" action='/event/:id'>
          <!-- grid container -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            <h2 class="text-2xl font-bold">Event Name</h2>
  
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700"></span>
                <span style="color:#ff0000"></span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="event.eventName"
                />
                <span class="text-black" v-if="v$.event.eventName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.event.eventName.$errors"
                    :key="error.$uid"
                  >{{ error.$message }}!</p>
                </span>
              </label>
            </div>
            </div>
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">Delete Event</button>
          </div>
        </form>
      </div>
    </main>
  </template>
  <script>
  import useVuelidate from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  import axios from "axios";
  export default {
    setup() {
      return { v$: useVuelidate({ $autoDirty: true }) };
    },
    data() {
      return {
        checkedServices: [],
        event: {
          eventName: "",
        },
      };
    },
    methods: {
      async handleSubmitForm() {
        // Checks to see if there are any errors in validation
        const isFormCorrect = await this.v$.$validate();
        // If no errors found. isFormCorrect = True then the form is submitted
        if (isFormCorrect) {
          this.event.services = this.checkedServices;
          let apiURL = 'http://localhost:3000/' + 'event/event/' + (this.id);
          axios
            .delete(apiURL, this.event)
            .then(() => {
              alert("Event has been cancelled.");
              this.$router.push("/event/:id");
              this.event = {
                eventName: "",
                services: [],
                date: "",
                address: {
                  line1: "",
                  line2: "",
                  city: "",
                  county: "",
                  zip: "",
                },
                description: "",
              };
              this.checkedServices = [];
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
    },
    // sets validations for the various data properties
    validations() {
      return {
        event: {
          eventName: { required },
        },
      };
    },
  };
  </script>
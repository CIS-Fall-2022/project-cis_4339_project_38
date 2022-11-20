<template>
    <main>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Find a Client to Delete</h1>
      <div class="px-10 py-20">

        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
          <!-- grid container -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            <h2 class="text-2xl font-bold">Client Name</h2>
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">First Name</span>
                <span style="color:#ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.firstName"
                />
                <span class="text-black" v-if="v$.client.firstName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.firstName.$errors"
                    :key="error.$uid"
                  >{{ error.$message }}!</p>
                </span>
              </label>
            </div>
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Last Name</span>
                <span style="color:#ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder
                  v-model="client.lastName"
                />
                <span class="text-black" v-if="v$.client.lastName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.lastName.$errors"
                    :key="error.$uid"
                  >{{ error.$message }}!</p>
                </span>
              </label>
            </div>
            

            <div></div>
          

            <!-- submit button -->
            <div class="flex justify-between mt-10 mr-20">
              <button class="bg-red-700 text-white rounded" type="submit">Delete Client</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </template>
  <script>
  import useVuelidate from "@vuelidate/core";
  import { required, email, alpha, numeric } from "@vuelidate/validators";
  import axios from "axios";
  export default {
    setup() {
      return { v$: useVuelidate({ $autoDirty: true }) };
    },
    mounted() {
      window.scrollTo(0, 0);
    },
    data() {
      return {
        client: {
          firstName: "",
          lastName: "",
        },
      };
    },
    methods: {
      async handleSubmitForm() {
        // Checks to see if there are any errors in validation
        const isFormCorrect = await this.v$.$validate();
        // If no errors found. isFormCorrect = True then the form is submitted
        if (isFormCorrect) {
          let apiURL = import.meta.env.VITE_ROOT_API + '/primary/primary/' + (this.id);
          axios
            .delete(apiURL, this.client)
            .then(() => {
              alert("Client has been succesfully deleted.");
              this.$router.push("/primary/:id");
              this.client = {
                firstName: "",
                lastName: "",
              };
            })
            .catch((error) => {
              console.log(error).then(alert("Delete cannot be made! Please try again later"));
            });
        }
      },
    },
    // sets validations for the various data properties
    validations() {
      return {
        client: {
          firstName: { required, alpha },
          lastName: { required, alpha },
        },
      };
    },
  };
  </script>
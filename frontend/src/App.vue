<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/intakeform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findEvents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            <li>
              <router-link to="/deleteClient">
                <span style="position: relative; top: 6px" class="material-icons">delete</span>
                Delete Client
              </router-link>
            </li>
            <li>
              <router-link to="/deleteEvent">
                <span style="position: relative; top: 6px" class="material-icons">delete</span>
                Delete Event
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="
          background: linear-gradient(250deg, #C8102E 70%, #efecec 50.6%);
        "
      >
        <h1 class="mr-20 text-3xl text-white">{{organization}}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  name: "App",
  data(){
  return {
    error: null,
    loading: true,
    organization: [],
  };
},
methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/org/getorg`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.organization = response.data;
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "No Organization Found",
            message: err.message,
          };
        } 
      }
    },
  },
    mounted() {
    this.fetchData();

  },
  routePush(routeName) {
      this.$router.push({ name: routeName });
  }
};
</script>

<style>
#_container { 
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
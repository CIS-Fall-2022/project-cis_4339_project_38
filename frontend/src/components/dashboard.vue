<template>
  <main>
   <!--Graph and Data -->
   <!--Reference: Module 10 -->
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <h2 class="font-italic text-4xl text-red-700 tracking-widest text-center mt-10">Our Past Events</h2>
    </div>
    <div class="column">
    <div>
      <div>
        <EventBar
          v-if="!loading && !error"
          :label="Event"
          :chart-data="total"
        ></EventBar>

        <!-- Start of loading animation -->
        <div class="mt-40" v-if="loading">
          <p
            class="
              text-6xl
              font-bold
              text-center text-gray-500
              animate-pulse
            "
          >
            Loading...
          </p>
        </div>
        <!-- End of loading animation -->

        <!-- Start of error alert -->
        <div class="mt-12 bg-red-50" v-if="error">
          <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
            {{ error.title }}
          </h3>
          <p class="p-4 text-lg font-bold text-red-900">
            {{ error.message }}
          </p>
        </div>
        <!-- End of error alert -->
        <br />
        <br />
      </div>
    </div>
  </div>
  <!--Table showing the event names and attendance-->
  <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left font" style="background-color:darkred"> Name</th>
                  <th class="p-4 text-left" style="background-color:darkred">Attendance</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr v-for="event in eventTableData">
                  <td class="p-2 text-left" style="background-color:crimson">{{event._id}}</td>
                  <td class="p-2 text-left" style="background-color:crimson"> {{event.total}}</td>
                </tr>
              </tbody> 
            </table>
          </div>
  </main>
</template>
<script>
import axios from "axios";
import EventBar from "../components/BarChartComponent.vue";

export default {


components: {
EventBar,
},
data() {
return {
  Event: [],
  total: [],
  loading: false,
  error: null,
};
},
  methods: {
    async fetchData() {
  try {
    this.error = null;
    this.loading = true;
    const url = import.meta.env.VITE_ROOT_API + `/event/eventAttendees`;
    const response = await axios.get(url);
    //"re-organizing" - mapping json from the response
    this.Event = response.data.map((item) => item._id);
    this.total = response.data.map((item) => item.total);
    this.eventTableData = response.data;
  } catch (err) {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      this.error = {
        title: "Server Response",
        message: err.message,
      };
    } else if (err.request) {
      // client never received a response, or request never left
      this.error = {
        title: "Unable to Reach Server",
        message: err.message,
      };
    } else {
      // There's probably an error in your code
      this.error = {
        title: "Application Error",
        message: err.message,
      };
    }
  }
  this.loading = false;
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
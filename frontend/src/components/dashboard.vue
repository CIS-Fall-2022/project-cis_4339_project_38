<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <div>
      <h2 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Our Last Events</h2>
    </div>
          <div>
            <div>
              <eventBar
                v-if="!loading && !error"
                :label="labels"
                :chart-data="total"
              ></eventBar>
  
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
  </main>
</template>
<script>
export default {
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
      
    },
  },
};
</script>
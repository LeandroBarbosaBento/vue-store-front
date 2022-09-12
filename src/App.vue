<template>

<!-- <button @click="testeRoda">click</button> -->

  <template v-if="router.currentRoute.name != 'Login' && router.currentRoute.name != 'NewUser'">
    <Navbar />
  </template>

    <MDBContainer>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 100vh; border: 2px solid blue;"
      >

        <router-view/>


      </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";
import Navbar from "@/components/Navbar.vue";
import { useRouter } from 'vue-router';


export default {
  name: 'App',
  components: {
    MDBContainer,
    Navbar
  },
  data() {
    return {
      router: useRouter(), 
    }

  },
  methods: {
    testeRoda() {
      console.log(this.router.currentRoute.name);
    },
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>

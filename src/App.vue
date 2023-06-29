<template>
  <v-app class="app">
    <HeaderComponent></HeaderComponent>
    <v-main>
      <router-view/>
    </v-main>
    <footer-component></footer-component>
  </v-app>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
export default {
  name: 'App',
  components: {HeaderComponent, FooterComponent},
  data() {
    return {
    }
  }
};
</script>
<style>
@import url('https://fonts.cdnfonts.com/css/pier-sans');
.app {
  background-color:rgb(66, 66, 66) !important;
}          
</style>
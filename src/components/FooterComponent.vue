<template>
    <v-footer

      style="background-color: rgb(81, 81, 81);"
    >
      <v-col cols="9">
        <v-btn
          v-for="icon in icons"
          :key="icon.iconPic"
          class="mx-4"
          variant="text"
          rounded
          elevation="0"
          color="transparent"
          :href="icon.route"
        ><v-icon :color="icon.color">{{ icon.iconPic }}</v-icon></v-btn>
      </v-col>

      <v-spacer></v-spacer>
  
      <v-col cols="3" class="text-right copyRight">
        {{ new Date().getFullYear() }}. copyright Iven Jurić
      </v-col>
    </v-footer>
  </template>
  <script>
  export default {
    name:  'FooterComponent',
    data: () => ({
        icons: [
    {
      iconPic: 'mdi-facebook',
      color: '#0388fc',
      route: 'https://www.facebook.com/iven.juric/?locale=hr_HR'
    },
    {
        iconPic: 'mdi-twitter',
      color: '#26c6da',
      route: 'https://twitter.com/juric_iven'
    },
    {
        iconPic: 'mdi-linkedin',
      color: '#0388fc',
      route: 'https://www.linkedin.com/in/iven-juri%C4%87-121299220/?originalSubdomain=hr'
    },
    {
        iconPic: 'mdi-instagram',
      color: '#e4405f',
      route: 'https://www.instagram.com/icaa21/?hl=hr'
    },
  ],
    }),
  }
</script>
<style scoped>
.copyRight {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 200;
    color: rgb(239, 239, 239);
}
</style>
<template>
    <v-main>
      <categoriesComponent></categoriesComponent>
    </v-main>
</template>
  
  <script>
  import categoriesComponent from '@/components/categoriesComponent.vue';
    export default {
      name: 'CategoriesPage',
      components: {categoriesComponent},
      data() {
        return {
            
        }
      }
    }
  </script>

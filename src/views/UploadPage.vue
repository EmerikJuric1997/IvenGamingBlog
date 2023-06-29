<template>
  <v-main>
    <editor-component />
  </v-main>
</template>

<script>
import editorComponent from '@/components/editorComponent.vue';
export default {
  name: 'app',
  components: {
    editorComponent,
  },
  data() {
    return {

    };
  },
}
</script>

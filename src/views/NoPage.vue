<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-img @click="back()" class="noPageImage mx-auto" src="../assets/images/sadPage.png"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import router from '@/router'

export default {
    name: 'NoPage',
    methods: {
        back() {
            router.go(-1)
        }
}
}

</script>
<style scoped>
.noPageImage {
    height: 80vh;
    width: 150vh;
}
@media screen and (max-width: 700px) {
    .noPageImage {
        height: 28vh;
        width: 150vh;
    }
}
</style>
<template>
    <v-container class="homeBg" fluid>
        <v-row no-gutters class="homeBg shrink">
            <v-col xs="1" md="3" lg="3" xl="3" xxl="3" sm="2"></v-col>
            <v-col data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="500" xs="12" md="6" lg="6" xl="6" xxl="6" sm="8" class="text-xs-display-1 hidden-xs-and-down">
                <h1 style="color:rgb(239, 239, 239); font-size: 2vh;"
                    class="text-center homeTitle text-sm-h3 text-md-h2 text-xl-h1 text-xxl-h1 text-lg-h2">The
                    game <span style="color:rgb(71, 169, 255)">never</span> truly <span
                        style="color:rgb(71, 169, 255)">ends</span>.
                </h1>
            </v-col>
            <v-col xs="1" md="3" lg="3" xl="3" xxl="3" sm="2"></v-col>
        </v-row>

        <v-row>
            <v-col md="3" lg="3" xl="3" xxl="3" sm="1">
                <v-img data-aos="fade-right" class="justify-center justify-content-center mx-auto borderImg" src="../assets/images/joy1.png" width="280"></v-img>
            </v-col>
            <v-col data-aos="flip-down" data-aos-duration="1000" xs="12" sm="10" md="6" lg="6" xl="6" xxl="6" cols="12">
                <carouselComponent></carouselComponent>
            </v-col>
            <v-col md="3" lg="3" xl="3" xxl="3" sm="1">
                <v-img data-aos="fade-left" class="justify-center justify-content-center mx-auto borderImg" src="../assets/images/joy2.png" width="300"></v-img>
            </v-col>
        </v-row>

        <categoriesPreview></categoriesPreview>
    </v-container>
</template>
  
<script>
import carouselComponent from '@/components/carouselComponent.vue';
import categoriesPreview from '@/components/categoriesPreview.vue';
export default {
    components: { carouselComponent, categoriesPreview },
    name: 'HomePage',
}
</script>
<style scoped>
.homeTitle {
    font-family: 'Pier Sans', sans-serif;
    line-height: 130%;
    font-weight: 900;
}

.homeBg {
    background-color: rgb(66, 66, 66);
}
.borderImg {
    transition: ease-in-out 0.3s;
    animation: myanimation 10s infinite;
}
@keyframes myanimation {
  0% {filter: hue-rotate(90deg);}
  25%{filter: none}
  50%{filter: hue-rotate(-90deg);}
  75%{filter: none;}
  100% {filter: hue-rotate(90deg);}
}
@media screen and (max-width: 1000px) {
    .borderImg {
        opacity: 0 !important;
        height: 0px !important;
    }}
</style>
  
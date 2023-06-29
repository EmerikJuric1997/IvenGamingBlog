<template>
    <v-row class="pt-15">
        <v-col cols="12" md="4" lg="4" xl="4" xxl="4" sm="6" class="mx-auto pt-15 pb-15 pl-15 pr-15"
            v-for="category in categories" :key="category.title">
            <v-card elevation="20" show-arrows-on-hover hide-delimiter-background cycle class="cardImage"
                style="border-radius: 20px; background-color: rgba(0, 0, 0, 0.2); border: 2px solid rgba(0, 136, 255, 0.267);" data-aos="zoom-in" data-aos-duration="1000" :to="'category/' + category.title">
                <v-card-actions>
                    <v-row>
                        <v-col cols="12" md="12" lg="8" xl="8" xxl="12" sm="12">
                            <h2 class="thinText text-center ml-0 ml-xs-0 ml-sm-0 ml-md-0 ml-lg-5 text-md-center text-lg-left" style="color:rgb(239, 239, 239)">{{ category.title }}</h2>
                        </v-col>
                        <v-col cols="12" md="12" lg="4" xl="4" xxl="6" sm="12" class="text-end pr-2">
                            <h2 class="thinText text-center" style="color:rgb(71, 169, 255)">see all<v-icon
                                    style="color:rgb(71, 169, 255)">mdi-arrow-right</v-icon></h2>
                        </v-col>
                    </v-row>
                </v-card-actions>
                <v-img :src="category.imgURL" class="imgBorder">
                </v-img>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'categoriesComponent',
    data() {
        return {
            categories: [
                {title: 'Action-adventure', imgURL: 'https://i.ibb.co/HGvd0Mk/1.jpg'},
                {title: 'Platformer', imgURL: 'https://i.ibb.co/Jd8YxR0/10.jpg'},
                {title: 'Role-playing', imgURL: 'https://i.ibb.co/ZBQGNZc/2.jpg'},
                {title: 'Sandbox', imgURL: 'https://i.ibb.co/W2d0G6h/3.jpg'},
                {title: 'Shooters', imgURL: 'https://i.ibb.co/VpGK1N8/4.jpg'},
                {title: 'Simulation and sports', imgURL: 'https://i.ibb.co/72RBcXg/5.jpg'},
                {title: 'Survival and horror', imgURL: 'https://i.ibb.co/JHXh4kr/6.jpg'},
                {title: 'Real-time strategy', imgURL: 'https://i.ibb.co/BfS3mx0/7.jpg'},
                {title: 'Puzzlers and party games', imgURL: 'https://i.ibb.co/7GrwYcZ/11.jpg'},
                {title: 'Multiplayer online battle arena', imgURL: 'https://i.ibb.co/TLCd9Xv/8.jpg'},
                {title: 'Movies', imgURL: 'https://i.ibb.co/tpHwJFW/9.jpg'},
            ],
        }
    },
}
</script>
<style scoped>
.thinText {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 300;
}

.imgBorder {
    border-radius: 20px;
    box-shadow: 20px 20px 20px 1px rgba(0, 0, 0, 0.2);
}
.cardImage {
    transition: 0.5s ease-in-out !important;
}
.cardImage:hover {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
}
</style>
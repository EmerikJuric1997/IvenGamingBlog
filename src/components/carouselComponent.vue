<template>
    <v-main>
        <v-carousel height="500" show-arrows-on-hover hide-delimiter-background cycle class="carousel">
            <v-carousel-item v-for="carousel in carousels" :key="carousel.title" :src="carousel.src" cover>
                <v-container fill-height class="pt-15 border" style="background:rgba(0, 0, 0, 0.6);">
                    <v-row class="white--text">
                        <v-col class="white--text">
                            <h1 class="text-start carouselTitle text-h3 pt-15 pl-14">{{ carousel.title }}
                                <p class="text-start carouselDesc text-h5 pl-1 pt-10">
                                    {{ carousel.desc }}
                                </p>
                            </h1>
                        </v-col>
                    </v-row>
                </v-container>
            </v-carousel-item>
        </v-carousel>
    </v-main>
</template>
<script>

export default ({
    name: 'CarouselComponent',
    data() {
        return {
            carousels: [
                {
                    title: 'Every day!',
                    desc: 'Your destination for gaming, reviews, and everything in between.',
                    src: 'https://wallpapercave.com/wp/O0vx7ZB.jpg'
                },
                {
                    title: 'Latest news.',
                    desc: 'Join us as we delve into the latest releases and uncover hidden gems.',
                    src: 'https://wallpaperaccess.com/full/1193446.jpg'
                },
            ]

        }
    },
    methods: {

    },
    mounted() {

    }
})
</script>
<style scoped>
.carousel {
    font-family: 'Pier Sans', sans-serif;
    border-radius: 20px;
    box-shadow: 20px 20px 20px 1px rgba(0, 0, 0, 0.2);

}

.carouselTitle {
    font-weight: 900;
    color: white;
}

.carouselDesc {
    font-weight: 300;
    color: white;
}

.border {
    position: relative;
}
.border::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 3px solid rgb(71, 169, 255);
        border-radius: 20px;
        animation: clippath 3s infinite linear;
    }

@keyframes clippath {

    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }

    25% {
        clip-path: inset(0 95% 0 0);
    }

    50% {
        clip-path: inset(95% 0 0 0);
    }

    75% {
        clip-path: inset(0 0 0 95%);
    }
}
</style>

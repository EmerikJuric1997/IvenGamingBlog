<template>
    <v-container class="header" fluid>
        <v-app-bar color="grey darken-3 app" elevation="0" dark>
            <router-link to="/">
                <v-img src="../assets/images/logo.png" max-height="63" max-width="63" contain class="navLogo" to="/">
                </v-img>
            </router-link>
            <v-spacer></v-spacer>
            <v-app-bar-title class="pr-5 navText">
                <router-link class="navText" to="/categories">CATEGORIES
                </router-link>
            </v-app-bar-title>
            <v-app-bar-title class="pr-5 navText">
                <router-link class="navText" to="/search">SEARCH
                </router-link>
            </v-app-bar-title>
            <router-link to="/upload"><v-btn v-if="this.isLoggedIn === true" rounded color="transparent"
                    elevation="0"><v-icon color="light-blue lighten-1">mdi-publish</v-icon></v-btn></router-link>
            <v-btn v-if="this.isLoggedIn === true" dark @click="signOut()" rounded color="transparent" elevation="0"><v-icon
                    color="light-blue lighten-1">mdi-logout</v-icon></v-btn>
        </v-app-bar>
    </v-container>
</template>
  
<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import router from '@/router';


export default {
    name: 'HeaderComponent',
    data() {
        return {
            isLoggedIn: false
        }
    },
    methods: {
        signOut() {
            const auth = getAuth();
            signOut(auth).then(() => {
                router.push('/login')
            }).catch(() => {
                // An error happened.
            });
        },
        getUser() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.isLoggedIn = true
                    // ...
                } else {
                    this.isLoggedIn = false
                }
            });
        }
    },
    mounted() {
        this.getUser();
    }
}
</script>
<style scoped>
.navText {
    font-family: 'Pier Sans', sans-serif;
    font-size: 17px;
    color: rgb(239, 239, 239);
    display: inline-block;
    position: relative;
    text-decoration: none;
}

.navText:after {
    content: '';
    position: absolute;
    width: 84.5%;
    transform: scaleY(0);
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #0087ca;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.navText:hover:after {
    transform: scaleY(0.9);
    transform-origin: bottom;
}

.navLogo {
    transition: rotate 0.25s ease-out
}

.navLogo:hover {
    rotate: -10deg;
}

.searchBar {
    width: 100px;
}


a:hover,
a.router-link-active {
    border-bottom: 2px solid #3498db;
}
</style>
<template>
    <v-container fluid>
        <v-row v-if="this.noDocument.boolDoc === true">
            <v-col cols="12" class="text-center">
                <h2 class="noDocument">
                    {{ noDocument.msg }}
                </h2>
            </v-col>
        </v-row>
        <v-row class="justify-center" v-if="this.noDocument.boolDoc === true"><a class="back text-center pt-7 text-h5"
                @click="back()">Go back!</a></v-row>
        <v-container fluid v-if="this.noDocument.boolDoc === false">
            <v-row v-if="article"  data-aos="flip-down" data-aos-duration="1000">
                <v-col cols="12">
                    <h1
                        class="text-center text-h4 text-xl-h1 text-xxl-h1 text-lg-h1 text-md-h2 pt-15 text-sm-h2 articleContainer">
                        {{ article.title }}</h1>
                </v-col>
                <v-col cols="12">
                    <v-card class="articleCardd" elevation="0">
                        <v-row>
                            <v-col cols="12">
                                <v-card-title class="justify-center"><v-img src="../assets/images/profilePic.jpg"
                                        max-width="40" max-height="40" class="profileImg"></v-img>
                                    <p class="authorTitle pt-6" style="padding: 10px;">Author: Iven Jurić</p>
                                    <p class="articleDate pt-7">{{ date }}</p>
                                </v-card-title>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="1" sm="1" md="2" lg="2" xl="3" xxl="3"></v-col>
                <v-col cols="10" sm="10" md="8" lg="8" xl="6" xxl="6" data-aos="fade-left" data-aos-anchor="#example-anchor"
                    data-aos-offset="500" data-aos-duration="500"><v-img :src="article.articleCoverPhoto"
                        class="articleImg"></v-img></v-col>
                <v-col cols="1" sm="1" md="2" lg="2" xl="3" xxl="3"></v-col>
            </v-row>
            <v-row class="pb-15">
                <v-col cols="1" sm="1" md="2" lg="2" xl="3" xxl="3"></v-col>
                <v-col cols="10" sm="10" md="8" lg="8" xl="6" xxl="6">
                    <div class="articleText text-justify" data-aos="fade-right" data-aos-duration="500"
                        v-html="article.articleText"></div>
                </v-col><v-col cols="1" sm="1" md="2" lg="2" xl="3" xxl="3"></v-col>
            </v-row>
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6" class="text-center">
            <v-chip color="transparent" elevation="15" dark v-for="tag in article.tags" :key="tag" class="ml-2">
              {{ tag }}
            </v-chip>
          </v-col>
          <v-col cols="3"></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <p class="shareText">Share:</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <v-btn color="grey darken-4" rounded elevation="15" @click="fbShare()"><v-icon
                            color="blue darken-2">mdi-facebook</v-icon></v-btn>
                    <v-btn color="grey darken-4" rounded elevation="15" class="ml-2" @click="twitterShare()"><v-icon
                            color="light-blue lighten-1">mdi-twitter</v-icon></v-btn>
                    <v-btn color="grey darken-4" rounded elevation="15" class="ml-2" @click="linkedinShare()"><v-icon
                            color="blue darken-3">mdi-linkedin</v-icon></v-btn>
                    <v-btn color="grey darken-4" rounded elevation="15" class="ml-2" @click="redditShare()"><v-icon
                            color="orange darken-4">mdi-reddit</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <v-btn v-if="this.isLoggedIn === true" color="grey darken-4" dark rounded elevation="15" class="ml-2"
                        @click="deleteBlog()">DELETE<v-icon color="red darken-2">mdi-delete</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/main";
import router from "@/router";

export default ({
    name: 'articleComponent',
    data() {
        return {
            isLoggedIn: false,
            currentRoute: encodeURI(window.location.href),
            date: null,
            articleTitle: this.$route.params.id,
            category: this.$route.params.cId,
            article: [],
            categoryTitle: '',
            noDocument: { msg: 'There is not such document.', boolDoc: false }

        }
    },
    methods: {
        async deleteBlog() {
            await deleteDoc(doc(db, "articles", this.articleTitle));
            alert('Blog deleted!');
            router.push('/');
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
        },
        back() {
            router.go(-1)
        },
        fbShare() {
            window.open(`http://www.facebook.com/sharer.php?u=${this.currentRoute}&quote=${this.articleTitle}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false;
        },
        twitterShare() {
            window.open(`https://twitter.com/intent/tweet?text=${this.articleTitle}&url=${this.currentRoute}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false;
        },

        linkedinShare() {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${this.currentRoute}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false;
        },

        redditShare() {
            window.open(`https://www.reddit.com/submit?url=${this.currentRoute}`, 'sharer', 'toolbar=0,status=0,width=626,height=436'); return false;
        },

        async getArticle() {
            const articleTitle = this.articleTitle;
            const docRef = doc(db, "articles", articleTitle);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.article = docSnap.data();
                this.date = docSnap.data().articleDate;
                this.date = this.date.toDate();
            } else {
                this.noDocument.boolDoc = true
            }
        }
    },
    mounted() {
        this.getUser();
        this.getArticle();
    },
    computed: {
        webShareApiSupported() {
            return navigator.share
        }
    },
    head: {
        title: function () {
            return {
                inner: this.articleTitle,
            }
        }
    },


})
</script>
<style>
.back {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 900;
    color: rgb(16, 154, 246);
}

.noDocument {
    color: rgb(207, 207, 207);
}

.none {
    display: none;
}

.articleContainer {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 600;
    color: rgb(207, 207, 207);
}

.articleImg {
    border-radius: 40px;
    box-shadow: 10px 10px 30px 30px rgba(0, 0, 0, 0.2);
}

.articleCardd {
    background-color: rgb(66, 66, 66) !important;
    border-radius: 20px;
}

.profileImg {
    border-radius: 20px;
    box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.2);
}

.articleText {
    padding-top: 50px;
    padding-bottom: 10px;
    font-family: 'Pier Sans', sans-serif;
    font-size: 20px;
    color: rgb(207, 207, 207);
    line-height: 2;
}

.authorTitle {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 300;
    color: rgb(207, 207, 207);

}

.my-custom-paragraph {
    padding-top: 5px;
    padding-bottom: 5px;
}

.articleDate {
    font-family: 'Pier Sans', sans-serif;
    padding: 10px;
    font-size: 15px;
    color: rgb(71, 169, 255)
}

.iframe {
    top: 0;
    margin: auto;
    bottom: 0;
    display: flex;
    width: 80%;
    height: 400px;
    border-radius: 30px;
    padding-top: 7px;
    padding-bottom: 7px;
    border: none;
}

.my-custom-image {
    padding-top: 7px;
    padding-bottom: 7px;
    margin: auto;
    display: flex;
    width: 80%;
    height: auto;
    border-radius: 30px;
}

.shareText {
    color: rgb(212, 212, 212);
}

@media screen and (max-width: 700px) {
    .iframe {
        height: 100% !important;
    }
}
</style>

<template>
    <v-main>
        <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="6" class="text-center">
                <input background-color="light-blue darken-3" v-model="categoryTitle" @keyup.enter="getArticleCategories()"
                    placeholder="Search articles.." class="searchBar" rounded
                    />
            </v-col>
            <v-col cols="2" class="mt-1">
                <v-btn rounded color="transparent" elevation="0" @click="getArticleCategories()"><v-icon
                        color="light-blue lighten-1">mdi-magnify</v-icon></v-btn>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10" class="text-center">
                <h2 class="errorMsg">{{ searchMsgDisplay }}</h2>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row class="pt-5 justify-center" v-for="article in categoryArticles" :key="article.title">
            <v-col cols="10" md="6" lg="6" xl="6" sm="6" xxl="6">
                <v-card class="categoryCard cardImage" elevation="20" data-aos="flip-down" data-aos-duration="1000"
                    :to="{ params: { id: article.title, cId: article.articleCategory }, name: 'ArticlePage' }">
                    <v-row align="center" justify="center">
                        <v-col cols="12" md="12" lg="12" xl="4" sm="12" xxl="4"
                            class="pl-3 pl-lg-3 pl-xl-6 pl-xxl-6 pl-md-3 pl-sm-3">
                            <v-img :src="article.articleCoverPhoto" class="categoryImg"></v-img>
                        </v-col>
                        <v-col cols="12" md="9" lg="10" xl="6" sm="12" xxl="6">
                            <v-card-title class="text-h4 categoryTitle">{{ article.title }}</v-card-title>
                            <v-card-text class="categoryDescription">{{ article.shortDescription }}</v-card-text>
                            <v-card-text class="categoryDate">{{ article.articleDate.toDate() }}</v-card-text>
                        </v-col>
                        <v-col cols="4" md="3" lg="2" xl="2" sm="4" xxl="2">
                            <h2 class="categoryDate" style="color:rgb(71, 169, 255)">read<v-icon
                                    style="color:rgb(71, 169, 255)">mdi-arrow-right</v-icon></h2>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="pb-15 pt-15 justify-center">
            <template>
                <div class="text-center">
                    <v-btn v-if="buttonPrevious != 0" class="mr-5" rounded @click="previous()">Back</v-btn>
                    <v-btn v-if="this.categoryArticles != ''" color="blue lighten-1" dark rounded>{{ defaultPage }}</v-btn>
                    <v-btn v-if="this.buttonNext < this.lastButton && this.countArticles > 5" class="ml-5" rounded @click="next()">Next</v-btn>
                </div>
            </template>
        </v-row>
    </v-main>
</template>
<script>
import { collection, query, limit, getDocs, orderBy, startAfter, endBefore, limitToLast, getCountFromServer, where } from "firebase/firestore";
import { db } from "@/main";
import router from "@/router";

export default {
    props: ["title", "content"],
    data() {
        return {
            loadingMsg: {msg: "Loading...", msgBool: true},
            errorMsg: {msg: "There are no articles in this category :("},
            categoryTitle: "",
            categoryArticles: [],
            errorMsgg: false,
            lastVisible: '',
            firstVisible: '',
            buttonPrevious: 0,
            buttonNext: 0,
            nextButton: false,
            countArticles: null,
            defaultPage: 1,
            pages: null,
            lastButton: null,
            searchMsgDisplay: null
        }
    },
    methods: {
        searchMsg() {
            if (this.categoryArticles.length === 0) {
                this.searchMsgDisplay = "Sorry, there are no articles matching your search :("
            }
            else {
                this.searchMsgDisplay = null
            }
        },
        back() {
            router.go(-1)
        },
        async getCount() {
            const title = this.categoryTitle;
            const coll = query(collection(db, "articles"), where("tags", "array-contains", title.toLowerCase()), orderBy("articleDate", "desc"));
            const snapshot = await getCountFromServer(coll);
            this.countArticles = snapshot.data().count;
            const totalPages = this.countArticles / 5;
            if (Number.isInteger(totalPages) === true) {
                this.pages = totalPages;
                this.lastButton = totalPages - 1;
            }
            else {
                this.pages = Math.round(totalPages) + 1;
                this.lastButton = totalPages - 1;
            }

        },
        async getArticleCategories() {
            this.categoryArticles = [];
            const title = this.categoryTitle;
            const first = query(collection(db, "articles"), where("tags", "array-contains", title.toLowerCase()),  orderBy("articleDate", "desc"), limit(5));
            const documentSnapshots = await getDocs(first);
                documentSnapshots.forEach((doc) => {
                this.categoryArticles.push(doc.data())
                this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                this.firstVisible = documentSnapshots.docs[0];
            });
            this.getCount();
            this.searchMsg();
            this.loadingMsg.msgBool = false;
        },
        async previous() {
            this.loadingMsg.msgBool = true;
            this.categoryArticles = []
            const title = this.categoryTitle;
            const previous = query(collection(db, "articles"),
            where("tags", "array-contains", title.toLowerCase()),
                orderBy("articleDate", "desc"),
                endBefore(this.firstVisible),
                limitToLast(5));
            const documentSnapshots = await getDocs(previous);
            documentSnapshots.forEach((doc) => {
                this.categoryArticles.push(doc.data());
                this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                this.firstVisible = documentSnapshots.docs[0];
            });
            this.buttonNext -= 1;
            this.buttonPrevious -= 1;
            this.defaultPage -= 1;
            this.loadingMsg.msgBool = false;

        },
        async next() {
            this.loadingMsg.msgBool = true;
            this.categoryArticles = [];
            const title = this.categoryTitle;
            const next = query(collection(db, "articles"),
            where("tags", "array-contains", title.toLowerCase()),
                orderBy("articleDate", "desc"),
                startAfter(this.lastVisible),
                limit(5));
            const documentSnapshots = await getDocs(next);
            documentSnapshots.forEach((doc) => {
                this.categoryArticles.push(doc.data())
                this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                this.firstVisible = documentSnapshots.docs[0];
            });
            this.buttonNext += 1;
            this.buttonPrevious += 1;
            this.defaultPage += 1;
            this.loadingMsg.msgBool = false;
        },
        errorMsgTitle() {
            if (this.categoryArticles.length == 0) {
                this.errorMsgg = true
            }
            else {
                this.errorMsgg = false
            }
        }
    },
    mounted() {
        this.errorMsgTitle();
    }
}
</script>
<style scoped>
.cardImage {
    transition: 0.5s ease-in-out;
}

.cardImage:hover {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
}

.categoryCard {
    background-color: rgb(66, 66, 66);
    border-radius: 20px;
    border: 2px solid rgba(0, 136, 255, 0.267);
}

.categoryImg {
    border-radius: 20px;
    box-shadow: 10px 10px 10px 1px rgba(0, 0, 0, 0.05);
}

.categoryTitle {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 700;
    color: rgb(207, 207, 207);

}

.categoryDescription {
    font-family: 'Pier Sans', sans-serif;
    font-weight: 300;
    color: rgb(207, 207, 207);
}

.categoryDate {
    font-family: 'Pier Sans', sans-serif;
    color: rgb(71, 169, 255)
}

.searchBar {
    text-align: center;
    border: 2px solid rgb(16, 154, 246);
    box-shadow: 0 0 3px #1670BE;
    border-radius: 20px;
    width: 100%;
    height: 40px;
    color: white

}
input:focus, textarea:focus
{
    border: 1px solid #1670BE;
    box-shadow: 0 0 10px #1670BE;
    outline-offset: 0px;
    outline: none;
    color: white
}
::placeholder {
  color: rgb(255, 255, 255);
  opacity: 0.7; 
}
.errorMsg {
    color: rgb(207, 207, 207);
}

@media only screen and (min-width: 300px) {}</style>
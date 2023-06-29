<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4"></v-col>
            <v-col cols="4">
                <v-form fast-fail @submit.prevent>
                    <v-text-field v-model="email" label="Email" dark></v-text-field>

                    <v-text-field v-model="password" label="Password" dark></v-text-field>

                    <v-btn color="blue lighten-1" type="submit" block class="mt-2" @click="signIn()">Sign in</v-btn>
                </v-form>
            </v-col>
            <v-col cols="4"></v-col>
        </v-row>
    </v-container>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";
export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
            user: null
        }
    },
    methods: {
        signIn() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    this.user = userCredential.user;
                    router.push('/upload')
                })
                .catch(() => {
                    alert('Wrong email or password! Please try again!')
                });
        }
    }
}
</script>
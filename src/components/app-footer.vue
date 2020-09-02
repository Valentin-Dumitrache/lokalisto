<template>
    <v-col class="text-center mt-12">
        <a href="https://www.facebook.com/Lokalisto-103646754730411/?modal=admin_todo_tour" class="text-decoration-none"><v-icon class="mr-3 icon">mdi-facebook</v-icon></a>
        <a href="https://www.instagram.com/lokalisto_dk/?hl=da" class="text-decoration-none"><v-icon class="icon">mdi-instagram</v-icon></a>
        <h3 class="mt-md-8 mt-4 enlarge" v-on:click="this.showAboutUs">Om os</h3>
        <h3 class="enlarge" v-on:click="this.showContactUs">Kontakt os</h3>
        <router-link :to="{name: 'formerCampaigns'}" tag="div" class="d-table mx-auto">
        <h3 class="enlarge">Se forrige kampagner</h3>
        </router-link>
        <router-link :to="{name: 'terms'}" tag="div" class="d-table mx-auto">
        <h3 class="enlarge" >Vilkår og betingelser</h3>
        </router-link>
        <modal name="aboutUs" height="auto" width="75%">
            <v-container>
            <h3 class="pt-5 pt-md-12">Om Lokalisto</h3>
            <p class="pa-3 pa-md-10">Hos Lokalisto drømmer vi om, at gøre det nemt for alle at få gode, lokale madoplevelser. Storbyerne er fyldt med madsteder, men forstaden har lige så mange skjulte skatte, som vi gerne vil dele med dig. Vi vil i samarbejde med lokale madsteder vise dig, hvad forstaden og den lokale på hjørnet har at tilbyde med unikke kampagner og tilbud. Vi udvælger alt fra restauranter, cafeer til bazarer og slagtere, som vi synes fortjener ekstra opmærksomhed.
                Så kære Lokalist, kom og oplev de lokale steder med os!
            </p>
            </v-container>
        </modal>
        <modal name="contactUs" height="auto" width="75%">
            <v-container>
                <h3 class="pt-5 pt-md-12">Kontakt os</h3>
                <p class="pa-3 pa-md-10">Vi vil så gerne høre fra dig og tager imod store som små spørgsmål! Har du spørgsmål til værdibeviset eller er ejer af et lokalt madsted, som vi skal tjekke ud, så send os endelig en mail. Du kan også fange os på Facebook og Instagram.
                </p>
                <div class="inputContainer mx-auto">
                    <v-text-field label="Navn" color="black" class="input mx-auto" v-model="email"/>
                    <v-text-field label="Email" color="black" class="input mx-auto" v-model="email"/>
                    <v-textarea outlined label="Skriv din besked her ..." color="black" v-model="message" :persistent-hint="true" :hint="error"/>
                </div>
                <v-btn outlined rounded color="#DBB658" class="mx-auto d-table mb-3 mt-4" v-on:click="sendEmail">Send</v-btn>
            </v-container>
        </modal>
        <modal name="confirmation" height="auto" width="20%">
            <h2 class="d-table mx-auto pa-5">Sent</h2>
        </modal>
    </v-col>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import axios from 'axios';

    export default {
        data () {
            return {
                name: "",
                email: "",
                message: "",
                error: ""
            }
        },
        methods: {
            showAboutUs () {
                this.$modal.show('aboutUs');
            },
            showContactUs () {
                this.$modal.show('contactUs');
            },
            sendEmail() {
                const axios = require('axios').default;
                if(this.email !== "" && this.message !== "" && this.name) {
                    axios.post(
                        'https://coupons-8778.restdb.io/mail',
                        {
                            to: 'kontakt@lokalisto.dk',
                            subject: 'Lokalisto Contact',
                            html:
                                'Email: ' + this.email + '<br>' +
                                'Name: ' + this.name + '<br><br>' +
                                this.message
                        },
                        {
                            headers: {
                                'content-type': 'application/json',
                                'x-apikey': '5f01bca0a529a1752c476d9b',
                                'cache-control': 'no-cache'
                            }
                        }
                    )
                        .then(function(response) {
                            console.log(response)

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    this.error = "";
                    this.email = "";
                    this.message = "";
                    this.$modal.hide('contactUs');
                    this.$modal.show('confirmation');
                    setTimeout(() => {this.$modal.hide('confirmation')}, 2000)
                } else {
                    this.error = "Please fill in everything."
                }
                console.log(this)
            }
        }
    }
</script>
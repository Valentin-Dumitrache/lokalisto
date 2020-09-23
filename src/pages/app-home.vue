<template>
    <v-progress-circular
            v-if="loading"
            indeterminate
            class="spinner"
            :size="50"
            color="info"
    />

    <div v-else class="contentContainer mx-auto">
        <router-link :to="{name: 'campaign', params: { id: campaigns[0].id }}" tag="div" class="pointer routerLink" >
            <v-img :src="campaigns[0].mainPicture" class="img">
                <v-chip
                        label
                        class="mx-auto elevation-4 d-table mt-12 whiteOverlay pointer"
                        color="rgb(255, 255, 255, 0.7)"
                ><h2 class="pointer">{{campaigns[0].name}}</h2></v-chip>
            </v-img>
        </router-link>
        <div class="filler">
            <h2 class="text-center">Din vej til<br>lokale madoplevelser</h2>
        </div>
        <video class="video" controls poster="https://www.lokalisto.dk/poster.png">
            <source src="https://www.lokalisto.dk/LokalistoFinal.mp4" type="video/mp4">
        </video>
        <div class="emailContainer d-inline-flex justify-center align-center">
            <div class="text-center">
                <h2>{{subscribeText}}</h2>
                <v-text-field label="Email" color="black" class="input mx-auto" :style="`display: ${display}`" v-model="email"/>
                <v-btn outlined rounded color="#DBB658" :style="`display: ${display}`" @click="subscribe">Tilmeld</v-btn>
            </div>
        </div>
        <app-footer/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import AppFooter from "../components/app-footer";
    // eslint-disable-next-line no-unused-vars
    import axios from 'axios';

    export default {
        components: {AppFooter},
        data() {
          return {
            display: "initial",
            email: "",
            subscribeText: "Vores nyheder, din indbakke"
          }
        },
        computed: {
            ...mapGetters(['campaigns', 'loading']),
        },
        async beforeMount() {
            await this.getMainCampaign();
        },
        methods: {
            ...mapActions(['getMainCampaign']),
            subscribe() {
              if(this.email !== "") {
                this.display = "none";
                this.subscribeText = "Tak, fordi du abonnerer";
                axios.post(
                  `https://coupons-8778.restdb.io/rest/emails`,
                  {
                    "entry": this.email
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'x-apikey': '5f01bca0a529a1752c476d9b'
                    }
                  }
                );
              } else {
                this.subscribeText = "Udfyld e-mail";
              }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contentContainer {
        width: 90vw;
        @media screen and (min-width: 1025px) {
            width: 70vw;
            padding: 0 !important;
        }
        padding: 0 11px !important;
        position: relative;
    }
    .filler {
        width: calc(50% - 3px);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        float: right;
        background-color: #DBB658;
        height: 40vh;
        @media screen and (max-width: 1025px) {
            display: none;
        }
        border-radius: 0 16px 0 0 !important;
    }
    #app .filler h2 {
        color: #F3F3F3 !important;
    }

    .img {
        height: 40vh;
        width: calc(100% + 3px);
        @media screen and (min-width: 1025px) {
            border-radius: 16px 0 0 0 !important;;
        }
        border-radius: 16px 16px 0 0 !important;

    }
    .routerLink {
        @media screen and (min-width: 1025px) {
            width: 50%;
            display: inline-block;
            float: left;
            border-radius: 16px 0 0 0 !important;
        }
        border-radius: 16px 16px 0 0 !important;
    }
    .video {
        @media screen and (min-width: 1025px) {
            width: 50% !important;
            margin-bottom: 0;
            border-radius: 0 0 0 16px !important;
        }
        width: 100%;
        height: 40vh;
        margin-top: 3px;
        display: inline-block;
        object-fit: cover !important;
        &:focus {
            outline: 0;
        }
    }
    .emailContainer {
        width: 100%;
        height: calc(40vh + 3px);
        border: 1px solid #cfcdcf;
        @media screen and (min-width: 1025px) {
            width: 50%;
            margin-top: 0;
            position: absolute;
            border-radius: 0 0 16px 0 !important;
            border-left: 0;
            border-top: 0;
        }
        margin-top: -7px;
        border-radius: 0 0 16px 16px !important;
        border-top:0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .input {
        width: 130px;
        @media screen and (min-width: 1025px) {
            width: 200px;
        }
    }
</style>
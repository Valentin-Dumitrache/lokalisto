<template>
    <v-container class="successContainer">
    <h2 class="d-block text-center">Kære Lokalist. Tak for dit køb. <br/> Du vil nu modtage en mail med kvittering og værdibevis. Du finder også værdibeviset under din side - se værdibevis.</h2>
    <h2 style="text-align: center;"><br/> <br/> Dette er din kode, præsentere det venligst for personalet</h2>
    <h2 style="text-align: center;"><strong>{{couponCode}}</strong></h2>
    <strong>{{this.$store.getters.campaignName}}</strong>
    <p v-html="this.$store.getters.content.split('</p>')[1]"/>
    <p v-html="this.$store.getters.content.split('</p>')[0]"/>
    <p>Gyldig Til {{endDate}}</p>
    </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapActions } from 'vuex';

  export default {
        async beforeMount() {
          // eslint-disable-next-line no-unused-vars
          let { data } = await axios.put(
            'https://coupons-8778.restdb.io/rest/coupons/' + this.$route.params.id,
            {
              "status":"Ubrugt"
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-apikey': '5f01bca0a529a1752c476d9b'
              }}
          );
          await this.getCampaign({ id: data.campaign });
          this.couponCode = data.code;
          this.endDate = data.endDate;
          setTimeout( () => { axios.post(
            'https://coupons-8778.restdb.io/mail',
            {
              to: this.$auth.user.email,
              subject: 'Dit Værdibevis',

              html:
                `
                    <h2 style="text-align: center;">Kære Lokalist. Tak for dit køb. <br/> Du vil nu modtage en mail med kvittering og værdibevis. Du finder også værdibeviset under din side - se værdibevis.</h2>
                    <h2 style="text-align: center;"><br /><br />Dette er din kode, præsentere det venligst for personalet</h2>
                    <p>&nbsp;</p>
                    <h1 style="text-align: center;"><strong>${data.code}</strong></h1>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <strong>${this.$store.getters.campaignName} </strong>
                    <p>${this.$store.getters.content.split('</p>')[1]} </p>
                    <p>${this.$store.getters.content.split('</p>')[0]} </p>
                    <p>Gyldig Til ${data.endDate}</p>
                    <p style="text-align: center;"><img src="https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-9/118457634_157914299303656_1631997938248236448_n.png?_nc_cat=103&_nc_sid=6e5ad9&_nc_ohc=yqtHpNKIYQIAX8KR3iv&_nc_ht=scontent.fotp3-3.fna&oh=84e91f5b3997e3f4ad6c33e16ab4fece&oe=5F7E5CE0" alt="" width="295" height="112" /></p>
                    <p style="text-align: center;">kontakt@lokalisto.dk</p>`,
              company: "Lokalisto",
              sendername: "Lokalisto"
            },
            {
              headers: {
                'content-type': 'application/json',
                'x-apikey': '5f01bca0a529a1752c476d9b',
                'cache-control': 'no-cache'
              }
            }
          )}, 4000)
        },
    data () {
      return {
        couponCode: "",
        endDate: ""
      }
    },
    methods: {
      ...mapActions(['getCampaign'])
    }
  }
</script>

<style>
    .successContainer {
        width:75vw;
    }
</style>
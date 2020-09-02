<template>
    <v-container>
    <h2 class="d-block text-center">Kære Lokalist. Tak for dit køb.<br>Vi har sendt en mail til dig med yderligere instruktioner.</h2>
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
              "status":"Unused"
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-apikey': '5f01bca0a529a1752c476d9b'
              }}
          );
          await this.getCampaign({ id: data.campaign })
          setTimeout( () => { axios.post(
            'https://coupons-8778.restdb.io/mail',
            {
              to: this.$auth.user.email,
              subject: 'Din Kupon',

              html:
                `<h2 style="text-align: center;">Tillykke med dit værdibevis! <br /><br />Dette er din kode, præsentere det venligst for personalet</h2>
                    <p>&nbsp;</p>
                    <h1 style="text-align: center;"><strong>${data.code}</strong></h1>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <strong>${this.$store.getters.campaignName} </strong>
                    <p>${this.$store.getters.content.split('</p>')[1]} </p>
                    <p>${this.$store.getters.content.split('</p>')[0]} </p>
                    <p>Gyldig Til ${data.endDate}</p>
                    <p style="text-align: center;"><img src="https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-9/109919293_137051581389928_5735348757692025498_n.png?_nc_cat=103&amp;_nc_sid=dd9801&amp;_nc_ohc=0NzMXpWa504AX9gI4w_&amp;_nc_ht=scontent.fotp3-3.fna&amp;oh=58cf6e1d678b88249b49d69703dfde3c&amp;oe=5F5BAC1C" alt="" width="295" height="112" /></p>
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
          )}, 10000)
        },
    methods: {
      ...mapActions(['getCampaign'])
    }
  }
</script>
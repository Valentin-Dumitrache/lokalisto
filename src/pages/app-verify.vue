<template>
    <v-container class="text-center container">
        <h2 class="mt-2 mb-12">{{conclusion}}</h2>
        <h2>Indløs værdibevis</h2>
        <v-text-field label="...kode" color="black" class="input mx-auto" v-model="coupon"/>
        <v-btn outlined rounded color="#DBB658" @click="verify">Indløs</v-btn>
    </v-container>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import axios from 'axios';
  const dates = {
    convert:function(d) {
      return (
        d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
              d.constructor === String ? new Date(d) :
                typeof d === "object" ? new Date(d.year,d.month,d.date) :
                  NaN
      );
    },
    compare:function(a,b) {
      return (
        isFinite(a=this.convert(a).valueOf()) &&
        isFinite(b=this.convert(b).valueOf()) ?
          (a>b)-(a<b) :
          NaN
      );
    },
  };
  export default {
    data () {
      return {
        conclusion: "",
        coupon: "",
        today: new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear()
      }
    },
    methods: {
      async verify() {
        if (this.coupon.length !== 6) {
          this.changeConclusion("Ugyldig kode")
        } else {
          // eslint-disable-next-line no-unused-vars
          const { data } = await axios.get(
            `https://coupons-8778.restdb.io/rest/coupons?q={"code": "${this.coupon.toUpperCase()}"}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'x-apikey': '5f01bca0a529a1752c476d9b'
              }
            }
          );
            if (data[0].status === "Ubrugt") {
              if(dates.compare(data[0].endDate, this.today ) === 1) {
                this.changeConclusion("Værdibeviset er gyldig! Og er blevet indløst");
                axios.put(
                  'https://coupons-8778.restdb.io/rest/coupons/' + data[0]._id,
                    {
                      "status":"Indløst"
                    },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'x-apikey': '5f01bca0a529a1752c476d9b'
                    }}
                )
              } else {
                this.changeConclusion("Værdibeviset er udløbet");
            }
            } else {
              this.changeConclusion("Værdibeviset er allerede blevet brugt");
            }
        }
      },
      changeConclusion(string) {
        this.conclusion = string
      }
    }
  };
</script>

<style lang="scss" scoped>
    .container {
        @media screen and (min-width: 600px) {
            width: 30vw;
        }
        width: 90vw;
    }
</style>
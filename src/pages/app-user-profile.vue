<template>
    <v-progress-circular
            v-if="$store.getters.loading"
            indeterminate
            class="spinner"
            :size="50"
            color="info"
    />
    <div v-else>
        <div class="tableContainer mx-auto">
            <h2 class="name mx-auto">Navn</h2>
            <h2 class="code mx-auto">Kode</h2>
            <h2 class="status mx-auto">Status</h2>
            <h2 class="date mx-auto">Dato</h2>
            <div class="line"/>
        </div>
        <div class="tableContainer mx-auto" v-for="coupon in coupons" v-bind:key="coupon.id">
            <router-link tag="div" class="d-table text-center pointer text-decoration-underline" :to="{path: `campaign/${coupon.id}`}"><h3 class="name mx-auto">{{coupon.name}}</h3></router-link>
            <h3 class="code mx-auto">{{coupon.code}}</h3>
            <h3 class="status mx-auto">{{coupon.status}}</h3>
            <h3 class="date mx-auto">{{coupon.date}}</h3>
        </div>
        <h2 v-if="isEmpty" class="mx-auto mt-3 d-table">Ingen værdibeviser købt.</h2>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
    computed: {
        ...mapGetters(['coupons']),
      isEmpty() {
          return this.$store.getters.coupons.length === 0;
      }
    },
    methods: {
      ...mapActions(['getCoupons'])
    },
    mounted() {
      this.getCoupons( {owner: this.$auth.user.email} );
    }
    }
</script>

<style scoped>
    .name {
        grid-area: name-row;
    }
    .code {
        grid-area: code-row;
    }
    .status {
        grid-area: status-row;
    }
    .date {
        grid-area: date-row;
    }
    .line {
        grid-area: line;
        height: 1px;
        background-color: rgba(186,186,186,0.62);
    }
    .tableContainer {
        display: grid;
        grid-template-columns: 22.5vw 22.5vw 22.5vw 22.5vw;
        grid-template-rows: auto;
        grid-template-areas:
                "name-row code-row status-row date-row"
                "line line line line";
        justify-content: center;
        align-items:  center;
    }
</style>
<template>
    <v-progress-circular
            v-if="loading"
            indeterminate
            class="spinner"
            :size="50"
            color="info"
    />
    <div v-else class="contentContainer mx-auto" >
<!--        <router-link v-for="campaign in campaigns" :key="campaign.id" :to="{name: 'campaign', params: { id: campaign.id }}" tag="div" class="pointer" >-->
<!--            <v-img :src="campaign.mainPicture" class="img">-->
<!--                <v-chip-->
<!--                        label-->
<!--                        class="mx-auto elevation-4 d-table mt-12 whiteOverlay pointer"-->
<!--                        color="rgb(255, 255, 255, 0.7)"-->
<!--                ><h2 class="pointer">{{campaign.name}}</h2></v-chip>-->
<!--            </v-img>-->
<!--        </router-link>-->
        <h2 class="d-table mx-auto mb-12">Ingen tidligere kampagner</h2>
<!--        <app-footer/>-->
    </div>

</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    // import AppFooter from "../components/app-footer";

    export default {
        // components: {AppFooter},
        computed: {
            ...mapGetters(['campaigns', 'loading'])
        },
        async beforeMount() {
            await this.getCampaigns();
        },
        methods: {
            ...mapActions(['getCampaigns'])
        }
    }
</script>

<style lang="scss" scoped>
    .contentContainer {
        width: 90vw;
        @media screen and (min-width: 600px) {
            width: 70vw;
            padding: 0 !important;
        }
        padding: 0 11px !important;
        position: relative;
        min-height: 50vh;
    }
    .img {
        height: 50vh;
    }
</style>
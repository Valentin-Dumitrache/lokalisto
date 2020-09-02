<template>
    <v-app-bar v-if="!this.$auth.loading" class="ma-4 d-flex align-center" flat app color="white" absolute>
        <router-link :to="{name: 'home'}" class="logoContainer pointer" tag="div">
            <Logo class="logo pointer"/>
        </router-link>
        <i v-if="!this.$auth.isAuthenticated" @click="login" class="pointer icon fas fa-user" v-on="on"/>
        <v-menu offset-y open-on-hover close-delay="500" bottom nudge-top="-15px" v-else>
            <template v-slot:activator="{on}">
                <i class="pointer icon fas fa-user" v-on="on"/>
            </template>
            <v-list class="menu-aim" >
                <v-list-item v-if="userVerify"><router-link :to="{name: 'verify'}" tag="div"><v-list-item-title class="pointer enlarge px-2 px-sm-4 text-sm-h6">Indløs værdibevis </v-list-item-title></router-link></v-list-item>
                <v-list-item v-else><router-link :to="{name: 'coupons'}" tag="div"><v-list-item-title class="pointer enlarge px-2 px-sm-4 text-sm-h6">Se værdibevis</v-list-item-title></router-link></v-list-item>
                <v-list-item><v-list-item-title class="pointer enlarge px-2 px-sm-4 text-sm-h6" @click="logout">Log ud</v-list-item-title></v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import Logo from "./logo.svg";

    export default {
        components: {Logo},
        methods: {
            // Log the user in
            login() {
                this.$auth.loginWithRedirect();
            },
            // Log the user out
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                });
            }
        },
        computed: {
            userVerify() {
                if(this.$auth.isAuthenticated) {
                    return this.$auth.user.email.slice(this.$auth.user.email.indexOf("@")) === "@lokalisto.com";
                }
                return false
            }
        }
    }
</script>

<style lang="scss">
    .enlarge {
        &:hover {
            -webkit-transform: scale(1.15);
            transition: all 0.2s;
            font-weight: bold !important;
        }
    }
    .logo, .logoContainer {
        height: 100%;
    }
    .cls-1{
        fill:#dbb658;
    }
    .v-toolbar__content {
        justify-content: space-between;
        width: 90vw;
        margin:auto !important;
        @media screen and (min-width: 600px) {
            width: 70vw;
            padding: 0 !important;
        }
        align-items: center;
    }

</style>
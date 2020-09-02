<template>
  <v-app>
    <app-header/>
    <transition
        name="fade"
        mode="out-in"
    >
    <router-view class="router_view"/>
    </transition>
  </v-app>
</template>
<script>
  import AppHeader from '@/components/app-header';


  export default {
    components: {AppHeader},
    metaInfo() {
      return {
        meta: [
          {property: 'og:type', content: 'website'},
          {property: 'og:image', content: 'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-9/110174116_137051711389915_7170439059589378204_n.png?_nc_cat=108&_nc_sid=85a577&_nc_ohc=ltpN-Yiby0sAX_idAhs&_nc_ht=scontent.fotp3-3.fna&oh=34013f9112452fb8be0dc44f889ade60&oe=5F38060A'},
        ]
      }
    }
  }
</script>
<style lang="scss">
  #app {
    p, h1, h2, h3, div {
      font-family: 'Noah', sans-serif !important;
    }
    h1, h3, .icon, .pointer {
      cursor: pointer;
    }
    h1, h2, h3, .h3, .icon {
      font-weight: bold;
      color: black !important;
    }
    h1, .icon {
      font-size: calc(25px + 0.5vw);
    }
    h2 {
      font-size: calc(20px + 0.5vw);
      padding: 0.5vw;
    }
    h3 {
      font-size: calc(15px + 0.35vw);
      padding-bottom: 1.5vw;
      text-decoration: none;
      display: table;
      margin: auto;
    }
    p {
      font-size: calc(15px + 0.30vw);
    }
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    .router_view {
      margin-top: 75px;
      @media screen and (min-width: 600px) {
        margin-top: 120px;
      }
    }
    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -25px 0 0 -25px;
    }
    .whiteOverlay {
      padding: 5px 6px !important;
      border-radius: 11px !important;
    }
    .inputContainer {
      width: calc(100px + 20vw);
    }
    .fade-enter-active,
    .fade-leave-active {
      transition-duration: 0.3s;
      transition-property: opacity;
      transition-timing-function: ease;
    }
    .fade-enter,
    .fade-leave-active {
      opacity: 0
    }
  }
</style>
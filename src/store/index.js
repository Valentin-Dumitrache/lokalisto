import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const hostPath = 'https://lokalisto.dk/wordpress/?rest_route=/wp/v2/campaign';
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
Vue.use(Vuex);

function createImageArray() {
  return Array.from(arguments).filter(Boolean)
}

function verifyActive(data) {
  let dateVerification = true;
  let couponsAvailableVerification = true;
  if (data.end_date !== "") {
    let newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    dateVerification = dates.compare(newDate, new Date(data.end_date)) === -1
  }
  if (data.coupons_available !== "") {
    couponsAvailableVerification = data.coupons_available - data.coupons > 0
  }
  return (dateVerification && couponsAvailableVerification)
}

export default new Vuex.Store({
  state: {
    loading: false,
    campaign: {
      id: null,
      name: null,
      content: null,
      facebookLink: null,
      instagramLink: null,
      websiteLink: null,
      price: null,
      olderPrice: null,
      endDate: null,
      couponsEndDate: null,
      couponsAvailable: null,
      writerName: null,
      writerPicture: null,
      mainPicture: null,
      couponsSold: null,
      stripeId: null,
      allPictures: [],
      active: false
    },
    campaigns: [],
    coupons: []
  },
  getters: {
    loading: state => state.loading,
    id: state => state.campaign.id,
    active: state => state.campaign.active,
    campaignName: state => state.campaign.name,
    content: state => state.campaign.content,
    facebookLink: state => state.campaign.facebookLink,
    instagramLink: state => state.campaign.instagramLink,
    websiteLink: state => state.campaign.websiteLink,
    price: state => state.campaign.price,
    olderPrice: state => state.campaign.olderPrice,
    endDate: state => state.campaign.endDate,
    couponsEndDate: state => state.campaign.couponsEndDate,
    couponsAvailable: state => state.campaign.couponsAvailable,
    couponsSold: state => state.campaign.couponsSold,
    stripeId: state => state.campaign.stripeId,
    writerName: state => state.campaign.writerName,
    writerPicture: state => state.campaign.writerPicture,
    mainPicture: state => state.campaign.mainPicture,
    allPictures: state => state.campaign.allPictures,
    campaigns: state => state.campaigns,
    coupons: state => state.coupons
  },
  mutations: {
    beforeGet(state) {
      state.loading = true
    },
    successGetCampaign(state, data) {
      state.campaign.id = data.id;
      state.campaign.name = data.title.rendered;
      state.campaign.content = data.content.rendered;
      state.campaign.facebookLink = data.facebook_link;
      state.campaign.instagramLink = data.instagram_link;
      state.campaign.websiteLink = data.website_link;
      state.campaign.price = data.price;
      state.campaign.olderPrice = data.older_price;
      state.campaign.endDate = data.end_date;
      state.campaign.couponsEndDate = data.coupons_end_date;
      if(data.coupons_available !== "") {
        state.campaign.couponsAvailable = data.coupons_available - data.coupons;
      } else {
        state.campaign.couponsAvailable = data.coupons_available;
      }
      if(data.coupons_sold === "1") {
        state.campaign.couponsSold = data.coupons
      } else {
        state.campaign.couponsSold = null;
      }
      state.campaign.stripeId = data.stripe_id;
      state.campaign.writerName = data.writer_name;
      state.campaign.writerPicture = data.writer_picture.guid;
      state.campaign.mainPicture = data.main_picture.guid;
      state.campaign.allPictures = createImageArray(
          data.secondary_picture_1.guid,
          data.secondary_picture_2.guid,
          data.secondary_picture_3.guid,
          data.secondary_picture_4.guid,
          data.secondary_picture_5.guid);
      state.loading = false;
      state.campaign.active = verifyActive(data)
    },
    successGetCampaigns(state, data) {
      state.campaigns = [];
      data.forEach(element => {
        state.campaigns.push({id: element.id, name: element.title.rendered, mainPicture: element.main_picture.guid})
      });
      state.loading = false;
    },
    successGetCoupons(state, data) {
      state.coupons = [];
      data.forEach(element => {
        if(element.status !== "Inactive") {
          state.coupons.push({name: element.name, code: element.code, status: element.status, date: element.endDate, id: element.campaign})
        }
      });
      state.loading = false;
    }
},
  actions: {
    async getMainCampaign({ commit }) {
      commit('beforeGet');
      try {
        const { data } = await axios.get(hostPath);
        commit('successGetCampaigns', [data[0]]);
      } catch (err) {
        // TO-DO error catcher
      }
    },
    async getCampaign({ commit }, { id }) {
      commit('beforeGet');
      try {
        const { data } = await axios.get(`${hostPath}/${id}`);
        const coupons = await axios.get(
          `https://coupons-8778.restdb.io/rest/coupons?q={"campaign": "${data.id}"}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': '5f01bca0a529a1752c476d9b'
            }
          }
        );
        data.coupons = coupons.data.length;
        commit('successGetCampaign', data);
      } catch (err) {
        // TO-DO error catcher
      }
    },
    async getCampaigns({ commit }) {
      commit('beforeGet');
      try {
        const { data } = await axios.get(hostPath);
        commit('successGetCampaigns', data.slice(1));
      } catch (err) {
        // TO-DO error catcher
      }
    },
    async getCoupons ({commit}, {owner}) {
      commit('beforeGet');
      try {
        const axios = require('axios').default;
        axios.get(
          `https://coupons-8778.restdb.io/rest/coupons?q={"owner": "${owner}"}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': '5f01bca0a529a1752c476d9b'
            },
          }
        ).then(function(response) {
          commit('successGetCoupons', response.data);
        }).catch(function (error) {
          console.log(error);
        });
      } catch (err) {
        // TO-DO error catcher
      }
    }
  }
})

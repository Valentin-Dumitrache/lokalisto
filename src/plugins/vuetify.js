import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#DBB658',
                secondary: '#D93D3D',
                accent: '#F3F3F3',
                error: '#FF5252',
                info: '#000',
                success: '#FFF',
                warning: '#FFC107'
            }
        }
    }
});

import Vue from 'vue';
import Icon from 'vue2-svg-icon/Icon.vue';
import '../statics/styles/global.less'
Vue.component('icon', Icon);
import app from './app.vue';

new Vue({
    render: (h) => h(app)
}).$mount('#root');
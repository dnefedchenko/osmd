'use strict';

Vue.component('osmd-app-component', {
    template: '<p v-if="isAuthenticated">Login form goes here!</p>',
    data: function () {
        return {
            isAuthenticated: true
        }
    }
});

var appComponent = new Vue({
    el: '#visitorsApp'
});
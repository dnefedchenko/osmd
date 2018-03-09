'use strict';

var data = {
    isAuthenticated: false
};

Vue.component('osmd-app-component', {
    template: '<p v-if="isAuthenticated">Login form goes here!</p>',
    data: function () {
        return data;
    }
});

var appComponent = new Vue({
    el: '#visitorsApp',
    created: function() {
        var promise = $.get('/users/me', function(response) {
            console.log(response);
        });

        promise.fail(function (error) {
            if (error.status === 401) {
                data.isAuthenticated = false;
            } else {
                data.isAuthenticated = true;
            }
        });
    }
});
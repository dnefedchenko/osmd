'use strict';

var data = {
    isAuthenticated: false
};

Vue.component('osmd-app-component', {
    template: '<div>' +
                '<p v-if="isAuthenticated">Protected content goes here</p>' +

                '<form v-if="!isAuthenticated">' +
                    '<div>' +
                        '<input type="text" id="username">' +
                        '<label for="username">Username</label>' +
                    '</div>' +
                '</form>' +
              '</div>',
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
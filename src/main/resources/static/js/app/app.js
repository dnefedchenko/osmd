'use strict';

Vue.component('osmd-app-component', {
    template: '<div>' +
                '<form v-if="!isAuthenticated">' +
                    '<div>' +
                        '<label for="username">Username:&nbsp;</label>' +
                        '<input type="text" id="username" v-model="username">' +
                    '</div>' +

                    '<div>' +
                        '<label for="password">Password:&nbsp;</label>' +
                        '<input type="password" id="password" v-model="password">' +
                    '</div>' +

                    '<button type="button" v-on:click="doLogin">Sign In</button>' +
                '</form>' +

                '<p v-if="isAuthenticated">Protected content goes here</p>' +
              '</div>',
    data: function () {
        return {
            isAuthenticated: false,
            username: '',
            password: ''
        };
    },
    created: function () {
        var that = this;

        var promise = $.get('/users/me', function(response) {
            console.log(response);
            that.isAuthenticated = true;
        });

        promise.fail(function (error) {
            that.isAuthenticated = error.status !== 401;
        });
    },
    methods: {
        doLogin: function () {
            var that = this;
            var formData = 'username='+this.username+'&password='+this.password;
            var loginPromise = $.post('/auth/login', formData, function (response) {
                that.isAuthenticated = true;
                console.log(response);
            });

            loginPromise.fail(function (error) {
                this.isAuthenticated = false;
            });
        }
    }
});

var vm = new Vue({
    el: '#visitorsApp'
});
'use strict';

Vue.component('osmd-app-component', {
    template: '<div>' +
                '<form v-if="!isAuthenticated">' +
                    '<md-card class="md-layout-item md-size-50 md-small-size-100">' +
                        '<md-card-header>' +
                            '<div class="md-title">Sign In</div>' +
                        '</md-card-header>' +

                        '<md-card-content>' +
                            '<md-field>' +
                                '<label for="username">Username:&nbsp;</label>' +
                                '<md-input type="text" id="username" v-model="username"></md-input>' +
                            '</md-field>' +

                            '<md-field>' +
                                '<label for="password">Password:&nbsp;</label>' +
                                '<md-input type="password" id="password" v-model="password"></md-input>' +
                            '</md-field>'+

                            '<md-button class="md-raised md-primary" v-on:click="doLogin">Sign In</md-button>' +
                        '</md-card-content>' +
                    '</md-card>' +
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

Vue.use(VueMaterial.default);

var vm = new Vue({
    el: '#visitorsApp'
});
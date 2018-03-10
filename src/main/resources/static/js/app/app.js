'use strict';

Vue.component('osmd-app-component', {
    template: '<div>\n' +
                '<form novalidate class="md-layout" v-if="!isAuthenticated">\n' +
                    '<md-card class="md-layout-item md-size-20 md-small-size-100 login-wrapper">' +
                        '<md-card-header>\n' +
                            '<div id="login-header" class="md-title">Sign In</div>\n' +
                        '</md-card-header>\n' +

                        '<md-card-content>\n' +
                            '<div class="md-layout">\n' +
                                '<div class="md-layout-item md-small-size-100">\n' +
                                    '<md-field>\n' +
                                        '<label for="username">Username</label>\n' +
                                        '<md-input name="username" id="username" v-model="username"/>\n' +
                                    '</md-field>\n' +
                                '</div>' +
                            '</div>\n' +

                            '<div class="md-layout">\n' +
                                '<div class="md-layout-item md-small-size-100">\n' +
                                    '<md-field>\n' +
                                        '<label for="password">Last Name</label>\n' +
                                        '<md-input type="password" name="password" id="password" v-model="password" />\n' +
                                    '</md-field>\n' +
                                '</div>\n' +
                            '</div>\n' +

                            '<div class="md-layout">\n' +
                                '<div class="md-layout-item md-small-size-100">\n' +
                                    '<md-button id="login-button" class="md-raised md-primary" v-on:click="doLogin">Sign In</md-button>' +
                                '</div>\n' +
                            '</div>\n' +
                        '</md-card-content>\n' +
                    '</md-card>\n' +
                '</form>\n' +

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
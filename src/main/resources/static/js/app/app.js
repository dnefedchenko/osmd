'use strict';

const store = {
    state: {
        isAuthenticated: false
    },
    setAuthenticated: function (value) {
        this.state.isAuthenticated = value;
    },
    isAuthenticated: function () {
        return this.state.isAuthenticated;
    }
};

Vue.component('osmd-app-component', {
    template: '<div>\n' +
                '<form novalidate class="md-layout" v-if="!isAuthenticated">\n' +
                    '<md-card class="md-layout-item md-size-20 md-small-size-100 login-wrapper">' +
                        '<md-card-header>\n' +
                            '<div id="login-header" class="md-title">Вход</div>\n' +
                        '</md-card-header>\n' +

                        '<md-card-content>\n' +
                            '<div class="md-layout">\n' +
                                '<div class="md-layout-item md-small-size-100">\n' +
                                    '<md-field>\n' +
                                        '<label for="username">Имя Пользователя</label>\n' +
                                        '<md-input name="username" id="username" v-model="username"/>\n' +
                                    '</md-field>\n' +
                                '</div>' +
                            '</div>\n' +

                            '<div class="md-layout">\n' +
                                '<div class="md-layout-item md-small-size-100">\n' +
                                    '<md-field>\n' +
                                        '<label for="password">Пароль</label>\n' +
                                        '<md-input type="password" name="password" id="password" v-model="password" />\n' +
                                    '</md-field>\n' +
                                '</div>\n' +
                            '</div>\n' +

                            '<div class="md-layout">\n' +
                                '<div class="md-layout-item md-small-size-100">\n' +
                                    '<md-button id="login-button" class="md-raised md-primary" v-on:click="doLogin">Войти</md-button>' +
                                '</div>\n' +
                            '</div>\n' +
                        '</md-card-content>\n' +
                    '</md-card>\n' +
                '</form>\n' +

                '<osmd-content v-if="isAuthenticated"></osmd-content>' +
              '</div>',
    data: function () {
        return {
            username: '',
            password: '',
            state: store.state
        };
    },
    created: function () {
        var promise = $.get('/users/me', function(success) {
            store.setAuthenticated(true);
        });

        promise.fail(function (error) {
            store.setAuthenticated(false);
        });
    },
    methods: {
        doLogin: function () {
            var formData = 'username='+this.username+'&password='+this.password;
            var loginPromise = $.post('/auth/login', formData, function (success) {
                store.setAuthenticated(true);
            });

            loginPromise.fail(function (error) {
                store.setAuthenticated(false);
            });
        }
    },
    computed: {
        isAuthenticated: function () {
            return store.isAuthenticated();
        }
    }
});

Vue.use(VueMaterial.default);

var vm = new Vue({
    el: '#visitorsApp'
});
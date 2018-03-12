Vue.component('osmd-content', {
    template: '<div>' +
                '<md-toolbar class="md-primary" md-elevation="1">' +
                    '<h3 class="md-title"  style="flex: 1">Visitors</h3>' +
                    '<md-button v-on:click="logout">Log Out</md-button>' +
                '</md-toolbar>' +

                '<div class="md-layout">' +
                    '<div class="md-layout-item md-size-15">' +
                    '</div>' +

                    '<form class="md-layout-item md-layout md-gutter md-alignment-center-left">' +
                        '<div class="md-layout-item">' +
                            '<md-field>' +
                                '<label>Vehicle Registration Number</label>' +
                                '<md-input></md-input>' +
                            '</md-field>' +
                        '</div>' +

                        '<div class="md-layout-item">' +
                            '<md-field>' +
                                '<label>Vehicle Registration Number</label>' +
                                '<md-input></md-input>' +
                            '</md-field>' +
                        '</div>' +

                        '<div class="md-layout-item">' +
                            '<md-button type="button" class="md-raised md-primary">Let In&nbsp;<md-icon>forward</md-icon></md-button>' +
                        '</div>' +
                    '</form>' +

                    '<div class="md-layout-item md-size-15">' +
                    '</div>' +
                '</div>' +

              '</div>',
    data: function() {
        return {

        }
    },
    methods: {
        logout: function () {
            var logoutPromise = $.post('/auth/logout', function (success) {
                store.setAuthenticated(false);
            });

            logoutPromise.fail(function (error) {
                store.setAuthenticated(false);
            });
        }
    }
});
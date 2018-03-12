Vue.component('osmd-content', {
    template: '<md-toolbar class="md-primary" md-elevation="1">' +
                '<h3 class="md-title"  style="flex: 1">Visitors</h3>' +
                '<md-button v-on:click="logout">Log Out</md-button>' +
              '</md-toolbar>',
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
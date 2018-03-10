Vue.component('osmd-content', {
    template: '<md-toolbar class="md-primary" md-elevation="1">' +
                '<h3 class="md-title"  style="flex: 1">Visitors</h3>' +
                '<md-button v-on:click="logout">Log Out</md-button>' +
              '</md-toolbar>',
    methods: {
        logout: function () {
            var logoutPromise = $.post('/auth/logout', function (success) {
                console.log(success);
            });

            logoutPromise.fail(function (error) {
                console.log(error);
            });
        }
    }
});
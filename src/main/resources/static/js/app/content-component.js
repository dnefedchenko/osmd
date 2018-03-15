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
                            '<md-autocomplete v-model="selectedVehicle" :md-options="vehicles">' +
                                '<label>Vehicle Registration Number</label>' +
                            '</md-autocomplete>' +
                        '</div>' +

                        '<div class="md-layout-item">' +
                            '<md-field>' +
                                '<label for="timeRangeSelect">Time Range</label>' +
                                '<md-select name="timeRangeSelect" id="timeRangeSelect" v-model="selectedTime">' +
                                    '<md-option v-for="timeRange in timeRangeOptions" v-bind:value="timeRange">{{timeRange}}</md-option>' +
                                '</md-select>' +
                            '</md-field>' +
                        '</div>' +

                        '<div class="md-layout-item">' +
                            '<md-button type="button" class="md-raised md-primary" @click="letIn">Let In&nbsp;<md-icon>forward</md-icon></md-button>' +
                        '</div>' +
                    '</form>' +

                    '<div class="md-layout-item md-size-15">' +
                    '</div>' +
                '</div>' +

              '</div>',
    data: function() {
        return {
            selectedVehicle: null,
            selectedTime: null,
            vehicles: [],
            timeRangeOptions: [
                '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'
            ]
        }
    },
    created: function() {
        var self = this;

        $.get('/vehicle-registration-numbers', function(response) {
            self.vehicles = response;
        });
    },
    methods: {
        logout: function () {
            var logoutPromise = $.post('/auth/logout', function (success) {
                store.setAuthenticated(false);
            });

            logoutPromise.fail(function (error) {
                store.setAuthenticated(false);
            });
        },
        letIn: function () {
            console.log('VRN is: ' + this.selectedVehicle + ' time range is: ' + this.selectedTime);
        }
    }
});
Vue.component('osmd-content', {
    template: '<div>' +
                '<md-toolbar class="md-primary" md-elevation="1">' +
                    '<h3 class="md-title"  style="flex: 1">Visitors</h3>' +
                    '<md-button v-on:click="logout">Log Out</md-button>' +
                '</md-toolbar>' +

                '<div class="md-layout">' +
                    '<div class="md-layout-item md-size-15">' +
                    '</div>' +

                    '<div class="md-layout-item">' +

                        '<form class="md-layout md-gutter md-alignment-center-left">' +
                            '<div class="md-layout-item">' +
                                '<md-autocomplete v-model="selectedVehicle" :md-options="vehicleNumbers">' +
                                    '<label>Vehicle Registration Number</label>' +
                                '</md-autocomplete>' +
                            '</div>' +

                            '<div class="md-layout-item">' +
                                '<md-field>' +
                                    '<label for="timeRangeSelect">Time Range</label>' +
                                    '<md-select name="timeRangeSelect" id="timeRangeSelect" v-model="selectedTime">' +
                                        '<md-option v-for="timeRange in timeRangeOptions" :key="timeRange" v-bind:value="timeRange">{{timeRange}}</md-option>' +
                                    '</md-select>' +
                                '</md-field>' +
                            '</div>' +

                            '<div class="md-layout-item">' +
                                '<md-button type="button" class="md-raised md-primary" @click="letIn" v-bind:disabled="!selectedVehicle">Let In&nbsp;' +
                                    '<md-icon>forward</md-icon>' +
                                '</md-button>' +
                            '</div>' +
                        '</form>' +

                        '<div class="md-layout" v-if="anyVehiclesIn">' +
                            '<md-table class="md-layout-item" v-model="vehicles" md-card>' +
                                '<md-table-toolbar>' +
                                    '<h1 class="md-title">Vehicles In The Yard</h1>' +
                                '</md-table-toolbar>' +

                                '<md-table-row slot="md-table-row" slot-scope="{ item }">' +
                                    '<md-table-cell md-label="#" md-numeric>{{item.id}}</md-table-cell>' +
                                    '<md-table-cell md-label="Vehicle Number">{{item.vrn}}</md-table-cell>' +
                                    '<md-table-cell md-label="Entrance Time">{{item.entranceTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Exit Time">{{item.exitTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Elapsed Time">{{item.elapsedTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Status">{{item.status}}</md-table-cell>' +
                                    '<md-table-cell md-label="Action">' +
                                        '<md-button type="button" class="md-raised md-primary" @click="letOut">Let out&nbsp;<md-icon>forward</md-icon></md-button>' +
                                    '</md-table-cell>' +
                                '</md-table-row>' +
                            '</md-table>' +
                        '</div>' +

                    '</div>' +

                    '<div class="md-layout-item md-size-15">' +
                    '</div>' +
                '</div>' +
              '</div>',
    data: function() {
        return {
            selectedVehicle: null,
            selectedTime: '0.5',
            vehicleNumbers: [],
            timeRangeOptions: [
                '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'
            ],
            vehicles: []
        }
    },
    created: function() {
        var self = this;

        $.get('/vehicle-registration-numbers', function(response) {
            self.vehicleNumbers = response;
        });
    },
    computed: {
        anyVehiclesIn: function () {
            return this.vehicles.length;
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
        },
        letIn: function () {
            console.log('VRN is: ' + this.selectedVehicle + ' time range is: ' + this.selectedTime);
            var visitor = {
                id: 3,
                vrn: this.selectedVehicle,
                entranceTime: '12:30:00',
                exitTime: '13:30:00',
                elapsedTime: '5',
                status: 'ALLOWED'
            };

            var visitorPromise = $.post('/visitors', visitor, function (response) {
                this.vehicles.unshift(visitor);
            });

            visitorPromise.fail(function (error) {
                console.log(error);
            });

            this.selectedVehicle = '';
        },
        letOut: function () {
            console.log('Letting Out');
        }
    }
});
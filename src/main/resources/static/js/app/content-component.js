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
                                    '<md-icon>flight_land</md-icon>' +
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
                                    '<md-table-cell md-label="Vehicle Number">{{item.vehicleNumber}}</md-table-cell>' +
                                    '<md-table-cell md-label="Entrance Time">{{item.entranceTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Exit Time">{{item.exitTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Elapsed Time(min)">{{item.elapsedTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Status">{{item.status}}</md-table-cell>' +
                                    '<md-table-cell md-label="Action">' +
                                        '<md-button type="button" class="md-raised md-primary" @click="letOut">Let out&nbsp;' +
                                            '<md-icon>flight_takeoff</md-icon>' +
                                        '</md-button>' +
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
            selectedTime: '0.05',
            vehicleNumbers: [],
            timeRangeOptions: [
                '0.05', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'
            ],
            vehicles: [],
            stompClient: null,
            stompSubscription: null
        }
    },
    created: function() {
        this.loadVehicleRegistrationNumbers();
        this.openSockJsConnection();
    },
    destroyed: function() {
        this.disconnectStompClient();
    },
    computed: {
        anyVehiclesIn: function () {
            return this.vehicles.length;
        }
    },
    methods: {
        logout: function () {
            var self = this;
            var logoutPromise = $.post('/auth/logout', function (success) {
                store.setAuthenticated(false);
            });

            logoutPromise.fail(function (error) {
                store.setAuthenticated(false);
            });
        },
        letIn: function () {
            var self = this;

            var visitor = {
                vehicleNumber: this.selectedVehicle,
                parkingTime: this.selectedTime
            };

            var visitorPromise = $.post('/visitors', visitor, function (response) {
                self.vehicles.unshift(response);
                self.resetSelectedVehicle();
            });

            visitorPromise.fail(function (error) {
                console.log(error);
            });
        },
        loadVehicleRegistrationNumbers: function() {
            var self = this;
            $.get('/vehicle-registration-numbers', function(response) {
                self.vehicleNumbers = response;
            });
        },
        openSockJsConnection: function () {
            var self = this;
            var socket = new SockJS('/parking-time-tracker');
            self.stompClient = Stomp.over(socket);
            self.stompClient.connect({}, function (frame) {
                self.stompSubscription = self.stompClient.subscribe('/topic', function (message) {
                    var payload = JSON.parse(message.body);
                    self.updateVehicleRecord(payload);
                })
            });
        },
        updateVehicleRecord: function (updatedVehicleInfo) {
            this.vehicles.forEach(vehicle => {
                if (vehicle.vehicleNumber === updatedVehicleInfo.id) {
                    vehicle.elapsedTime = updatedVehicleInfo['elapsedTime'];
                    vehicle.status = updatedVehicleInfo['status'];
                }
            });
        },
        disconnectStompClient: function() {
            var self = this;
            if (self.stompClient !== null) {
                self.stompSubscription.unsubscribe();
                self.stompClient.disconnect();
            }
        },
        resetSelectedVehicle: function () {
            this.selectedVehicle = '';
        },
        letOut: function () {
            // TODO: stop timer if not already stopped
        }
    }
});
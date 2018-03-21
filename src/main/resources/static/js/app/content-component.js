Vue.component('osmd-content', {
    template: '<div>' +
                '<md-toolbar class="md-primary" md-elevation="1">' +
                    '<h3 class="md-title"  style="flex: 1">Посетители</h3>' +
                    '<md-button v-on:click="logout">Выход</md-button>' +
                '</md-toolbar>' +

                '<div class="md-layout">' +
                    '<div class="md-layout-item md-size-15">' +
                    '</div>' +

                    '<div class="md-layout-item">' +

                        '<form class="md-layout md-gutter md-alignment-center-left">' +
                            '<div class="md-layout-item">' +
                                '<md-autocomplete v-model="selectedVehicle" :md-options="vehicleNumbers">' +
                                    '<label>Гос. Номер</label>' +
                                '</md-autocomplete>' +
                            '</div>' +

                            '<div class="md-layout-item">' +
                                '<md-field>' +
                                    '<label for="timeRangeSelect">Время стоянки(мин)</label>' +
                                    '<md-select name="timeRangeSelect" id="timeRangeSelect" v-model="selectedTime">' +
                                        '<md-option v-for="timeRange in timeRangeOptions" :key="timeRange" v-bind:value="timeRange">{{timeRange}}</md-option>' +
                                    '</md-select>' +
                                '</md-field>' +
                            '</div>' +

                            '<div class="md-layout-item">' +
                                '<md-button type="button" class="md-raised md-primary" @click="letIn" v-bind:disabled="!selectedVehicle">' +
                                    '<md-icon>flight_land</md-icon>&nbsp;&nbsp;Впустить' +
                                '</md-button>' +
                            '</div>' +
                        '</form>' +

                        '<div class="md-layout" v-if="anyVehiclesIn">' +
                            '<md-table class="md-layout-item" v-model="vehicles" md-card>' +
                                '<md-table-toolbar>' +
                                    '<h1 class="md-title">Авто во дворе</h1>' +
                                '</md-table-toolbar>' +

                                '<md-table-row slot="md-table-row" slot-scope="{ item }" v-bind:class="{warning: warningStatus(item.status), alarm: alarmStatus(item.status)}">' +
                                    '<md-table-cell md-label="#" md-numeric>{{item.id}}</md-table-cell>' +
                                    '<md-table-cell md-label="Гос. Номер">{{item.vehicleNumber}}</md-table-cell>' +
                                    '<md-table-cell md-label="Статус">' +
                                        '<md-icon v-if="warningStatus(item.status)">schedule</md-icon>' +
                                        '<md-icon v-if="alarmStatus(item.status)">error_outline</md-icon>&nbsp;' +
                                        '{{item.status}}' +
                                    '</md-table-cell>' +
                                    '<md-table-cell md-label="Время заезда">{{item.entranceTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Время выезда">{{item.exitTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Время Стоянки(мин)">{{item.elapsedTime}}</md-table-cell>' +
                                    '<md-table-cell md-label="Действие">' +
                                        '<md-button type="button" class="md-raised md-primary" @click="letOut(item.vehicleNumber)">' +
                                            '<md-icon>flight_takeoff</md-icon>&nbsp;&nbsp;Выпустить' +
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
        },
        sortedVehicles: function () {
            return this.vehicles.sort((a, b) => b.elapsedTime - a.elapsedTime);
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
        letOut: function (vehicleNumber) {
            var self = this;
            var letInPromise = $.post('/visitors/'.concat(vehicleNumber), function (response) {
                self.vehicles = self.vehicles.filter(vehicle => vehicle.vehicleNumber !== vehicleNumber);
            });

            letInPromise.fail(function (error) {
                console.log(error);
            });
        },
        warningStatus: function (status) {
            return status === 'acceptable';
        },
        alarmStatus: function (status) {
            return status === 'overdue';
        }
    }
});
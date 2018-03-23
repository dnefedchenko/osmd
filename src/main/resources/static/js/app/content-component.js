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

                            '<md-table md-card>' +
                                '<md-table-toolbar>' +
                                    '<h1 class="md-title">Авто во дворе</h1>' +
                                    '<h1 class="md-title parking-header">Свободных мест: {{freeParkingPlacesCount}}</h1>' +
                                '</md-table-toolbar>' +

                                '<md-table-row>' +
                                    '<md-table-head md-numeric>#</md-table-head>' +
                                    '<md-table-head>Гос. Номер</md-table-head>' +
                                    '<md-table-head>Статус</md-table-head>' +
                                    '<md-table-head>Время заезда</md-table-head>' +
                                    '<md-table-head>Время выезда</md-table-head>' +
                                    '<md-table-head>Время Стоянки(мин)</md-table-head>' +
                                    '<md-table-head>Действие</md-table-head>' +
                                '</md-table-row>' +

                                '<md-table-row v-for="(vehicle, index) in sortedVehicles" :key="vehicle.vehicleNumber" ' +
                                        'v-bind:class="{warning: warningStatus(vehicle.status), alarm: alarmStatus(vehicle.status)}">' +
                                    '<md-table-cell md-numeric>{{index+1}}</md-table-cell>' +
                                    '<md-table-cell>{{vehicle.vehicleNumber}}</md-table-cell>' +
                                    '<md-table-cell>' +
                                        '<md-icon v-if="warningStatus(vehicle.status)">schedule</md-icon>' +
                                        '<md-icon v-if="alarmStatus(vehicle.status)">error_outline</md-icon>&nbsp;' +
                                        '{{displayStatus(vehicle.status)}}' +
                                    '</md-table-cell>' +
                                    '<md-table-cell>{{vehicle.entranceTime}}</md-table-cell>' +
                                    '<md-table-cell>{{vehicle.exitTime}}</md-table-cell>' +
                                    '<md-table-cell >{{vehicle.elapsedTime}}</md-table-cell>' +
                                    '<md-table-cell>' +
                                        '<md-button type="button" class="md-raised md-primary" @click="letOut(vehicle.vehicleNumber)">' +
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
            stompSubscription: null,
            freeParkingPlacesCount: 8
        }
    },
    created: function() {
        this.loadVehicleRegistrationNumbers();
        this.openSockJsConnection();
        this.restoreVehiclesIfAny();
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
        restoreVehiclesIfAny: function () {
            var storedVehicles = this.getStoredVehicles();
            if (storedVehicles && storedVehicles.length) {
                this.vehicles = storedVehicles;
                this.freeParkingPlacesCount -= storedVehicles.length;
            }
        },
        getStoredVehicles: function() {
            var vehicles = [];
            var keys = Object.keys(localStorage);
            var i = keys.length;

            while (i--) {
                vehicles.push(JSON.parse(localStorage.getItem(keys[i])));
            }

            return vehicles;
        },
        logout: function () {localStorage
            var logoutPromise = $.post('/auth/logout', function (success) {
                store.setAuthenticated(false);
                localStorage.clear();
            });

            logoutPromise.fail(function (error) {
                store.setAuthenticated(false);
            });
        },
        letIn: function () {
            var self = this;

            if (self.vehicles.map(v => v.vehicleNumber).indexOf(this.selectedVehicle) !== -1) {
                return;
            }

            var visitor = {
                vehicleNumber: this.selectedVehicle,
                parkingTime: this.selectedTime
            };

            var visitorPromise = $.post('/visitors', visitor, function (response) {
                self.formatTime(response);
                self.vehicles.unshift(response);
                self.addToStorage(response);
                self.resetSelectedVehicle();
                self.decrementParkingPlacesCount();
            });

            visitorPromise.fail(function (error) {
                console.log(error);
            });
        },
        formatTime: function (visitor) {
            var format = 'HH:mm';
            var entranceTime = moment(visitor['entranceTime']).format(format);
            var exitTime = moment(visitor['exitTime']).format(format);
            visitor['entranceTime'] = entranceTime;
            visitor['exitTime'] = exitTime;
        },
        addToStorage: function (visitor) {
            localStorage.setItem(visitor.vehicleNumber, JSON.stringify(visitor));
        },
        removeFromStorage: function (key) {
            localStorage.removeItem(key);
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
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, function (frame) {
                self.stompSubscription = self.stompClient.subscribe('/topic', function (message) {
                    var payload = JSON.parse(message.body);
                    self.updateVehicleRecord(payload);
                    self.updateVehicleInStorage(payload);
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
        updateVehicleInStorage: function (updatedVehicleInfo) {
            var vehicle = JSON.parse(localStorage.getItem(updatedVehicleInfo.id));
            vehicle.elapsedTime = updatedVehicleInfo['elapsedTime'];
            vehicle.status = updatedVehicleInfo['status'];
            localStorage.setItem(updatedVehicleInfo.id, JSON.stringify(vehicle));
        },
        disconnectStompClient: function() {
            if (this.stompClient !== null) {
                this.stompSubscription.unsubscribe();
                this.stompClient.disconnect();
            }
        },
        resetSelectedVehicle: function () {
            this.selectedVehicle = '';
        },
        letOut: function (vehicleNumber) {
            var self = this;
            var letInPromise = $.post('/visitors/'.concat(vehicleNumber), function (response) {
                self.vehicles = self.vehicles.filter(vehicle => vehicle.vehicleNumber !== vehicleNumber);
                self.removeFromStorage(vehicleNumber);
                self.incrementParkingPlacesCount();
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
        },
        displayStatus: function (status) {
            if (status === 'acceptable') {
                return 'Допустимо';
            } else if (status === 'overdue') {
                return 'Задержка';
            } else {
                return 'Разрешено';
            }
        },
        incrementParkingPlacesCount: function () {
            this.freeParkingPlacesCount++;
        },
        decrementParkingPlacesCount: function () {
            this.freeParkingPlacesCount--;
        }
    }
});
'use strict';

var stompClient;
var stompSubscription;

var initVehicleAutocomplete = function() {
    $.get('/vehicle-registration-numbers', function(response) {
        var vrnAutocomplete = document.querySelector('.autocomplete');

        var autocompleteSuggestions = {};
        response.forEach(function (vrn) {
            autocompleteSuggestions[vrn] = null;
        });

        var options = { data: autocompleteSuggestions };
        var instance = M.Autocomplete.init(vrnAutocomplete, options);
        return instance;
    });
};

var initTimeRangeSelector = function () {
    var elem = document.querySelector('select');
    var instance = M.FormSelect.init(elem, {});
    return instance;
};

var disableSubmitButton = function() {
    document.getElementById('submit').setAttribute("disabled", "disabled");
};

var enableSubmitButton = function() {
    document.getElementById('submit').removeAttribute("disabled");
};

var validateVisitorsForm = function (valueToBeValidated) {
    if (valueToBeValidated && valueToBeValidated !== null && valueToBeValidated !== '') {
        enableSubmitButton();
    } else {
        disableSubmitButton();
    }
};

var autocomplete = document.querySelector('.autocomplete');

autocomplete.addEventListener('keyup', function (event) {
    validateVisitorsForm(event.target.value);
});

var updateElapsedTime = function (vehicleId, secondsPassed) {
    var selectorQuery = 'tr:contains("'+vehicleId+'")';
    console.log($(selectorQuery)[0].cells[4]);
    $(selectorQuery)[0].cells[4].innerHTML = secondsPassed;
};

var updateStatus = function (vehicleId, status) {
    var selectorQuery = 'tr:contains("'+vehicleId+'")';
    console.log($(selectorQuery)[0].cells[5]);
    $(selectorQuery)[0].cells[5].innerHTML = status;
};

var openSockJsConnection = function () {
    if (stompClient !== null && stompClient !== undefined) {
        return;
    }

    var socket = new SockJS('/parking-time-elapsed');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompSubscription = stompClient.subscribe('/topic', function (message) {
            var payload = JSON.parse(message.body);
            updateElapsedTime(payload.id, payload.elapsedTime);
            updateStatus(payload.id, payload.status);
        })
    });
};

var disconnectStompClient = function () {
    if (stompClient !== null) {
        stompSubscription.unsubscribe();
        stompClient.disconnect();
    }
};

this.initTimeRangeSelector();
this.initVehicleAutocomplete();
this.disableSubmitButton();
this.openSockJsConnection();

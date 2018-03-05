'use strict';

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

document.querySelector('.autocomplete')
    .addEventListener('blur', function (event) {
        validateVisitorsForm(event.target.value);
    });

this.initTimeRangeSelector();
this.initVehicleAutocomplete();
this.disableSubmitButton();

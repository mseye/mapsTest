angular.module('starter')
    .service('CommandService', function() {

        var addButtonSubscribers = [];

        return {
            subscribe: function(fn, callback) {
                if (fn == 'add') addButtonSubscribers.push(callback);
            },
            addButtonClick: function addButtonClick(data) {
                addButtonSubscribers.forEach(function(element) {
                    if (element) element(data);
                }, this);
            }
        };

    })
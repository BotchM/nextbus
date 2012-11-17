/*global EJS*/

var nextbus = (function($){

/*
    OK, here's what this thing needs to do:
     - have a set of default options
     - have a list of locations and the stops therein
     - on page load:
        - retrieve the user's settings (from where? cookie? localstorage?)
        - extend the defaults with the user's settings
        - build the navigation
        - load the selected (default) location's information → trigger a "load" event?
    - on click of a nav item
        - if the nav item is a location:
            - stop any timers
            - retrieve the busses and times for that location
            - when done, re-render the view
            - start refresh timer
        - if the nav item is "settings":
            - render the settings template and display in a modal dingus
        - if the nav item is the "about" item:
            - render the about template and display in a modal dingus
 */

    var locations = [
        {
            "name": "East Campus Bus Loop",
            "stops": [51861, 53096, 52998, 52807],
            "lat": 49.27848,
            "long": -122.91279
        },
        {
            "name": "Tower Road",
            "stops": [59044],
            "lat": 49.27713,
            "long": -122.90937
        },
        {
            "name": "South Campus Road / Science Road",
            "stops": [51862],
            "lat": 49.27656,
            "long": -122.91602
        },
        {
            "name": "Transportation Centre",
            "stops": [51863],
            "lat": 49.27995,
            "long": -122.92011
        },
        {
            "name": "University Dr. West / West Campus Road",
            "stops": [51864],
            "lat": 49.28123,
            "long": -122.9
        }
    ];

    var numlocations = locations.length;

    var settings = {
        display_times_as: "relative",           // relative, absolute
        time_style: 12,                         // 12, 24
        default_stop: 0,
        save_stop_as_default: true
    };

    var templates = {
        busicon: document.getElementById('busicontmpl').innerHTML,
        busitem: document.getElementById('busitemtmpl').innerHTML
    };

    // settings
    var loadSettings = function() {
        var settings = localStorage('settings') || {};
        if (settings && typeof settings === 'string') {
            settings = JSON.parse(settings);
        }
        return settings;
    };

    var saveSettings = function() {
        localStorage.setItem('settings', settings);
    };

    var getSetting = function(setting) {
        if (!setting) {
            return settings;
        } else if (settings.hasOwnProperty(setting)) {
            return settings[setting];
        } else {
            return null;
        }
    };

    var setSetting = function(setting, value, save) {
        save = save || true;
        settings[setting] = value;
        if (save) {
            saveSettings();
        }
    };

    // templates
    var renderBusIcon = function(busnumber) {
        return templates.busicon.replace('__BUSNUMBER__', busnumber);
    };

    var renderBusItem = function(busnumber, includeHr) {
        includeHr = includeHr || true;
        var html = templates.busitem;
        var hr = includeHr ? '<hr class="soften">' : '';
        return html.replace('__BUSNUMBER__', busnumber).replace('__HR__', hr).replace('__SVGPLACEHOLDER__', renderBusIcon(busnumber));
    };


})(jQuery);
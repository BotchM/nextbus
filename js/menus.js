(function() {

  // events happening when the window loaads
    ///////////// HELPERS
    var addEvent, addHoverEvent;

    if (!document.querySelectorAll) {
        document.querySelectorAll = function(selector) {
            var doc = document,
                head = doc.documentElement.firstChild,
                styleTag = doc.createElement('STYLE');
            head.appendChild(styleTag);
            doc.__qsaels = [];

            styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
            window.scrollBy(0, 0);

            return doc.__qsaels;
        };
    }
    addEvent = function(el, type, func) {
        if (el.addEventListener) {
            el.addEventListener(type, func, true);
        } else if (el.attachEvent) {
            el.attachEvent("on" + type, func);
        }
    };

    addHoverEvent = function(el, mouseoverFunc, mouseoutFunc) {
        addEvent(el, 'mouseover', mouseoverFunc);
        addEvent(el, 'mouseout', mouseoutFunc);
    };
    ///////////// END HELPERS


    ///////////// SERIOUS BUSINESS
    // when mouse hovered over, it shows alphabets which on selection redirects to sfu directory
    var directoryAtabsEl = document.querySelectorAll('#directory a.tabs')[0];
    addHoverEvent(document.querySelectorAll('#directory')[0],
        function(ev) {
            directoryAtabsEl.style.borderBottom = '10px solid #cb5a60';
        },
        function(ev) {
            directoryAtabsEl.style.borderBottom = 'none';
        }
    );
    // when mouse hovered over, it shows links to different mailing services provided by sfu

    var onlineAtabsEl = document.querySelectorAll('#online a.tabs')[0];
    addHoverEvent(document.querySelectorAll('#online')[0],
        function(ev) {
            onlineAtabsEl.style.borderBottom = '10px solid #cb5a60';
        },
        function(ev) {
            onlineAtabsEl.style.borderBottom = 'none';
        }
    );

    // the links that were presented by the above function are rendered once a user perform a mouse click event
    if (!('placeholder' in document.createElement('input'))) {
        var searchEl = document.getElementById('s')
        ,   defaultValue = 'Search sfu.ca';

        searchEl.value = defaultValue;

        addEvent(searchEl, 'focus', function(ev) {
            if (this.value === defaultValue) {
                this.value = '';
            }
        });
        addEvent(searchEl, 'blur', function(ev) {
            if (!this.value.length) {
                this.value = defaultValue;
            }
        });
    }
    ///////////// PARTY TIME

})();

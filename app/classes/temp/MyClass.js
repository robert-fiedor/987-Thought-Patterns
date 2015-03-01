// Example use of require; or how you 'import' files

//var SampleView = require('./views/SampleView');




// Class definition
MyClass = (function() {

// private vars
    var _foo = 'bar';
    var _show = false;
//    var _sampleView = new SampleView();

// self-instantiating "constructor" function
    var initialize = (function() {
        //////console.log('Initialized');
    })();

// private functions
    function show() {
        // show view
    };

    function hide() {
        // hide view
    };

// public facing interface
    return {

        getFoo: function() {
            return _foo;
        },

        setFoo: function( value ) {
            if( value !== foo )
                foo = value;
        },

        showView: function( doShow ) {
            ( doShow ) ?
                show() :
                hide();
        }
    };

}).call();

module.exports = MyClass;
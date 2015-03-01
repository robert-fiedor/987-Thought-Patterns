//JavaScript////////////////////////////////////////////////////////////////////
// 
// Copyright 2012 
// 
////////////////////////////////////////////////////////////////////////////////

/**
 * Application Bootstrapper
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

Application = {

    //--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------

    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------

    initialize: function() {

//        require('vendor/scripts/TweenLite')
        // Import views

//        require('views/supers/View')
        var HomeView = require('views/HomeView');

        var Router = require('routers/Router');

        // Initialize views
        this.homeView = new HomeView();
        this.router = new Router();

//        console.log("fin",document.getElementById("testCanvas"));


        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
}

module.exports = Application;

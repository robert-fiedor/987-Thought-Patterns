
RFNav = (function() {

    var _foo = 'bar';
    var _show = false;

    var _btnArr=null;


    var _pageEvent=null;
    var _currSelected;

    var initialize = (function() {
        ////////console.log('Initialized');
    })();

    function show() {
        ////////console.log("show");
        // show view
    };

    function hide() {
        ////////console.log("hide");
        // hide view
    };

    return {

        getFoo: function() {
            return _foo;
        },

        getCurrSelected: function() {
          return _currSelected;
        },

        setFoo: function( value ) {
            if( value !== _foo )
                _foo = value;
        },

        showView: function( doShow ) {
            ( doShow ) ? show() : hide();
        },

        setup: function(arr) {
            //_curtain=curtain;
            _btnArr=arr;

            this.onButtonClicked = _.bind( this.onButtonClicked, this );
            EventBus.addEventListener("NAVBTN_EVENTS", this.onButtonClicked);


            for ( var i = 0; i < arr.length; i++) {
                _btnArr[i].radioBtn=true
                _btnArr[i].eventName="NAVBTN_EVENTS";

            }



        },

        onButtonClicked: function(e) {

            for ( var i = 0; i < _btnArr.length; i++) {
                if(_btnArr[i]!= e.target) {_btnArr[i].setState(1)} else { _currSelected = i }
            }

           // _curtain.do();

            ////////console.log("_pageEvent",_pageEvent);
            EventBus.dispatch(_pageEvent,this);

        },

        setPageEvent: function(t) {
            _pageEvent=t;
        },

        setActiveBtn: function(target) {

//            for (var i in _btnArr) {
//                if (target!=_btnArr[i]) {_btnArr[i].setState(1)} else
//                {_btnArr[i].setState(2)}
//            }
        }

    };

}).call();

module.exports = RFNav;
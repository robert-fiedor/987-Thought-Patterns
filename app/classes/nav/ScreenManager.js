
(function(window) {

    function ScreenManager() {
        this.initialize();
    };



    ScreenManager.prototype.plusPage;
    ScreenManager.prototype.patternPage;
    ScreenManager.prototype.infoPage;

    ScreenManager.prototype.currPage;
    ScreenManager.prototype.pageArr;

    ScreenManager.prototype.navEvent;

    ScreenManager.prototype = new Container();

    ScreenManager.prototype.Container_initialize = ScreenManager.prototype.initialize;

    ScreenManager.prototype.initialize = function() {

        this.Container_initialize();

    };

    ScreenManager.prototype.init = function(pages) {

        this.addChild(pages[0]);
        this.addChild(pages[1]);
        this.addChild(pages[2]);

        this.pageArr = pages;

        this.onNavEvent = _.bind( this.onNavEvent, this );
        this.setPage(0);

    }

    ScreenManager.prototype.setPage = function(num) {

        if(this.currPage!=num) {

            this.currPage=num;

            for (var i = 0; i < this.pageArr.length; i++) {

                if(i!=this.currPage) {
                    this.pageArr[i].visible=false;

                } else {
                    this.pageArr[i].visible=true;
                }

            }

        }

    };

    ScreenManager.prototype.setController = function(nav,navEvent) {
        EventBus.addEventListener(navEvent, this.onNavEvent);

    }

    ScreenManager.prototype.onNavEvent = function(e) {
        ////////console.log("onNavEvent", e.target.getCurrSelected(),this);
        this.setPage(e.target.getCurrSelected())
    }

    window.ScreenManager = ScreenManager;

}(window));
















(function(window) {

    function RFButtonBitmap() {
        this.initialize();
    }

    RFButtonBitmap.prototype = new Container();
    RFButtonBitmap.prototype.Container_initialize = RFButtonBitmap.prototype.initialize;	//unique to avoid overiding base class

    RFButtonBitmap.prototype.img1;
    RFButtonBitmap.prototype.img2;

    RFButtonBitmap.prototype.stateNo;

    RFButtonBitmap.prototype.toggleBtn=false;
    RFButtonBitmap.prototype.radioBtn=false;

    RFButtonBitmap.prototype.eventName;
    RFButtonBitmap.prototype.id;

    RFButtonBitmap.prototype.dispatcher;

    RFButtonBitmap.prototype.prevState;

    RFButtonBitmap.prototype.justReverted;


    RFButtonBitmap.prototype.initialize = function() {
        this.Container_initialize();
    };

    RFButtonBitmap.prototype.init = function(img1,img2,toggleBtn,eventName) {

        if(eventName) this.eventName=eventName;

        if(toggleBtn) this.toggleBtn = toggleBtn;

        this.img1= new Bitmap(img1);
        this.img2= new Bitmap(img2);

        this.addChild(this.img1);
        this.addChild(this.img2);

        this.onClick = this.click;
        this.onPress = this.click;

        this.setState(1);

        this.click = _.bind( this.click, this );

    };

    RFButtonBitmap.prototype.revert = function() {

        //console.log("revert",this);
        this.justReverted=true;


//        this.setState(this.prevState);

        this.setState(this.prevState);

    }

    RFButtonBitmap.prototype.reportInteraction = function(e) {

        ////console.log("super");

    }

    RFButtonBitmap.prototype.click = function(e) {

        //console.log("click>this.justReverted",this.justReverted);

        if(!this.toggleBtn && this.radioBtn!=true) {

            if(e.type=='onClick' && !this.justReverted) {

                this.reportInteraction(e);

                this.justReverted=false;
                this.setState(1);
                if(this.eventName) EventBus.dispatch(this.eventName,this);

                //console.log("inside");

            };

            if(e.type=='onPress') {
                //console.log("onpress *");
                this.setState(2);
                this.reportInteraction(e);

                this.justReverted=false;
            };



        };

        if(this.toggleBtn && !this.radioBtn) {

            if(e.type=='onPress') {
                if(this.stateNo==1) {this.setState(2)} else {this.setState(1)};

                if(this.eventName) EventBus.dispatch(this.eventName,this);
            };

        };

        if(this.radioBtn==true) {

            //////console.log("first here");
            if(e.type=='onPress') {

                if(this.stateNo==1) {
                    this.setState(2);
                    if(this.eventName) EventBus.dispatch(this.eventName,this);
                }

            };

        }

    }

    RFButtonBitmap.prototype.setState = function(stateNo) {



        this.prevState = this.stateNo;
        this.stateNo=stateNo;

        if(stateNo == 1) {
            this.img1.visible=true;
            this.img2.visible=false;
        }

        if(stateNo == 2) {
            this.img1.visible=false;
            this.img2.visible=true;
        }


    };

    window.RFButtonBitmap = RFButtonBitmap;

}(window));















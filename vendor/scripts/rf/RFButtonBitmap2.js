
(function(window) {

    function RFButtonBitmap2() {
        this.initialize();
    }

    RFButtonBitmap2.prototype = new Container();
    RFButtonBitmap2.prototype.Container_initialize = RFButtonBitmap2.prototype.initialize;	//unique to avoid overiding base class

    RFButtonBitmap2.prototype.img1;
    RFButtonBitmap2.prototype.img2;

    RFButtonBitmap2.prototype.stateNo;

    RFButtonBitmap2.prototype.toggleBtn=false;
    RFButtonBitmap2.prototype.radioBtn=false;

    RFButtonBitmap2.prototype.eventName;
    RFButtonBitmap2.prototype.id;

    RFButtonBitmap2.prototype.dispatcher;

    RFButtonBitmap2.prototype.prevState;

    RFButtonBitmap2.prototype.justReverted;


    RFButtonBitmap2.prototype.initialize = function() {
        this.Container_initialize();

    };

    RFButtonBitmap2.prototype.init = function(img1,img2,toggleBtn,eventName) {

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

        _.extend(this, Backbone.Events);


    };

    RFButtonBitmap2.prototype.revert = function() {

        //console.log("revert",this);
        this.justReverted=true;


//        this.setState(this.prevState);

        this.setState(this.prevState);

    }

    RFButtonBitmap2.prototype.reportInteraction = function(e) {

        ////console.log("super");

    }

    RFButtonBitmap2.prototype.click = function(e) {

        //console.log("click>this.justReverted",this.justReverted);

        if(!this.toggleBtn && this.radioBtn!=true) {



            if(e.type=='onClick' && !this.justReverted) {

                this.reportInteraction(e);

                this.justReverted=false;
                this.setState(1);


//                console.log("this.eventName",this.eventName);
                if(this.eventName) this.trigger(this.eventName, e);


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

                console.log("this.eventName",this.eventName);

                if(this.eventName) this.trigger(this.eventName, e);

            };

        };

        if(this.radioBtn==true) {

            //////console.log("first here");
            if(e.type=='onPress') {

                if(this.stateNo==1) {
                    this.setState(2);
                    if(this.eventName) this.trigger(this.eventName, e);
                }

            };

        }

    }

    RFButtonBitmap2.prototype.setState = function(stateNo) {



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

    window.RFButtonBitmap2 = RFButtonBitmap2;

}(window));















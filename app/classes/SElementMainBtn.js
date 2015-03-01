

require('classes/Bulb');

(function() {

    var SElementMainBtn = function() {this.initialize();}
    SElementMainBtn.prototype = p = new RFScrollableElement();

    p.label;
    p.background;
    p.text;

    p.width;
    p.height;

    p.bulb;

    p.init = function(patternData) {

        var mainBtn = new RFButtonBitmap();
        mainBtn.init("images/mainBtn.png","images/mainBtnDown.png");

        this.passInteraction  = _.bind(this.passInteraction, this );
        mainBtn.reportInteraction = this.passInteraction;

        this.text = new createjs.Text("TEMP", "15px Arial", "#000");
        this.text.textBaseline = "top";

        this.text.x=80* window.resize;
        this.text.y=28* window.resize;

        this.bulb = new Bulb();
        this.bulb.init()

        this.bulb.scaleX=0.5
        this.bulb.scaleY=0.5

        this.bulb.x=30* window.resize
        this.bulb.y=25* window.resize

        this.bulb.revert=null;
        this.bulb.onClick=null;
        this.bulb.onPress=null;

        this.addChild(mainBtn,this.text,this.bulb);

//        268x44

    };

    p.setLabel=function(label) {
        this.text.text=label;
    }

    p.setColor = function(color) {

        this.bulb.setColor(color)

    }

    p.sup_passInteraction = p.passInteraction;
    p.passInteraction = function(e) {
        this.sup_passInteraction(e);

        if (e.type=="onClick") {
            ////////console.log("new shit");
            //update the other collection
            console.log("jkl");



        }
    };


    p.sup_setData = p.setData;
    p.setData = function(data) {
        this.sup_setData(data);

        //console.log("q",data.get("setColor"),data.get("setLabel"));




        this.data.bind('change', this.updateView, this);

    };
    
    p.updateView = function () {
        this.setLabel(this.data.get("setLabel"));
        this.setColor(this.data.get("setColor"));

        console.log("qwerty");

        //how about updating everything inside
    }
    
    

    window.SElementMainBtn = SElementMainBtn;

}());


//example of how to override using super
//    p.sup_setSize = p.setSize;
//    p.setSize = function(w,h) {
//        this.sup_setSize(w,h);
//    };


// ---------------------------
//      ???
//      p.Container_initialize = p.initialize;
//      ???
//      this.Container_initialize();
// ---------------------------



//        this.temp = _.bind( this.temp, this );

//    p.temp=function(){
////        this.text.text=label;
//        this.cache(0,0,472,96);
//
//        ////////console.log("temp");
//    }



//(function() {
//
//    var RFScrollableElement = function() {
//        this.initialize();
//    }
//    var p = RFScrollableElement.prototype = new createjs.Container(); // inherit from Container
//
//    p.label;
//    p.background;
//    p.count = 0;
//
//    p.Container_initialize = p.initialize;
//
//    p.initialize = function() {
//        this.Container_initialize();
//
//        ////////console.log("RFScrollableElement");
//    }
//
//    window.RFScrollableElement = RFScrollableElement;
//}());
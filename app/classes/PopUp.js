

require('classes/additional/ColorBox');
(function() {

    var PopUp = function() {this.initialize();}
    PopUp.prototype = p = new Container();

    p.controller;
    p.back;
    p.colorBox;

    p.popData;
    p.colorBox;

    p.init = function(controller) {

        this.colorBox = new ColorBox();

        this.colorBox.init();
        this.colorBox.y=450* window.resize;
        this.colorBox.x=400* window.resize;

        _.extend(this, Backbone.Events);

        this.controller=controller;

        this.back = new RFBlock();
        this.back.setSize(640* window.resize,920* window.resize)
//        this.addChild(this.back);
        this.back.alpha=0.9

        this.back.onClick = null;
        this.back.onPress = null;

        console.log("789");
        var pop = new Bitmap("images/popUp.png");
        this.addChild(pop)
        pop.x=56* window.resize
        pop.y=150* window.resize

        this.hide();
        var offset=290* window.resize

        var deleteBtn = new RFButtonBitmap2();
        deleteBtn.init("images/deleteBtnDef.png","images/deleteBtnDown.png",false, "CANCEL");
        this.addChild(deleteBtn)
        deleteBtn.y=550* window.resize;
        deleteBtn.x=(0+offset)* window.resize;

        var addBtn = new RFButtonBitmap2();
        addBtn.init("images/addBtnDef.png","images/addBtnDown.png",false, "CONFIRM");
        this.addChild(addBtn);
        addBtn.y=550* window.resize;
        addBtn.x=(200+offset)* window.resize;

        var that=this;

        deleteBtn.on("CANCEL", function(msg) {
            that.clicked(msg)
        });

        addBtn.on("CONFIRM", function(msg) {
            that.clicked(msg)
        });

        this.addChild(this.colorBox);

    };


    p.clicked = function(e) {

        console.log("clicked !");

        this.hide()


    }




    p.show = function() {

        this.visible=true;
        this.trigger("SHOW_POPUP");

    }

    p.hide = function(surpress) {

        var that=this
        this.visible=false;

        this.popData={setColor:that.colorBox.currColor,setLabel:$("#mainTextfield").val()}

//        console.log("!!!!!! popData",this.popData.setColor, this.popData.setLabel);

       if(!surpress) this.trigger("HIDE_POPUP");


    }







    window.PopUp = PopUp;

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
//}());/**

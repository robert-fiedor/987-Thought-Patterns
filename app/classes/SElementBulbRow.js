
require('classes/Bulb');

(function() {

    var SElementBulbRow = function() {this.initialize();}
    SElementBulbRow.prototype = p = new RFScrollableElement();

    p.label;
    p.background;
    p.text;

    p.width;
    p.height;

    p.color;

    p.bulbSet;

    p.init = function() {




        _.extend(this, Backbone.Events);



        this.bulbSet=[];

//74x74

        this.passInteraction  = _.bind(this.passInteraction, this );

        for ( var i = 0; i < 7; i++) {

            var temp = new Bulb();

            temp.init();
            this.addChild(temp);

            temp.x = (74*i)* window.resize;
            temp.reportInteraction = this.passInteraction;

            this.bulbSet.push(temp);

//            //////console.log("this.dataSet",this.dataSet.length);

        }

        // this.data.bind('change', this.updateView, this);

//            //////console.log("this.dataSet",this.dataSet);


    };



    p.sup_passInteraction = p.passInteraction;
    p.passInteraction = function(e) {
        this.sup_passInteraction(e);

        if (e.type=="onClick") {
            ////////console.log("new shit");
            //update the other collection

//            console.log("jkl", e.target.data.get("setLabel"));



            this.trigger("alert", e.target.data.get("setLabel"));




        }


    };







    p.populateRow = function() {

        for ( var i = 0; i < 7; i++) {
            var t = this.bulbSet[i];
            var g = this.data.bulbCollection.models[i]
            t.setData(g);


        }

    }

//    example of how to override using super

    p.sup_setData = p.setData;
    p.setData = function(data) {

        this.sup_setData(data);
        this.data.bulbCollection.bind('change', this.updateView, this);

//        trace("666")
        this.populateRow();

        //console.log("data",this.data.cid,this.data.bulbCollection);

    };

    p.updateView = function(e) {
        //this.setColor(this.data.attributes.setColor);
        console.log("updateView rowbulb!",e);
        // this.populateRow();
    }



    window.SElementBulbRow = SElementBulbRow;

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

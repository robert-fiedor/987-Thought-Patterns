
require('classes/SElementBulbRow');
require('classes/additional/MessageBox');

(function(window) {

    function PatternPage() {
        this.initialize();
    }

    PatternPage.prototype = new Container();
    PatternPage.prototype.Container_initialize = PatternPage.prototype.initialize;

    PatternPage.prototype.initialize = function() {
        this.Container_initialize();
    };

    PatternPage.prototype.patternRowCollection;
    PatternPage.prototype.mezzData;
    PatternPage.prototype.messageBox;

    PatternPage.prototype.verticalCounter
    PatternPage.prototype.prevVerticalCounter
    PatternPage.prototype.horizontalCounter

    PatternPage.prototype.init = function(dataSet) {
        this.verticalCounter=0
        this.prevVerticalCounter=0
        this.horizontalCounter=0

        this.messageBox = new MessageBox();
        this.addChild(this.messageBox);
        this.messageBox.y=660* window.resize;
        this.messageBox.x=55* window.resize;
        this.messageBox.init()

        var that=this;

        this.mezzData=dataSet;

        var list = new RFScrollableList();
        this.addChild(list);

        var BulbModel = Backbone.Model.extend({
            defaults: {setLabel:"EMPTY",setColor:30}
        });

        var BulbCollection = Backbone.Collection.extend({
            model : BulbModel
        });

        var PatternRowModel = Backbone.Model.extend({
            initialize : function() {
                this.bulbCollection = new BulbCollection;
            }
        });

        var PatternRowCollection = Backbone.Collection.extend({
            model : PatternRowModel
        });

        this.patternRowCollection = new PatternRowCollection();

        for ( var i = 0; i < 10; i++) {

            var m = new PatternRowModel();
            this.patternRowCollection.add(m);

            for ( var j = 0; j < 7; j++) {
                var mB = new BulbModel();
                m.bulbCollection.add(mB);
            }

        }

        list.init("y",SElementBulbRow,{w:(82*7)* window.resize,h:78* window.resize},6,this.patternRowCollection,30);
        list.y=150* window.resize;
        list.x=60* window.resize;


        for (var i = 0; i < list.theArr.length; i++) {
            var t = list.theArr[i];

            t.on("alert", function(msg) {

//                console.log("msg",msg);

                that.messageBox.setMessage(msg)

            });

        }




        this.mezzData.on("add", function(ship) {

            //this///

            // 7

            that.prevVerticalCounter=that.verticalCounter
            that.verticalCounter = (that.mezzData.length/7).toString().split(".")[0]

//            console.log("after",;


            if( (that.mezzData.length/7).toString().split(".")[1] ==undefined ) that.verticalCounter = that.prevVerticalCounter;

            console.log("that.prevVerticalCounter,this.verticalCounter",that.prevVerticalCounter,that.verticalCounter);
            //  console.log("that.mezzData.length",that.mezzData.length,"/7",that.mezzData.length/7);



//            console.log("calculation",calculation)

            if(that.prevVerticalCounter!=that.verticalCounter) {that.horizontalCounter=0}

            var t = that.patternRowCollection.at(that.verticalCounter).bulbCollection.at(that.horizontalCounter);

            t.set({setColor:ship.get('setColor'),setLabel:ship.get('setLabel')});

            that.horizontalCounter++

        });



    }


    window.PatternPage = PatternPage;

}(window));

















require('classes/SElementMainBtn');

(function(window) {

    function PlusPage() {
        this.initialize();
    }

    PlusPage.prototype = new Container();

    PlusPage.prototype.Container_initialize = PlusPage.prototype.initialize;

    PlusPage.prototype.popUp;

    PlusPage.prototype.switch;
    PlusPage.prototype.list;

    PlusPage.prototype.mainBulb;
    PlusPage.prototype.state = "STATE_DEFAULT"

    PlusPage.prototype.currentlyEdited;

    PlusPage.prototype.gr;
    PlusPage.prototype.backBlink;

//    tinyBulbs_black.png
//    tinyBulbs_red.png
//    tinyBulbs_yellow.png

    PlusPage.prototype.redLamp;
    PlusPage.prototype.yellowLamp;

    //DEFAULT_STATE

    PlusPage.prototype.initialize = function() {
        this.Container_initialize();
    };


    PlusPage.prototype.mezzData;
    PlusPage.prototype.init = function(dataSet,mezzData,popUp,mainBulb) {


        var tempYoff = 10

        this.redLamp = new RFButtonBitmap2()
        this.redLamp.init("images/tinyBulbs_black.png","images/tinyBulbs_red.png")
        this.addChild(this.redLamp)
        this.redLamp.x=50
        this.redLamp.y=(640)* window.resize+tempYoff


        this.yellowLamp = new RFButtonBitmap2()
        this.yellowLamp.init("images/tinyBulbs_black.png","images/tinyBulbs_yellow.png")
        this.addChild(this.yellowLamp)
        this.yellowLamp.x=249
        this.yellowLamp.y=(640)* window.resize+tempYoff


//        rec.y=

        this.mezzData=mezzData;

        this.mainBulb=mainBulb

        this.gr = new createjs.Graphics();
        this.backBlink = new createjs.Shape(this.gr);

        this.gr.beginFill(Graphics.getHSL(10,100,50,0.00));
        this.gr.drawRoundRect ( 0 , 0 , 360 , 640 , 20 );

        this.addChild(this.backBlink);

        this.list = new RFScrollableList();
        this.addChild(this.list);




        this.list.init("y",SElementMainBtn,{w:535* window.resize,h:90* window.resize},5,dataSet,20);

//        window.deb.add(this.list.rail,"y","rail.y");

        this.list.y=160* window.resize;
        this.list.x=52* window.resize;

        this.addToMezz = _.bind( this.addToMezz, this );

        var that=this;

        for ( var i = 0; i < this.list.theArr.length; i++) {

            var t = this.list.theArr[i];

            t.on("EVENT_INTERACTION", function(e){

                if(e.type=="onClick") {

                    console.log("button in question");

                    if(that.state=="STATE_EDIT") {
                        that.popUp.show();
                        that.currentlyEdited=e.target.parent.data
                        console.log("currentlyEdited",that.currentlyEdited);

                        //that.currentlyEdited.set()

//                        this.list.visible=false;
                    }

                    if(that.state=="STATE_DEFAULT") {

                        if(e.target.parent.data.get('setLabel')!="EMPTY") that.addToMezz(e.target.parent.data);

                    }

                }

            })

        }

        var offset=130* window.resize;
//        switch_default.png
//        switch_edit.png


        this.switch = new RFButtonBitmap2();
        this.switch.init("images/switch_default.png","images/switch_edit.png",true, "EVENT_SWITCH");
        this.addChild(this.switch);
        this.switch.y=664* window.resize
        this.switch.x=220* window.resize//+offset;

        var offsx = 50* window.resize
        var offsy = 7* window.resize

        var rec = new Bitmap("images/copy_record.png");
        this.addChild(rec)
        rec.y=(662+offsy)* window.resize+tempYoff
        rec.x=40* window.resize

        var edit = new Bitmap("images/copy_edit.png");
        this.addChild(edit)
        edit.y=(662+offsy)* window.resize+tempYoff
        edit.x=465* window.resize;


//    p.add = function(t, property, name) {


        this.switch.on("EVENT_SWITCH", function(msg) {

            if(msg.target.stateNo==2) {
                that.setState("STATE_EDIT");

            }
            if(msg.target.stateNo==1) {
                that.setState("STATE_DEFAULT");


            }


        });

        this.setState("STATE_EDIT")


        this.popUp=popUp;
        this.popUp.init(this);

        this.popUp.on("HIDE_POPUP", function() {

//            console.log("lokalizacja",that.popUp.popData,that.currentlyEdited);
//            console.log("that.currentlyEdited",that.currentlyEdited);

            that.currentlyEdited.set(that.popUp.popData)


            that.setState("STATE_DEFAULT");
//            that.popUp.hide();

            //tutaj wpisz resultat do currentlyEdited


        })



    }

    PlusPage.prototype.setState = function (state) {

        this.state=state;

        if(state=="STATE_DEFAULT") {
            this.switch.setState(1);

            this.yellowLamp.setState(1);
            this.redLamp.setState(2);

        }

        if(state=="STATE_EDIT") {
            this.switch.setState(2);
            this.yellowLamp.setState(2);
            this.redLamp.setState(1);

        }





    }



    PlusPage.prototype.addToMezz = function(data) {

        //uruchom blink
        var t = data.clone();

        this.backBlink.alpha=1
        this.gr.clear();
        this.gr.beginFill(Graphics.getHSL(t.get("setColor"),100,50,0.45));
        this.gr.drawRoundRect ( 0 , 0 , 360 , 640 , 20 );


        var tween = createjs.Tween.get(this.backBlink).to({alpha:0}, 1500, createjs.Ease.cubicInOut)

        console.log("xx", data);



        this.mezzData.add(t);

        this.mainBulb.setColor(t.get("setColor"));

        ////console.log("666 ",this.mezzData.length, t);


    }





    window.PlusPage = PlusPage;

}(window));


//        var m = new DonutModel();
//        m.set({setLabel:i+"!!!!"})
//        donuts.add(m);
















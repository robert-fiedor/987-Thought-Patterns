

(function() {

    var Bulb = function() {this.initialize();}

    Bulb.prototype = p = new Container();

    p.label;
    p.background;
    p.text;

    p.width;
    p.height;

    p.top;
    p.bottom;

    p.gr;

    p.data;

    p.cached=false

    p.firstTimeDark = false;

    p.init = function() {

        var sqback =new  RFBlock();
        sqback.setSize(82* window.resize,78* window.resize);

//        ,{w:82*7,h:78}
        this.addChild(sqback);
        sqback.alpha=0.01;

        this.bottom = new Bitmap("images/bulbBack.png");
        this.addChild(this.bottom);

        this.gr = new createjs.Graphics();
        var color = Rnd.integer(0,360);

        this.top = new createjs.Shape(this.gr);   // new Bitmap("images/bulbTop.png");

        this.top.x = 37* window.resize;
        this.top.y = 38* window.resize;

        this.addChild(this.top);

        this.gr.beginFill(Graphics.getHSL(0,100,5,0.85));
        this.gr.drawCircle(0,0,(47/2)* window.resize);

        this.temp2 = _.bind( this.temp2, this );
        setTimeout(this.temp2,1500);


    };


    p.temp2=function(){



        this.cache(0,0,82*window.resize,78*window.resize    );
        this.cached=true;
        this.updateCache();


    }

    p.setColor = function(n) {

        this.gr.clear()

        this.gr.beginFill(Graphics.getHSL(n,100,50,(this.firstTimeDark)? 0.1 : 0.45));
        this.gr.drawCircle(0,0,(47/2)* window.resize);

        this.firstTimeDark=false;

        if(this.cached)this.updateCache();



    }

    p.setData = function (data) {

//        console.log("666",data);

        this.data=data;

        console.log("*",data.get("setLabel"));

        //////console.log("bulb setData should change view",data.attributes.setColor);

        this.data.bind('change', this.updateView, this);

        this.updateView();
        // on change should change kuzwa
        //this.data
    }


    p.updateView = function(e) {
        this.setColor(this.data.attributes.setColor);
    }

    p.revert = function() {
        this.justReverted=true;
    }

    p.onClick = function(e) {

        if(!this.justReverted) {
            this.reportInteraction(e);
            this.justReverted=false;

        }
    }

    p.onPress = function(e) {
        //////////console.log("qqq");
        this.reportInteraction(e);
    }




    window.Bulb = Bulb;

}());
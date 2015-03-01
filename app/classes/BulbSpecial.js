

(function() {

    var BulbSpecial = function() {this.initialize();}

    BulbSpecial.prototype = p = new Container();

    p.label;
    p.backlayer1ound;
    p.text;

    p.width;
    p.height;

    p.top;
    p.bottom;

    p.layer1;

    p.data;

    p.init = function() {

        var sqback =new  RFBlock();
        sqback.setSize(82* window.resize,78* window.resize);

//        ,{w:82*7,h:78}
        this.addChild(sqback);
        sqback.alpha=0.01;

        this.bottom = new Bitmap("images/specialBulb.png");
        this.addChild(this.bottom);
//        this.bottom.alpha=0.5

        this.layer1 = new createjs.Graphics();
        var color = Rnd.integer(0,360);

        this.top = new createjs.Shape(this.layer1);   // new Bitmap("images/bulbTop.png");

        this.top.x = 37* window.resize;
        this.top.y = 38* window.resize;

        this.addChild(this.top);

        this.layer2 = new createjs.Graphics();

        this.topper = new createjs.Shape(this.layer2);
        this.addChild(this.topper);

        this.topper.x = 37* window.resize;
        this.topper.y = 38* window.resize;

        var blurFilter = new BoxBlurFilter(8* window.resize, 8* window.resize, 5);
        var margins = blurFilter.getBounds();

        this.topper.filters = [blurFilter];
        // filters are only displayed when the display object is cached
        // later, you can call updateCache() to update changes to your filters


        this.topper.cache(-100* window.resize,-100* window.resize,200* window.resize,200* window.resize);
//        this.topper.x += this.topper.x+this.layer2.width;
//        this.addChild(bmp);

//        this.layer1.beginFill(Graphics.getHSL(0,100,5,0.85));
//        this.layer1.drawCircle(-20,-20,12);



//        this.temp2 = _.bind( this.temp2, this );
//        setTimeout(this.temp2,1500);

        this.resetAnim = _.bind( this.resetAnim, this );




    };


    p.temp2=function(){

//        this.cache(0,0,82,78    );


    }

    p.setColor = function(n) {

//        this.layer1.clear()
//        this.layer2.clear()
//
//        this.layer1.beginFill(Graphics.getHSL(n,100,50,0.45));
//        this.layer1.drawCircle(0,0,(47/2)* window.resize);
//
//
//        this.layer2.beginFill(Graphics.getHSL(n,100,50,0.45));
//        this.layer2.drawCircle(0,0,(74/2)* window.resize);
//
//        this.topper.updateCache()
//
//        TweenLite.to(this.top, 1, {alpha:1});
//        this.topper.alpha=0
//
//        TweenMax.to(this.topper, 0.5, {alpha:1,  scaleX:1,scaleY:1, onComplete:this.resetAnim});



    }

    p.resetAnim = function  () {
        this.topper.alpha=0;
        TweenLite.to(this.top, 3, {alpha:0,delay:1});

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




    window.BulbSpecial = BulbSpecial;

}());
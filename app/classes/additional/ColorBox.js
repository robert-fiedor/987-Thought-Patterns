

(function() {

    var ColorBox = function() {this.initialize();}

    ColorBox.prototype = p = new Container();

    p.gr;
    p.colorPart;

    p.colorArr;

    p.currColor;

    p.bottom;


    p.init = function() {


        this.bottom = new Bitmap("images/bulbBack.png");
        this.addChild(this.bottom);


        this.gr = new createjs.Graphics();


        this.colorPart = new createjs.Shape(this.gr);   // new Bitmap("images/ColorBoxTop.png");

       this.setColor(10);

        this.onPress = _.bind( this.onPress, this );

        console.log("...");
        this.addChild(this.colorPart);

        this.colorArr = new Array();

        for ( var i = 0; i < 36; i++) {
            this.colorArr.push(i*10);
        };

        this.colorPart.x = 37* window.resize;
        this.colorPart.y = 38* window.resize;

    };


    p.setColor = function(n) {
        this.currColor=n;
        this.gr.clear()
        this.gr.beginFill(Graphics.getHSL(n,100,50,0.45));
        this.gr.drawCircle(0,0,(47/2)* window.resize);
    }


    p.onPress = function(e) {



        this.setColor(this.colorArr[Rnd.integer(0,35)])

    }

    p.pluck = function() {

    }


    window.ColorBox = ColorBox;

}());/**
 * Created with JetBrains WebStorm.
 * User: Robert
 * Date: 10/16/12
 * Time: 8:41 PM
 * To change this template use File | Settings | File Templates.
 */

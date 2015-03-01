
(function(window) {

    function Curtain() {
        this.initialize();
    }

    Curtain.prototype = new Container();
    Curtain.prototype.Container_initialize = Curtain.prototype.initialize;	//unique to avoid overiding base class

    Curtain.prototype.img1;
    Curtain.prototype.img2;

    Curtain.prototype.initialize = function() {

        this.Container_initialize();

        this.img1 = new Bitmap("images/curtains_01.png");
        this.img2 = new Bitmap("images/curtains_02.png");
        this.addChild(this.img1);
        this.addChild(this.img2);

        this.img1.x=-320* window.resize;
        this.img2.x=640* window.resize;

        this.backo = _.bind( this.backo, this );

//        setTimeout(this.backo,2000)

    };

    Curtain.prototype.do = function() {
        TweenLite.to(this.img2,0.5,{x:320,onComplete:this.backo});
        TweenLite.to(this.img1,0.5,{x:0 });
    };

    Curtain.prototype.backo = function() {
        TweenLite.to(this.img2,0.5,{x:640,delay:0.3});
        TweenLite.to(this.img1,0.5,{x:-320,delay:0.3 });
    }

    window.Curtain = Curtain;

}(window));















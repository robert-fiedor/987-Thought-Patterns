
(function(window) {

    function RFBlock() {
        this.initialize();
    }

    RFBlock.prototype = new Container();
    RFBlock.prototype.Container_initialize = RFBlock.prototype.initialize;	//unique to avoid overiding base class

    RFBlock.prototype.data={color:"#FFF"};

    RFBlock.prototype.width=100;
    RFBlock.prototype.height=100;

    RFBlock.prototype.theShape=null;

    RFBlock.prototype.initialize = function() {
        this.Container_initialize();

        this.theShape = new Shape();
        this.addChild(this.theShape);

    };

    RFBlock.prototype.init = function(data) {
        this.drawUI();
        if (!data ) {this.data.color = "#FFF"} else {this.data=data }
    };


    RFBlock.prototype.drawUI = function() {

        this.theShape.graphics.clear();
        this.theShape.graphics.beginFill(this.data.color);
        this.theShape.graphics.lineTo(this.width, 0);
        this.theShape.graphics.lineTo(this.width, this.height);
        this.theShape.graphics.lineTo(0,this.height);
        this.theShape.graphics.lineTo(0,0 );
        this.theShape.graphics.closePath();
        this.theShape.graphics.endFill();

    };

    RFBlock.prototype.setSize = function(passW,passH) {
        this.width=passW;
        this.height=passH;

        this.drawUI();
    };

    RFBlock.prototype.setWidth = function(pass) {
        this.width=pass;
        this.drawUI();
    };

    RFBlock.prototype.setHeight = function(pass) {
        this.height=pass;
        this.drawUI();
    };

    RFBlock.prototype.setGridX = function(val) {
        this.gridX=val;
    };

    RFBlock.prototype.setGridY = function(val) {
        this.gridY=val;
    };

    window.RFBlock = RFBlock;
}(window));














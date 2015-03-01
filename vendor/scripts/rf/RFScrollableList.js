
(function(window) {

    function RFScrollableList() {
        this.initialize();
    }

    RFScrollableList.prototype = p = new Container();

    p.Container_initialize = p.initialize;

    p.initialize = function() {
        this.Container_initialize();

        this.indexArr= new Array()
    };

    p.background = new RFBlock();

    p.curVal=null;
    p.prevVal;
    p.timer;
    p.targetProp;
    p.mouseDown;

    p.val;
    p.distance;

    p.dataSet;

    p.arr = new Array();

    p.theShape;
    p.width;
    p.height;

    p.theArr = [];

    p.currentX = 0;
    p.lastX = 0;
    p.isDragging =false;

    p.offset;
    p.speed;
    p.vx=0;

    p.upperBorder;
    p.lowerBorder;

    p.elementSize;
    p.direction;
    p.howMany;

    p.mouseDownPoint  = new Point();
    p.lastMouseDownPoint  = new Point();
    p.allowMouseMove = false;

    p.canvasHeight  = 0;

    p.prevIndex;
    p.index = 0;
    p.indexArr ;
    p.allowJump = false
    p.allowScroll=true;

    p.speedCap;
    p.mainContainer;
    p.background;
    p.currentRevert;

    p.allow=true;

//    p.debug;


    p.proxyMove=null;
    p.proxyUp=null;


    p.init = function( targetProp,
                       targetClass,
                       size,
                       howMany,
                       dataSet,
                       speedCap
        ) {

        var that=this;

        if(!speedCap){this.speedCap=5} else {this.speedCap=speedCap};

        //console.log("this.speedCap",this.speedCap);

        this.elementSize = size;
        this.targetProp = targetProp;

        this.dataSet = dataSet;

        this.width = size.w
        this.height = size.h*(howMany);

        this.upperBorder = -size.h;
        this.lowerBorder = this.height;

        //////////console.log("this.lowerBorder",this.lowerBorder);

        this.howMany=howMany

//        this.background = new RFBlock();
//
//        this.background.setSize(200,200)
//        this.background.x=-20;


        this.mainContainer = new createjs.Container();
//        this.mainContainer.addChild(this.background);


        this.addChild(this.mainContainer);


        this.theArr = [];

        this.rail = new RFBlock();
        this.rail.setSize(100,this.dataSet.length*this.elementSize.h);
//        this.addChild(this.rail)

        //////////console.log("this.dataSet.length",this.dataSet.length);
        var hm = this.dataSet.length;
        for ( var i = 0; i < hm; i++) {
            //////////console.log("o");
            this.indexArr.push(-i*  size.h)//this.elementSize.h);
        }

        //////////console.log("this.elementSize.h",this.elementSize.h);
        //////////console.log("this.indexArr",this.indexArr);

        for ( var i = 0; i < howMany+1; i++) {
            var t = new targetClass();
            this.mainContainer.addChild(t);
            t.init();
            t.setSize(size.w,size.h)
            t.y=size.h*i;


            t.setList(this)
            t.setSetters( this.dataSet.models[i].attributes );
            t.setData(this.dataSet.models[i])

            //////console.log("3",this.dataSet.models[i]);

            t.offset=0;
            this.theArr.push(t);

            t.on("EVENT_INTERACTION", function(e) {


                    if(e.type=="onPress") {
                        that.onPresso(e)
                    }

                    if(e.type=="onClick") {
                        //////console.log("klik!");
                    }


                }
            )

        }

        //////console.log("4");

        this.theShape  = new createjs.Shape();
        this.theShape.graphics.clear();
        this.theShape.graphics.beginFill("rgba(255,0,0,0.75)");
        this.theShape.graphics.lineTo(this.width, 0);
        this.theShape.graphics.lineTo(this.width, this.height);
        this.theShape.graphics.lineTo(0,this.height);
        this.theShape.graphics.lineTo(0,0 );
        this.theShape.graphics.closePath();
        this.theShape.graphics.endFill();

        this.mainContainer.mask = this.theShape;

        RF.stage.onMouseMove = null;
        RF.stage.onMouseUp= null;

        Ticker.addListener(this);


//        this.dataSet.on("add", function(msg) {
//            ////////console.log(">>>>> got it ",this.dataSet.length);
//
//            this.theArr[0].setSetters( this.dataSet.models[10].attributes );
//
//        },this);

//        ////////console.log("this.height",this.height);


//        this.debug = new createjs.Text("TEMP", "30px Arial", "#FFF");
//        this.debug.text = "sksks";
//        this.addChild(this.debug);
//        this.debug.x=150;
//        this.debug.y=-50;



    };

    p.setThisOne = function(e) {
    }


    p.setAllow = function(b) {

        this.allow=b;

        if(b) {
            Ticker.addListener(this);
        } else {
            Ticker.removeListener(this)

        }



    }

    p.onPresso = function(e) {

        //console.log("onPresso",e, this);

        if(this.allow) {

            this.currenX =  RF.stage.mouseY;

            this.currentRevert = e.target;

            RF.stage.onMouseMove  = _.bind(this.onMouseMove, this );
            RF.stage.onMouseUp  = _.bind(this.onMouseUpo, this );

            this.isDragging = true;
            this.offset = this.globalToLocal(e.stageX,e.stageY).y - this.rail.y


        }

//        e.target.revert();
    };

    p.onMouseUpo = function(e) {
        if(this.allow) {
//        this.alpha=0.5;

            console.log("upup   ");

            this.isDragging = false;

//            $(RF.stage.onMouseMove).unbind("this.onMouseMove");
//            $(RF.stage.onMouseUp).unbind("this.onMouseUpo");

            RF.stage.onMouseMove=null
            RF.stage.onMouseUp=null

            this.currentRevert = e.target;
        }

    }

    p.onMouseMove = function(e) {

        ////////console.log("onMouseMove");
        if(this.allow) {
            if(this.currentRevert) {
                this.currentRevert.revert();
                this.currentRevert=null;

            }

            if(this.isDragging) {
                this.rail.y = this.globalToLocal(e.stageX,e.stageY).y - this.offset;
                this.handleMove();

            }
        }
    }

    p.tick = function() {

        if( Math.abs(this.vx) < 0.5) this.vx = 0;

        if( Math.abs(this.vx) > this.speedCap) {

            if(this.vx>0) { this.vx=this.speedCap}
            if(this.vx<0) {this.vx=-this.speedCap}

        }

        if(this.isDragging) {

//            this.debug.text = "cX "+this.currentX +"..."+"lastX"+this.lastX;

            this.lastX = this.currentX;
            this.currentX = RF.stage.mouseY;

//            if(this.currentX - this.lastX==0) {this.debug.text = "zero"} else {this.debug.text = "i"}

            this.vx = this.currentX - this.lastX;

        } else {

            this.rail.y += this.vx;
            this.handleMove();



//            this.x++
//
//            if(Rnd.integer(1,50)==10) {


//            }


        }


        if( Math.abs(this.vx) < 0.5) this.vx = 0;


        if( Math.abs(this.vx) > this.speedCap) {

            if(this.vx>0) { this.vx=this.speedCap}
            if(this.vx<0) {this.vx=-this.speedCap}

        }

        this.vx *= 0.95;

    }

    p.handleMove = function() {

//        ////////console.log("this.elementSize.h",this.elementSize.h);

        if (this.rail.y > 0) {
            this.rail.y=0;
        }

        if (this.rail.y < this.height-this.rail.height) {
            this.rail.y=this.height-this.rail.height
        }

        for ( var i = 0; i < this.theArr.length; i++) {
            var t = this.theArr[i];

            if (this.allowScroll) t.y = this.rail.y - this.indexArr[i] + (this.howMany+1)*this.elementSize.h* t.offset;

            if(t.y<this.upperBorder) {
                t.offset++;
                this.setIndex(this.index+1,this.upperBorder,t,i)
            }
            if(t.y>this.lowerBorder) {

                t.offset--;

                this.setIndex(this.index-1 ,this.lowerBorder,t,i)
            }
        }
    }

    p.setIndex = function(inn,where,t,i) {

        ////console.log("###",this.index+this.howMany);

        //   ////////console.log("this.dataSet.models[this.index]",this.dataSet,this.index);
        //   ////////console.log("ZZZ",this.dataSet.models[this.index].attributes);

        this.index=inn;
        if(where==this.upperBorder) {
            this.theArr[i].setSetters( this.dataSet.models[this.index+this.howMany].attributes );
            this.theArr[i].setData( this.dataSet.models[this.index+this.howMany])
        }

        if(where==this.lowerBorder) {
            this.theArr[i].setSetters( this.dataSet.models[this.index].attributes );
            this.theArr[i].setData(this.dataSet.models[this.index])
        }

//        ////////console.log("end");
    }

    window.RFScrollableList = RFScrollableList;

}(window));

















/**
 * Created with JetBrains WebStorm.
 * User: Robert
 * Date: 9/12/12
 * Time: 4:36 PM
 * To change this template use File | Settings | File Templates.
 */

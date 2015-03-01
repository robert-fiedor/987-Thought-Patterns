/**
 * View Description
 *
 * @langversion JavaScript
 *
 * @author
 * @since
 *
 * http://krasimirtsonev.com/blog/article/javascript-managing-events-dispatch-listen
 * So, to pass params, all you need to do is save off the super initialize method, overwrite it, and then call it with the appropriate params. Similar to draw in all the DisplayObject subclasses. It's clearer in code:
 * https://groups.google.com/forum/#!topic/easeljs/qdK6VFSACQw
 * scrolling explained: http://stackoverflow.com/questions/2863547/javascript-scroll-event-for-iphone-ipad
 *
 * javascript frameworks http://www.remotesynthesis.com/post.cfm/50-javascript-html5-frameworks-and-related-tools
 *
 * http://stackoverflow.com/questions/10866976/mouse-click-or-touch-events-on-canvas-causes-selection-using-html5-phonegap-a
 *
 * MEETING:
 * https://github.com/jamesor/backbone-demo
 */

var View = require('./supers/View');
var template = require('./templates/HomeViewTemplate');

require('classes/additional/Curtain');
require('classes/nav/ScreenManager');

require('classes/pages/PlusPage');
require('classes/pages/InfoPage');
require('classes/pages/PatternPage');
require('classes/PopUp');
require('classes/BulbSpecial');

//require('rf/RF');


//var MyClass = require('classes/MyClass');

//require

module.exports = View.extend({

    //--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------

    /*
     * @private
     */
    id: 'home-view',
    /*
     * @private
     */
    template: template,

    myC:null,
    stage:null,

    plusPage:null,
    theH:null,


    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------

    /*
     * @private
     */
    initialize: function() {

        this.render = _.bind( this.render, this );

        //   console.log(">>>", $(this.el), $("#home-view"),document.getElementById("home-view"));

    },

    /*
     * @private
     */
    render: function() {


        window.resize=0.5;

        var canvas = document.createElement("canvas");
//        $(this.el).width(640);
//        $(this.el).height(420);
//        $(this.el).tabindex=1;
//        tabindex="1"

//        addBtnDef.png
//        addBtnDown.png
//        box.png
//        deleteBtnDef.png
//        deleteBtnDown.png
//        mainBtn.png
//        mainMessage.png
//        popUp.png
//        stitch.png

        $(this.el).append(canvas);

//        $(this.el).append('<div id="mainTextfield" class="tha">' +
//            '</br>' +
//            '<input type="text" name="user" id="un" value="" placeholder="write your " />' +
//            '</div>');

        canvas.width=640* window.resize;
        canvas.height=920* window.resize;

        this.stage = new Stage(canvas);
        this.stage.tickOnUpdate=true;

        window.deb=new RFDebug();
        deb.init(500,300,600);
        deb.x=160;


        //Touch.enable = function(stage, singleTouch, allowDefault) {
        Touch.enable ( this.stage , true , false );
        RF.stage=this.stage;

        //Stage
        //BACKGROUND
        var bmp = new Bitmap("images/BACK.jpg");
        this.stage.addChild(bmp);

        //SCREENMANAGER

        var MainBtnModel = Backbone.Model.extend({
            defaults: {setLabel:"BEDZIE OK",setColor:111}
        });

        var MainBtnCollection = Backbone.Collection.extend({
            model : MainBtnModel
        });

        var mainBtnCollection = new MainBtnCollection();

        for ( var i = 0; i < 20; i++) {
            var m = new MainBtnModel();
            mainBtnCollection.add(m);
            m.set({setLabel:'EMPTY', setColor:30})
        }

        var MezzData = Backbone.Collection.extend({
            model : MainBtnModel
        });
        var mezzData = new MezzData();

        var patternPage = new PatternPage();
        patternPage.init(mezzData);

        var popUp = new PopUp();

        var mainBulb = new BulbSpecial();

        // passing 2 datasets
        this.plusPage = new PlusPage();
        this.plusPage.init(mainBtnCollection,mezzData,popUp,mainBulb);

        var infoPage = new InfoPage();

        var screenManager = new ScreenManager();
        screenManager.init([this.plusPage,patternPage,infoPage]);
        this.stage.addChild(screenManager);

        //CURTAIN
//        curtain = new Curtain();
        //        this.stage.addChild(curtain);

        //NAV
        var navBtn1 = new RFButtonBitmap();
        navBtn1.init("images/Navigation_def_01.png","images/Navigation_down_01.png");
        this.stage.addChild(navBtn1);
        navBtn1.y=774* window.resize;
        navBtn1.setState(2)


        var navBtn2 = new RFButtonBitmap();
        navBtn2.init("images/Navigation_def_02.png","images/Navigation_down_02.png");
        this.stage.addChild(navBtn2);
        navBtn2.x=216* window.resize;
        navBtn2.y=774* window.resize;

        var navBtn3 = new RFButtonBitmap();
        navBtn3.init("images/Navigation_def_04.png","images/Navigation_down_04.png");
        this.stage.addChild(navBtn3);
        navBtn3.x=(216+205)* window.resize;
        navBtn3.y=774* window.resize;

        var nav = require('classes/nav/RFNav');
        nav.setup([navBtn1,navBtn2,navBtn3]);
        nav.setPageEvent("PAGE_CHANGE_EVENT")
        //SCREENMANAGER
        screenManager.setController(nav,"PAGE_CHANGE_EVENT");

        console.log("RF",RF,"<<<");

        //FOOTER
        var f = new Bitmap("images/footer.png");
//        this.stage.addChild(f);
        f.y=833* window.resize;

        //TOP
        var top = new Bitmap("images/top.png");
        this.stage.addChild(top);

        var box = new  Bitmap("images/box.png");
        this.stage.addChild(box);
        box.x=30* window.resize;
        box.y=120* window.resize;

        Ticker.addListener(this);
        Ticker.setFPS(30);

//        setTimeout(this.getcarter,2500);



//        this.plusPage.list.setAllow(false)

        var that=this;
        
        $(this.el).append('<div><input id="mainTextfield" value="Tap here" type="text" name="firstname"  ></div>');


        this.onReady = _.bind( this.onReady, this );
        setTimeout(this.onReady,1500);

        popUp.on("SHOW_POPUP", function(msg) {
            $("#mainTextfield").css("display","inline");
            $("#mainTextfield").val('Tap here');
//            value="Tap here"
        });

        popUp.on("HIDE_POPUP", function(msg) {
            $("#mainTextfield").css("display","none");
            console.log("result", $("#mainTextfield").val());
        });

        this.stage.addChild(popUp);

        var stitch = new Bitmap("images/stitch.png");
        this.stage.addChild(stitch)
        stitch.y=745* window.resize;

        this.stage.addChild(mainBulb)
        mainBulb.init();
        mainBulb.scaleX=0.4
        mainBulb.scaleY=0.4
        mainBulb.x=292* window.resize;
        mainBulb.y=42* window.resize;


//        this.stage.addChild(deb);

        return this;

    },



    onReady:function (e) {
        console.log("ready");
        var that=this;

        $("#mainTextfield").blur( function(msg) {
            console.log("lostBlur");
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        })

        $("#mainTextfield").focus( function(msg) {
            console.log("focus");
            $("#mainTextfield").val('')
        })

    },

    updateView: function() {
        //  console.log(">>>", $(this.el), $("#home-view"),document.getElementById("home-view"));



    },

    myFunction: function(e) {
        console.log("eee",e);
    },

    tick: function() {
        this.stage.update();
    },

    /*
     * @private
     */
    getRenderData: function() {
        return {
            content: "Application Contentoooooo"
        }
    }

    //--------------------------------------
    //+ PUBLIC METHODS / GETTERS / SETTERS
    //--------------------------------------

    //--------------------------------------
    //+ EVENT HANDLERS
    //--------------------------------------

    //--------------------------------------
    //+ PRIVATE AND PROTECTED METHODS
    //--------------------------------------

});

//example of how to override using super
//    p.sup_setSize = p.setSize;
//    p.setSize = function(w,h) {
//        this.sup_setSize(w,h);
//    };


// setInterval(this.donow,1000);
//
//donow:function () {
//
//    var smallSh = new Bitmap("images/btn1.png");
//    this.stage.addChild(smallSh);
//
//    TweenLite.to(smallSh, 1, {x:200,y:300});
//
//},

//        this.el.width=640;
//        this.el.height=920;

//        canvas = document.createElement("canvas");
//        canvas.width = "640";
//        canvas.height = "920"; // allow 40 pixels for status bar on iOS
//        canvas.style.width = "320px";
//        canvas.style.height = "460px";



//        console.log("t",t);
//        t.getElementById('mainTextfield');




//console.log("t",t);


//        $(t).hide();
//        $("#home-view").hide();
//       $('mainTextfield').append('');

//       $(this.el).append('<div>sdsdd</div>');


//       $(this.el).append(' <a href="#popupPadded" data-rel="popup" data-role="button">Popup with padding</a>');


(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"Application": function(exports, require, module) {
  //JavaScript////////////////////////////////////////////////////////////////////
  // 
  // Copyright 2012 
  // 
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Application Bootstrapper
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  Application = {

      //--------------------------------------
      //+ PUBLIC PROPERTIES / CONSTANTS
      //--------------------------------------

      //--------------------------------------
      //+ INHERITED / OVERRIDES
      //--------------------------------------

      initialize: function() {

  //        require('vendor/scripts/TweenLite')
          // Import views

  //        require('views/supers/View')
          var HomeView = require('views/HomeView');

          var Router = require('routers/Router');

          // Initialize views
          this.homeView = new HomeView();
          this.router = new Router();

  //        console.log("fin",document.getElementById("testCanvas"));


          if (typeof Object.freeze === 'function') Object.freeze(this);
      }
  }

  module.exports = Application;
  
}});

window.require.define({"classes/Bulb": function(exports, require, module) {
  

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
}});

window.require.define({"classes/BulbSpecial": function(exports, require, module) {
  

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
}});

window.require.define({"classes/PopUp": function(exports, require, module) {
  

  require('classes/additional/ColorBox');
  (function() {

      var PopUp = function() {this.initialize();}
      PopUp.prototype = p = new Container();

      p.controller;
      p.back;
      p.colorBox;

      p.popData;
      p.colorBox;

      p.init = function(controller) {

          this.colorBox = new ColorBox();

          this.colorBox.init();
          this.colorBox.y=450* window.resize;
          this.colorBox.x=400* window.resize;

          _.extend(this, Backbone.Events);

          this.controller=controller;

          this.back = new RFBlock();
          this.back.setSize(640* window.resize,920* window.resize)
  //        this.addChild(this.back);
          this.back.alpha=0.9

          this.back.onClick = null;
          this.back.onPress = null;

          console.log("789");
          var pop = new Bitmap("images/popUp.png");
          this.addChild(pop)
          pop.x=56* window.resize
          pop.y=150* window.resize

          this.hide();
          var offset=290* window.resize

          var deleteBtn = new RFButtonBitmap2();
          deleteBtn.init("images/deleteBtnDef.png","images/deleteBtnDown.png",false, "CANCEL");
          this.addChild(deleteBtn)
          deleteBtn.y=550* window.resize;
          deleteBtn.x=(0+offset)* window.resize;

          var addBtn = new RFButtonBitmap2();
          addBtn.init("images/addBtnDef.png","images/addBtnDown.png",false, "CONFIRM");
          this.addChild(addBtn);
          addBtn.y=550* window.resize;
          addBtn.x=(200+offset)* window.resize;

          var that=this;

          deleteBtn.on("CANCEL", function(msg) {
              that.clicked(msg)
          });

          addBtn.on("CONFIRM", function(msg) {
              that.clicked(msg)
          });

          this.addChild(this.colorBox);

      };


      p.clicked = function(e) {

          console.log("clicked !");

          this.hide()


      }




      p.show = function() {

          this.visible=true;
          this.trigger("SHOW_POPUP");

      }

      p.hide = function(surpress) {

          var that=this
          this.visible=false;

          this.popData={setColor:that.colorBox.currColor,setLabel:$("#mainTextfield").val()}

  //        console.log("!!!!!! popData",this.popData.setColor, this.popData.setLabel);

         if(!surpress) this.trigger("HIDE_POPUP");


      }







      window.PopUp = PopUp;

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
  
}});

window.require.define({"classes/SElementBulbRow": function(exports, require, module) {
  
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
  
}});

window.require.define({"classes/SElementMainBtn": function(exports, require, module) {
  

  require('classes/Bulb');

  (function() {

      var SElementMainBtn = function() {this.initialize();}
      SElementMainBtn.prototype = p = new RFScrollableElement();

      p.label;
      p.background;
      p.text;

      p.width;
      p.height;

      p.bulb;

      p.init = function(patternData) {

          var mainBtn = new RFButtonBitmap();
          mainBtn.init("images/mainBtn.png","images/mainBtnDown.png");

          this.passInteraction  = _.bind(this.passInteraction, this );
          mainBtn.reportInteraction = this.passInteraction;

          this.text = new createjs.Text("TEMP", "15px Arial", "#000");
          this.text.textBaseline = "top";

          this.text.x=80* window.resize;
          this.text.y=28* window.resize;

          this.bulb = new Bulb();
          this.bulb.init()

          this.bulb.scaleX=0.5
          this.bulb.scaleY=0.5

          this.bulb.x=30* window.resize
          this.bulb.y=25* window.resize

          this.bulb.revert=null;
          this.bulb.onClick=null;
          this.bulb.onPress=null;

          this.addChild(mainBtn,this.text,this.bulb);

  //        268x44

      };

      p.setLabel=function(label) {
          this.text.text=label;
      }

      p.setColor = function(color) {

          this.bulb.setColor(color)

      }

      p.sup_passInteraction = p.passInteraction;
      p.passInteraction = function(e) {
          this.sup_passInteraction(e);

          if (e.type=="onClick") {
              ////////console.log("new shit");
              //update the other collection
              console.log("jkl");



          }
      };


      p.sup_setData = p.setData;
      p.setData = function(data) {
          this.sup_setData(data);

          //console.log("q",data.get("setColor"),data.get("setLabel"));




          this.data.bind('change', this.updateView, this);

      };
      
      p.updateView = function () {
          this.setLabel(this.data.get("setLabel"));
          this.setColor(this.data.get("setColor"));

          console.log("qwerty");

          //how about updating everything inside
      }
      
      

      window.SElementMainBtn = SElementMainBtn;

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



  //        this.temp = _.bind( this.temp, this );

  //    p.temp=function(){
  ////        this.text.text=label;
  //        this.cache(0,0,472,96);
  //
  //        ////////console.log("temp");
  //    }



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
  //}());
}});

window.require.define({"classes/additional/ColorBox": function(exports, require, module) {
  

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
  
}});

window.require.define({"classes/additional/Curtain": function(exports, require, module) {
  
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














  
}});

window.require.define({"classes/additional/MessageBox": function(exports, require, module) {
  

  (function() {

      var MessageBox = function() {this.initialize();}

      MessageBox.prototype = p = new Container();

      p.text;

      p.init = function() {

          var background = new Bitmap("images/mainMessage.png");
          this.addChild(background);

          this.text = new createjs.Text("TEMP", "15px Arial", "#FFF");
          this.text.textAlign = "center"
          this.text.textBaseline = "top";

          this.text.x=260* window.resize;
          this.text.y=17* window.resize;

          this.text.text="Tap a bulb to reveal the thought"
          this.addChild(this.text);

      };




      p.setMessage = function(n) {

          this.text.text=n;

      }





      window.MessageBox = MessageBox;

  }());/**
   * Created with JetBrains WebStorm.
   * User: Robert
   * Date: 10/16/12
   * Time: 8:41 PM
   * To change this template use File | Settings | File Templates.
   */
  /**
   * Created with JetBrains WebStorm.
   * User: Robert
   * Date: 10/16/12
   * Time: 10:11 PM
   * To change this template use File | Settings | File Templates.
   */
  
}});

window.require.define({"classes/nav/RFNav": function(exports, require, module) {
  
  RFNav = (function() {

      var _foo = 'bar';
      var _show = false;

      var _btnArr=null;


      var _pageEvent=null;
      var _currSelected;

      var initialize = (function() {
          ////////console.log('Initialized');
      })();

      function show() {
          ////////console.log("show");
          // show view
      };

      function hide() {
          ////////console.log("hide");
          // hide view
      };

      return {

          getFoo: function() {
              return _foo;
          },

          getCurrSelected: function() {
            return _currSelected;
          },

          setFoo: function( value ) {
              if( value !== _foo )
                  _foo = value;
          },

          showView: function( doShow ) {
              ( doShow ) ? show() : hide();
          },

          setup: function(arr) {
              //_curtain=curtain;
              _btnArr=arr;

              this.onButtonClicked = _.bind( this.onButtonClicked, this );
              EventBus.addEventListener("NAVBTN_EVENTS", this.onButtonClicked);


              for ( var i = 0; i < arr.length; i++) {
                  _btnArr[i].radioBtn=true
                  _btnArr[i].eventName="NAVBTN_EVENTS";

              }



          },

          onButtonClicked: function(e) {

              for ( var i = 0; i < _btnArr.length; i++) {
                  if(_btnArr[i]!= e.target) {_btnArr[i].setState(1)} else { _currSelected = i }
              }

             // _curtain.do();

              ////////console.log("_pageEvent",_pageEvent);
              EventBus.dispatch(_pageEvent,this);

          },

          setPageEvent: function(t) {
              _pageEvent=t;
          },

          setActiveBtn: function(target) {

  //            for (var i in _btnArr) {
  //                if (target!=_btnArr[i]) {_btnArr[i].setState(1)} else
  //                {_btnArr[i].setState(2)}
  //            }
          }

      };

  }).call();

  module.exports = RFNav;
}});

window.require.define({"classes/nav/ScreenManager": function(exports, require, module) {
  
  (function(window) {

      function ScreenManager() {
          this.initialize();
      };



      ScreenManager.prototype.plusPage;
      ScreenManager.prototype.patternPage;
      ScreenManager.prototype.infoPage;

      ScreenManager.prototype.currPage;
      ScreenManager.prototype.pageArr;

      ScreenManager.prototype.navEvent;

      ScreenManager.prototype = new Container();

      ScreenManager.prototype.Container_initialize = ScreenManager.prototype.initialize;

      ScreenManager.prototype.initialize = function() {

          this.Container_initialize();

      };

      ScreenManager.prototype.init = function(pages) {

          this.addChild(pages[0]);
          this.addChild(pages[1]);
          this.addChild(pages[2]);

          this.pageArr = pages;

          this.onNavEvent = _.bind( this.onNavEvent, this );
          this.setPage(0);

      }

      ScreenManager.prototype.setPage = function(num) {

          if(this.currPage!=num) {

              this.currPage=num;

              for (var i = 0; i < this.pageArr.length; i++) {

                  if(i!=this.currPage) {
                      this.pageArr[i].visible=false;

                  } else {
                      this.pageArr[i].visible=true;
                  }

              }

          }

      };

      ScreenManager.prototype.setController = function(nav,navEvent) {
          EventBus.addEventListener(navEvent, this.onNavEvent);

      }

      ScreenManager.prototype.onNavEvent = function(e) {
          ////////console.log("onNavEvent", e.target.getCurrSelected(),this);
          this.setPage(e.target.getCurrSelected())
      }

      window.ScreenManager = ScreenManager;

  }(window));














  
}});

window.require.define({"classes/pages/InfoPage": function(exports, require, module) {
  


  (function(window) {

      function InfoPage() {
          this.initialize();
      }

      InfoPage.prototype = new Container();
      InfoPage.prototype.Container_initialize = InfoPage.prototype.initialize;

      InfoPage.prototype.initialize = function() {

          this.Container_initialize();
  //
  //        var list = new RFScrollableList();
  //        this.addChild(list);
  //
  //        var DonutModel = Backbone.Model.extend({
  //            defaults: {setLabel:"BEDZIE OK", setColor:0}
  //        });
  //        var DonutsCollection = Backbone.Collection.extend({
  //            model : DonutModel
  //        });
  //        var donuts = new DonutsCollection();
  //
  //        for ( var i = 0; i < 20; i++) {
  //            var m = new DonutModel();
  //            donuts.add(m);
  //            m.set({setLabel:""+i, setColor:11})
  //        }
  //
  ////        ////////console.log("don",donuts, donuts.models);
  //
  //        list.init("y",SElementMainBtn,{w:479,h:93},5,donuts);
  //        list.y=170;
  //        list.x=80;

      };

      window.InfoPage = InfoPage;

  }(window));














  
}});

window.require.define({"classes/pages/PatternPage": function(exports, require, module) {
  
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














  
}});

window.require.define({"classes/pages/PlusPage": function(exports, require, module) {
  

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















  
}});

window.require.define({"classes/temp/MyClass": function(exports, require, module) {
  // Example use of require; or how you 'import' files

  //var SampleView = require('./views/SampleView');




  // Class definition
  MyClass = (function() {

  // private vars
      var _foo = 'bar';
      var _show = false;
  //    var _sampleView = new SampleView();

  // self-instantiating "constructor" function
      var initialize = (function() {
          //////console.log('Initialized');
      })();

  // private functions
      function show() {
          // show view
      };

      function hide() {
          // hide view
      };

  // public facing interface
      return {

          getFoo: function() {
              return _foo;
          },

          setFoo: function( value ) {
              if( value !== foo )
                  foo = value;
          },

          showView: function( doShow ) {
              ( doShow ) ?
                  show() :
                  hide();
          }
      };

  }).call();

  module.exports = MyClass;
}});

window.require.define({"config/ApplicationConfig": function(exports, require, module) {
  /**
   * Application Configuration
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var ApplicationConfig = (function() {

  	/*
     	 * @private
  	 */
  	var _baseUrl = "/";

  	/*
     	 * Public interface
  	 */
  	return {
  		BASE_URL: _baseUrl
  	}

  }).call()

  module.exports = ApplicationConfig;
}});

window.require.define({"events/ApplicationEvents": function(exports, require, module) {
  /**
   * Application Events
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var ApplicationEvents = (function() {

  	/*
     	 * @private
  	 */
  	var _applicationInitialized = "onApplicationInitialized";

  	/*
     	 * Public interface
  	 */
  	return {
  		APPLICATION_INITIALIZED: _applicationInitialized
  	}
  	
  }).call();

  module.exports = ApplicationConfig;
}});

window.require.define({"helpers/ViewHelper": function(exports, require, module) {
  /**
   * Handlebars Template Helpers
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */


  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  /*
  * @return String
  */
  Handlebars.registerHelper( 'link', function( text, url ) {

    text = Handlebars.Utils.escapeExpression( text );
    url  = Handlebars.Utils.escapeExpression( url );

    var result = '<a href="' + url + '">' + text + '</a>';

    return new Handlebars.SafeString( result );
  });
  
}});

window.require.define({"initialize": function(exports, require, module) {
  
  /**
   * Application Initializer
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var application = require('Application');

  $(function() {

  	// Initialize Application
  	application.initialize();

  	// Start Backbone router
    	Backbone.history.start();
  });
  
}});

window.require.define({"models/supers/Collection": function(exports, require, module) {
  /**
   * Base Class for all Backbone Collections
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  module.exports = Backbone.Collection.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
  	
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
  
}});

window.require.define({"models/supers/Model": function(exports, require, module) {
  /**
   * Base Class for all Backbone Models
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  module.exports = Backbone.Model.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
  	
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
  
}});

window.require.define({"routers/Router": function(exports, require, module) {
  /**
   * Backbone Primary Router
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var application = require('Application');

  module.exports = Backbone.Router.extend({

  	//--------------------------------------
    	//+ Routes
    	//--------------------------------------
    	
    	routes: {
        '': 'home'
    	},

    	//--------------------------------------
    	//+ Route Handlers
    	//--------------------------------------

    	home: function() {
        $( 'body' ).html( application.homeView.render().el );
    	}
  });
  
}});

window.require.define({"utils/BackboneView": function(exports, require, module) {
  /**
   * View Description
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var View = require('./supers/View');
  var template = require('templates/HomeViewTemplate');

  module.exports = View.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

    	/*
     	 * @private
  	 */
  	id: 'view',
  	/*
     	 * @private
     	*/
  	template: template,

  	//--------------------------------------
    	//+ INHERITED / OVERRIDES
    	//--------------------------------------

  	/*
  	 * @private
  	 */
  	initialize: function() {
  		this.render = _.bind( this.render, this );
  	},

  	/*
  	 * @private
  	 */
  	render: function() {
  		this.$el.html( this.template( this.getRenderData() ) );

  		return this;
  	},

  	/*
  	 * @private
  	 */
  	getRenderData: function() {
  		return {
  			content: "View Content"
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
  
}});

window.require.define({"views/HomeView": function(exports, require, module) {
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

  
}});

window.require.define({"views/supers/View": function(exports, require, module) {
  /**
   * View Base Class
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  require('helpers/ViewHelper');

  module.exports = Backbone.View.extend({

    //--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------

    /*
     * @private
     */
    template: function() {},
    /*
     * @private
     */
    getRenderData: function() {},

    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------
    
    /*
     * @private
     */
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    /*
     * @private
     */
    render: function() {
      this.$el.html( this.template( this.getRenderData() ) );
      this.afterRender();
      
      return this;
    },

    /*
     * @private
     */
    afterRender: function() {}

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
  
}});


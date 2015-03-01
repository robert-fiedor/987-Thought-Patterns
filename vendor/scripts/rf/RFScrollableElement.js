(function() {

    var RFScrollableElement = function() {
        this.initialize();
        _.extend(this, Backbone.Events);
    }
    RFScrollableElement.prototype = p = new createjs.Container();
   // p.Container_initialize = p.initialize;

    p.width;
    p.height;
    p.data;
    p.list;
//
//    p.initialize = function() {
////        this.Container_initialize();
//        _.extend(this, Backbone.Events);
//
//    }

    p.setSetters = function(props) {


//        ////console.log("props",props);

        _.each(
            props,
            function(val, key){
                this[key](val);
            },this);
    }

    p.setSize = function(w,h) {
        this.width=w;
        this.height=h
    }

    p.setData = function(data) {

      //  ////console.log("data",data);
        this.data=data;
    }

    p.enable = function(t) {

     //   ////console.log("ttttt",t);

    }

    p.passInteraction = function(e) {

        ////console.log("passInteraction >> ",e);
        this.trigger("EVENT_INTERACTION",e)

        var that=this;
        if(e.type=="onClick") {

            console.log("RESET!!!");
            that.list.vx=0;

        }

    }

    p.setList = function(list) {
        this.list=list;

    }


    window.RFScrollableElement = RFScrollableElement;
}());
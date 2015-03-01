


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















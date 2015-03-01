

(function() {

    var RFDebug = function() {this.initialize();}

    RFDebug.prototype = p = new Container();

    p.background;

    p.frequency;

    p.elHeight = 30;
    p.sqback;

    p.bind;
    p.theArr= new Array();
    p.textFieldArr=new Array()

    p.init = function(width,height,frequency) {

        this.onInterval = _.bind( this.onInterval, this );

        this.sqback =new  RFBlock();
        this.sqback.init({color:"#F00"})
        this.sqback.setSize(width,height);
        this.addChild(this.sqback);

        setInterval(this.onInterval, frequency)

        this.bind={};

//        var yourHash = new Hash({foo: 'bar'});
//        yourHash['key1'] = 'value';
//        yourHash.key2    = 'value';

    };

    p.add = function(t, property, name) {

        var result=new Object();
        result.target=t;
        result.property=property;

        this.theArr.push(result);

        var label = new createjs.Text(name, this.elHeight.toString()+"px Arial", "#FF0");
        this.addChild(label);
        label.y=(this.theArr.length-1)*this.elHeight;
        label.x=20;

        var el = new createjs.Text("asa", this.elHeight.toString()+"px Arial", "#FF0");
        this.addChild(el);
        el.x=40+label.getMeasuredWidth();
        el.y=(this.theArr.length-1)*this.elHeight;

        result.id=el.id;

//        console.log("bb",this.theArr[this.theArr.length-1],this.theArr.length-1,this.theArr);

        this.textFieldArr.push(el);


//        this.bind[this.theArr[this.theArr.length-1]]="new";

//        console.log("this.textfieldIdArrBind",this.textfieldIdArrBind);
//        this.bind["hj"]=2;

//        console.log("this one",this.bind.values());
//        console.log("bind",this.bind,result.target,result.property);

    };


    p.onInterval = function() {

        for ( var int = 0; int < this.theArr.length; int++) {

            var elo = this.theArr[int];
            var targetTxtField = _.find(this.textFieldArr, function(num){
                return num.id==elo.id
            },this)

            targetTxtField.text=elo.target[elo.property]

        }

    }



    window.RFDebug = RFDebug;

}());
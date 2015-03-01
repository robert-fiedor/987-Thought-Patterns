

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

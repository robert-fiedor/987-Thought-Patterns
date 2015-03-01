window.require.define({"views/templates/HomeViewTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<!--\n	Author: \n	Date: \n\n	Description: Template Description\n\n	<div id=\"content\">\n      <div id=\"name\">";
    foundHelper = helpers.content;
    stack1 = foundHelper || depth0.content;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "content", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n\n    </div>\n-->\n\n\n\n<canvas id=\"testCanvas\" width=\"330\" height=\"480\" style=\"background-color:#312\"></canvas>\n\n\n\n\n";
    return buffer;});
}});



var data = require("sdk/self").data;

var translatedPanel = require("sdk/panel").Panel({
  width: 600,
  height: 100,
  position: {
   bottom: 0
  },
  contentURL: data.url("trans.html"),
  contentScriptFile: data.url("trans.js") 
});

var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
  label: "Transliterate!",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +   //postMessage is an addon-sdk method to communicate between the addon code and the panel/widget code.
                 '});',
  onMessage: function (selectionText) {
  	translatedPanel.postMessage(selectionText); //post the selectioText to the addon display panel.
  	translatedPanel.show(); //show the panel! Do I really need to tell that?
  }
});
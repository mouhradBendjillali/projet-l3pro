/*global chrome*/
"use strict";

//Génère le contenu de la fenetre avec le fichier index.html
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('/index.html', {
    id: "firmata-main", 
    state: "fullscreen",
  });
});


/**
 * The app mdule controls the application lifecycle
 */

'use strict';

var app = require('app'),
    BrowserWindow = require('browser-window'), //allows window creation
    // main applicaiton window, null because the window would otherwise be closed
    // once JS's garbage collection kicks in.
    mainWindow = null;

app.on('ready', function () { //reacting to the ready state of the application
    // this window's renderer process will render index.html
    mainWindow = new BrowserWindow({
        frame: false,
        heihgt: 600,
        resizable: false,
        width: 800
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});


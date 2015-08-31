/**
 * The app mdule controls the application lifecycle
 */

'use strict';

var app = require('app'),
    BrowserWindow = require('browser-window'), //allows window creation
    // adding inter-process-communication (to communicate render processes and main process through chanels)
    ipc = require('ipc'), 
    // main applicaiton window, null because the window would otherwise be closed
    // once JS's garbage collection kicks in.
    mainWindow = null;

app.on('ready', function () { //reacting to the ready state of the application
    // this window's renderer process will render index.html
    mainWindow = new BrowserWindow({
        frame: false,
        heihgt: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});

// listening on the close-main-window channel
ipc.on('close-main-window', function () {
    app.quit();
});
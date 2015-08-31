/**
 * The app mdule controls the application lifecycle
 */

'use strict';

var app = require('app'),
    BrowserWindow = require('browser-window'), //allows window creation
    globalShortcut = require('global-shortcut'), // allows the use of accelerators (keyboard combinations)
    // adding inter-process-communication (to communicate render processes and main process through chanels)
    ipc = require('ipc'), 
    // main applicaiton window, null because the window would otherwise be closed
    // once JS's garbage collection kicks in.
    mainWindow = null,
    settingsWindow = null;

app.on('ready', function () { //reacting to the ready state of the application
    // this window's renderer process will render index.html
    mainWindow = new BrowserWindow({
        frame: false,
        heihgt: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    /*
        Registering the shortcuts for the app
     */

    globalShortcut.register('ctrl+shift+1', function () {
        // sending a message on the global-shortcut channel with an argument
        mainWindow.webContents.send('global-shortcut', 0); 
    });

    globalShortcut.register('ctrl+shift+2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });

});

// listening on the close-main-window channel
ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
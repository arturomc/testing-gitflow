/**
 * The app mdule controls the application lifecycle
 */

'use strict';

var app = require('app'),
    BrowserWindow = require('browser-window'), //allows window creation
    configuration = require('./configuration'), // custom module that wraps nconf (a node module)
    globalShortcut = require('global-shortcut'), // allows the use of accelerators (keyboard combinations)
    // adding inter-process-communication (to communicate render processes and main process through chanels)
    ipc = require('ipc'), 
    // main applicaiton window, null because the window would otherwise be closed
    // once JS's garbage collection kicks in.
    mainWindow = null,
    settingsWindow = null;

app.on('ready', function () { //reacting to the ready state of the application

    // reading if there is any configuration stored yet, 
    // if not, adding an initial value
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    setGlobalShortcuts();

    // this window's renderer process will render index.html
    mainWindow = new BrowserWindow({
        //frame: false,
        heihgt: 700,
        //resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});

function setGlobalShortcuts() {
    // resets the global shortcuts so that we can set new ones
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys'),
        // transforming the settings into an accelerator compatible string
        shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });

    globalShortcut.register(shortcutPrefix + '2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}

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

ipc.on('set-global-shortcuts', function () {
    setGlobalShortcuts();
});
'use strict';

var ipc = require('ipc'),
    path = require('path'),
    // Native GUI modules required remotely 
    // and that way it is safe to use them here
    remote = require('remote'),
    Menu = remote.require('menu'),
    Tray = remote.require('tray'),
    closeEl = document.querySelector('.close'),
    settingsEl = document.querySelector('.settings'),
    soundButtons = document.querySelectorAll('.button-sound'),
    i,
    trayIcon = null,
    trayMenu,
    trayMenuTemplate;

for (i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i],
        soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);

}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/")' + soundName + '.png")';
    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}

closeEl.addEventListener('click', function () {
    ipc.send('close-main-window'); // communicating this render process to the main proces (see main.js)
});

ipc.on('global-shortcut', function (arg) {
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});

settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
} else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

trayMenuTemplate = [{
    label: 'Sound machine',
    enabled: false
}, {
    label: 'Settings',
    click: function () {
        ipc.send('open-settings-window');
    }
}, {
    label: 'Quit',
    click: function () {
        ipc.send('close-main-window');
    }
}];

// There are multiple ways of building a menu in Electron. 
// This way creates a menu template (a simple array with menu items) and builds a menu from that template. 
// At the end, the new menu is attached to the tray icon.

trayMenu = Menu.buildFromTemplate(trayMenuTemplate);

// A tray icon is defined through its icon. 
// OS X supports image templates (by convention, an image is considered a template image 
// if its filename ends with “Template”) which makes it easy to work with the dark and light themes. 
// Other OSes get a regular icon.
trayIcon.setContextMenu(trayMenu);
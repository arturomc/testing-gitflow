'use strict';

var soundButtons = document.querySelectorAll('.button-sound'),
    ipc = require('ipc'),
    closeEl,
    i;

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

closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
    ipc.send('close-main-window'); // communicating this render process to the main proces (see main.js)
});

ipc.on('global-shortcut', function (arg) {
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});
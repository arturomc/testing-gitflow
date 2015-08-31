'use strict';

var soundButtons = document.querySelectorAll('.button-sound'),
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
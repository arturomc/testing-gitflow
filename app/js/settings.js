'use strict';

var ipc = require('ipc'),
    closeEl = document.querySelector('.close');


closeEl.addEventListener('click', function (e) {
    ipc.send('close-settings-window');
});
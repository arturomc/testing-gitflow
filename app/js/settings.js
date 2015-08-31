'use strict';

var ipc = require('ipc'),
    closeEl = document.querySelector('.close'),
    configuration = require('../configuration'),
    modifierCheckboxes = document.querySelectorAll('.global-shortcut'),
    i;

for (i = 0; i < modifierCheckboxes.length; i++) {
    var shortcutKeys = configuration.readSettings('shortcutKeys'),
        modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;

    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;

    modifierCheckboxes[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
}

function bindModifierCheckboxes(e) {
    var shortcutKeys = configuration.readSettings('shortcutKeys'),
        modifierKey = e.target.attributes['data-modifier-key'].value,
        shortcutKeyIndex;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    } else {
        shortcutKeys.push(modifierKey);
    }

    configuration.saveSettings('shortcutKeys', shortcutKeys);

    ipc.send('set-global-shortcuts');
}


closeEl.addEventListener('click', function (e) {
    ipc.send('close-settings-window');
});
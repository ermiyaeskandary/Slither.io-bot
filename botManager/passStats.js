const {ipcRenderer} = require('electron');

// pass the stats if asked for (asynchronous)
// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md#sending-messages

play_btn.btnf.click();

ipcRenderer.on('getStats', (event) => {
	// Return the variable 'bot'
	event.sender.send('replyStats', window)
});

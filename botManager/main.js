const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const {ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

allBots = new Array()

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function insertScriptToWindow (targetWindow, url) {
  var greasemonkey = `GM_info = {'script': {'version': 'test version'}};`;
  var script =  `
    var scr = document.createElement("script"); 
    scr.type="text/javascript"; 
    scr.src="${url}";
    document.getElementsByTagName("head")[0].appendChild(scr);
  `
  targetWindow.webContents.executeJavaScript(greasemonkey + script)
}

function createBotWindow (codeUrl) {
  // Create the browser window.
  var botWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {webSecurity : false}})

  // and load slither.io of the app.
  botWindow.loadURL('http://slither.io/')

  // If loading is completed
  botWindow.webContents.on('did-finish-load', function() {

    // Insert the latest bot script
    insertScriptToWindow(botWindow, codeUrl)

    // Get the dirname as a url
    var dirname = __dirname.replace(/\\/g,'/')

    // Insert 'passStats.js', to communicate for the stats
    insertScriptToWindow(botWindow, `${dirname}/passStats.js`)

    botWindow.webContents.executeJavaScript(`window.botUrl = '${codeUrl}'`)
  });

  // Add the bot to the list with bots
  allBots.push(botWindow)

  botWindow.on('closed', function () {
    // If the window is closed, remove it from the allBots array
    var index = allBots.indexOf(botWindow)
    if (index > -1) {
      allBots.splice(index, 1);
    }
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('submit-code', (event, arg) => {
  newBotWindow = createBotWindow(arg.codeUrl)
})

ipcMain.on('getAllStats', (event) => {
  var allStats = new Array()
  var originalEvent = event
  ipcMain.on('replyStats', (event, arg) => {
    allStats.push(arg)
    if (allStats.length === allBots.length) {
      originalEvent.sender.send('replyAllStats', allStats)
    }
  })
  allBots.forEach(function (item, index, array) {
    item.webContents.send('getStats')
  })
})

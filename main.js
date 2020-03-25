const electron =require("electron");
const fs=require("fs");
const {app,BrowserWindow}=require("electron");
const  path=require("path");
const url=require("url");
const { dialog } = require('electron');
const {ipc}=require('electron');
let player;
var directoryPath=[];
var defaultPath="H://New/";
directoryPath=defaultPath;
var song_list = [];
app.on('ready',function () {
     player=new BrowserWindow({
         width:400,
         height:600,
         maxWidth:400,
         maxHeight:600,
    webPreferences:{
        nodeIntegration:true
    },backgroundColor: '#2e2c29',
         frame:false})
    player.loadURL(url.format({
        pathname:path.join(__dirname,'Player.html'),
        slashes:true,
        protocol:'file'
    }))
player.webContents.openDevTools();
     dialog.showOpenDialog(player, {
        properties: ['openFile', 'openDirectory']
    }).then(result => {

        console.log(result.filePaths,"FLP")
       directoryPath=result.filePaths+"/";



console.log(directoryPath);
    fs.readdir(directoryPath, function (err, files) {
        console.log(directoryPath,"Path");
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            if (file.substr(-4) == ".mp3") {
                console.log(file);
                song_list.push(path.join(directoryPath, file));

            }
        });

        var dPath = path.join(__dirname, 'SongPath/songpathorg.txt');
        fs.writeFile(dPath, song_list, function (err) {
            if (err) throw err;
            console.log("Saved");
        });
    })

     });














});
//------------------------------------------------------

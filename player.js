const fs=require('fs');
const path = require('path');
const{remote}=require('electron');
const { ipcRenderer } = require('electron')
var ProgressBar=require('progressbar.js');
var ProgressBar = require('progressbar.js');
var songtitle=document.getElementById("song-title");

//===========================================
window.jQuery = require('jquery');
var B = new Array();
    fs.readFile('SongPath/songpathorg.txt', "utf-8", function (err, data) {
        if (err) throw err;
        B.push(data.split('.mp3,'));
    })
    console.log(B);
//===========================================

var curr_play_song=0;


    var song = new Audio();
    setTimeout(function () {
        var song_source=B[0][curr_play_song];
        if(song_source.substr(-4)==".mp3"){
            song.src=song_source;
        }
        else {
            song.src = song_source+".mp3";
        }

        document.getElementById("song-title").innerHTML=song_source;

    },100);
    song.volume = 0.2;
    var vol = song.volume;
    console.log(vol);
//==========================================



function pauseSong() {
        if (song.paused) {
            song.play();
            $("#play img").attr("src", "icons/pause.png");
        } else {
            song.pause();
            $("#play img").attr("src", "icons/play.png");

        }


    }

    song.addEventListener('timeupdate', seek_position);
    var bar = new ProgressBar.Circle('#container', {
        color: '#fff000',
        trailColor: '#000',

        trailWidth: 4,
        duration: 1400,
        easing: 'easeInOut',
        strokeWidth: 2,
        from: {color: '#fff000', a: 0},
        to: {color: '#fff000', a: 1},
        // Set default step function for ball animate calls

        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }

    });


    function seek_position() {
        const seek = song.currentTime / song.duration;
        bar.animate(seek);
    }

    function nextRight() {
        curr_play_song += 1;
        var song_source=B[0][curr_play_song];
        if(song_source.substr(-4)==".mp3"){
            song.src=song_source;
        }
        else {
            song.src = song_source+".mp3";
        }
        document.getElementById("song-title").innerText=song_source;
        song.play();
        $("#play img").attr("src", "icons/pause.png");
    }

    function nextLeft() {
        curr_play_song -= 1;
        var song_source=B[0][curr_play_song];
        if(song_source.substr(-4)==".mp3"){
            song.src=song_source;
        }
        else {
            song.src = song_source+".mp3";
        }
        document.getElementById("song-title").innerText=song_source;
        song.play();
        $("#play img").attr("src", "icons/pause.png");
    }


    function volDecrease() {
        vol = vol - 0.2;
        vol <= 0 ? vol = 0 : vol;
        song.volume = vol;
        $("#mute-unmute img").attr("src", "icons/speaker.png");
    }

    function volIncrease() {
        vol = vol + 0.2;
        vol >= 1 ? vol = 1 : vol;
        song.volume = vol;
        $("#mute-unmute img").attr("src", "icons/speaker.png");
    }

    function volMute() {
        if (song.volume === 0) {
            song.volume = vol;
            $("#mute-unmute img").attr("src", "icons/speaker.png");
        } else {
            song.volume = vol - vol;
            $("#mute-unmute img").attr("src", "icons/mute.png");
        }
    }

    function closeW() {
        const windowc = remote.getCurrentWindow();
        windowc.close();
    }

    function miniW() {
        const windowmi = remote.getCurrentWindow();
        windowmi.minimize();
    }



function opac(){
    document.getElementById('credit').style.opacity='1';
    window.location.reload();

}














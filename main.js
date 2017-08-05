$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});


function fancyTimeFormat(time)
{
// Hours, minutes and seconds
var hrs = ~~(time / 3600);
var mins = ~~((time % 3600) / 60);
var secs = time % 60;

// Output like "1:01" or "4:03:59" or "123:03:59"
var ret = "";

if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
}

ret += "" + mins + ":" + (secs < 10 ? "0" : "");
ret += "" + secs;
return ret;
}

function toggleSong()// what we have done is created a function toggle song jisme hum icon play and pause dekhenge
 {
var song = document.querySelector('audio');
if(song.paused == true)//agar statement true h to
{
console.log('Playing');
$('.play-icon').removeClass('fa-play').addClass('fa-pause');// play icon ko remove krke hum pause icon laga denge
song.play();
}
else {
console.log('Pausing');
$('.play-icon').removeClass('fa-pause').addClass('fa-play');// agar ni h condition true to hum pause ko remove krenge aur play class ko add krenge
song.pause();
}
}
function updateCurrentTime() // yaha pe we have a made a function that will do the following steps
{
var song = document.querySelector('audio');//variable song me query selector se audio ko lena is been donw with this function that we made.
// console.log(song.currentTime);//console.log humara currentTime lena hai
// console.log(song.duration);// yaha pe console.log humara song k duration ko lera h
var currentTime = Math.floor(song.currentTime);// variable currentTime se nikal ra h math.floor k andar song k current time ko
currentTime = fancyTimeFormat(currentTime);//current time ko nikal k fancyTimeFormat waale function m pass krke naya time nikala h fir dubara current time m pass kia us processed tie ko
var duration = Math.floor(song.duration);//variable duration se nikal ra h math.floor k andar song k duration ko
duration = fancyTimeFormat(duration);
$('.time-elapsed').text(currentTime);// text function humara jo humare current time k duration h use display kr dega
$('.song-duration').text(duration);// ab text se hum duration ko pass kr re jo variablehumne upar bnaya tha
}




$('.play-icon').on('click', function() {
    toggleSong();//calling of function that we created (toggleSong)
});
$('body').on('keypress', function(event) {
            if (event.keyCode == 32) {
                toggleSong();// calling of function
            }
        });


        var songList = ['Badri Ki Dulhania (Title Track)',
        'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song']; // yaha pe jab humari windows load hogi to song ka name dia h
        var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
        var artistList = [' Neha Kakkar, Monali Thakur','Badshah, Jubin','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
          window.onload = function()// humne ek function bnaya h window.onload jo given below kaam kr ra h
          {


            $('#song1 .song-name').text(songList[0]);
            $('#song2 .song-name').text(songList[1]);
            $('#song3 .song-name').text(songList[2]);
            $('#song4 .song-name').text(songList[3]);
            $('#song1 .song-artist').text(artistList[0]);
            $('#song2 .song-artist').text(artistList[1]);
            $('#song3 .song-artist').text(artistList[2]);
            $('#song4 .song-artist').text(artistList[3]);

// //hum yaha pe ye kr re h k jub b hum sog name p click kre wahi se play aur pause dono hojae
// $('#song1').click(function() {
// var audio = document.querySelector('audio');
// var currentSong = audio.src;
// if(currentSong.search(fileNames[0]) != -1)
// {
// toggleSong();
// }
// else {
// audio.src = fileNames[0];
// toggleSong();
// }
// });
//
// $('#song2').click(function() {
// var audio = document.querySelector('audio');
// var currentSong = audio.src;
// if(currentSong.search(fileNames[1]) != -1)
// {
// toggleSong();
// }
// else {
// audio.src = fileNames[1];
// toggleSong();
// }
// });
//
// $('#song3').click(function() {
// var audio = document.querySelector('audio');
// var currentSong = audio.src;
// if(currentSong.search(fileNames[2]) != -1)
// {
// toggleSong();
// }
// else {
// audio.src = fileNames[2];
// toggleSong();
// }
// });
//
// $('#song4').click(function() {
// var audio = document.querySelector('audio');
// var currentSong = audio.src;
// if(currentSong.search(fileNames[3]) != -1)
// {
// toggleSong();
// }
// else {
// audio.src = fileNames[3];
// toggleSong();
// }
// });

function addSongNameClickEvent(songName,position) //is function me humara jo user h wo input dera h
{
var id = '#song' + position;// isme agar position 1 hai to song id b 1 hogi and so on....
$(id).click(function() {
var audio = document.querySelector('audio');
var currentSong = audio.src;
if(currentSong.search(songName) != -1)
{
toggleSong();
}
else {
audio.src = songName;
toggleSong();
}
});
}
//hum ek for loop laga re jisme initially i k value 0 hai wo i k value less than fileNames.length tak hogi jisme uski value 4 se kam h i.e. 3
for (var i = 0; i < fileNames.length ; i++) {
addSongNameClickEvent(fileNames[i],i+1)
}

      updateCurrentTime();// yaha pe humara upar waala function call hua k jaise he hum apna page refresh kare uske sath2 he humara time show hojae
      setInterval(function()// yaha pe humne ek aur function bnaya jo updateCurrentTime ko call kr ra h
       {
      updateCurrentTime();
    },1000);// ye jo 1000 value humne di h this means 1 sec aur iski wajah se humara page har ek second m update hora h.
            }

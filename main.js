var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

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
 $('body').on('keypress',function(event) //body pe jb keypress kraenge to ye function chalega
//event ek object hai humara so that we can use it
 {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')//event k andar target m tagname k andar we have a information k kause tag p lagaya h humne
    {
        toggleSong();
    }
});


        var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
       'image':'QTdBSCq - Imgur.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image':'download.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image':'download (1).jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image':'download (2).jpg'
    }]
    window.onload = function() {


      function changeCurrentSongDetails(songObj) {
          $('.current-song-image').attr('src','img/' + songObj.image)
          $('.current-song-name').text(songObj.name)
          $('.current-song-album').text(songObj.album)
      }

 function addSongNameClickEvent(songObj,position) //is function me humara jo user h wo input dera h
 {
 var songName=songObj.fileName;
 var id = '#song' + position;// isme agar position 1 hai to song id b 1 hogi and so on....
 $(id).click(function() {
 var audio = document.querySelector('audio');
 var currentSong = audio.src;
 if(currentSong.search(songName) != -1)//agar song same h to toggle song krna h
 {
 toggleSong();
 }
 else {
 audio.src = songName;//warna song ka source b change krna h toggle song b karna h aur song details b change kri h
 toggleSong();
 changeCurrentSongDetails(songObj);
 }
 });
 }
changeCurrentSongDetails(songs[0]);

 for(var i =0; i < songs.length;i++) {
   var obj = songs[i];
   var name = '#song' + (i+1);
   var song = $(name);
   song.find('.song-name').text(obj.name);
   song.find('.song-artist').text(obj.artist);
   song.find('.song-album').text(obj.album);
   song.find('.song-length').text(obj.duration);
   addSongNameClickEvent(obj,i+1)
 }
$('#songs').DataTable({
        paging: false
    });
    $('.fa-repeat').on('click',function() {
        $('.fa-repeat').toggleClass('disabled')
        willLoop = 1 - willLoop;
    });

    $('.fa-random').on('click',function() {
        $('.fa-random').toggleClass('disabled')
        willShuffle = 1 - willShuffle;
    });
    $('audio').on('ended',function() {
        var audio = document.querySelector('audio');
        if (willShuffle == 1) {
            var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
            var nextSongObj = songs[nextSongNumber-1];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = nextSongNumber;
        }
        else if(currentSongNumber < 4) {
            var nextSongObj = songs[currentSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = currentSongNumber + 1;
        }
        else if(willLoop == 1) {
            var nextSongObj = songs[0];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber =  1;
        }
        else {
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    })

       updateCurrentTime();// yaha pe humara upar waala function call hua k jaise he hum apna page refresh kare uske sath2 he humara time show hojae
       setInterval(function()// yaha pe humne ek aur function bnaya jo updateCurrentTime ko call kr ra h
        {
       updateCurrentTime();
     },1000);// ye jo 1000 value humne di h this means 1 sec aur iski wajah se humara page har ek second m update hora h.
            }

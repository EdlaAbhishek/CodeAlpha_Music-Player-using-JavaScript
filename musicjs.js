const songs = [

{
title:"Waka Waka",
artist:"Shakira",
src:"songs/waka_waka.mp3",
cover:"images/waka.jpg"
},

{
title:"Shape of You",
artist:"Ed Sheeran",
src:"songs/shape_of_you.mp3",
cover:"images/shape.jpg"
},

{
title:"Espresso",
artist:"Sabrina Carpenter",
src:"songs/espresso.mp3",
cover:"images/espresso.jpg"
},

{
title:"Die With A Smile",
artist:"Lady Gaga & Bruno Mars",
src:"songs/die_with_a_smile.mp3",
cover:"images/smile.jpg"
},

{
title:"Lovely",
artist:"Billie Eilish & Khalid",
src:"songs/lovely.mp3",
cover:"images/Lovely.jpg"
}

];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const coverImage = document.getElementById("coverImage");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playButton = document.querySelector(".play-btn");

loadSong(currentSong);

function loadSong(index){

    audio.src = songs[index].src;

    title.innerText = songs[index].title;

    artist.innerText = songs[index].artist;

    coverImage.src = songs[index].cover;

    updatePlaylist();
}

function playPause(){

    if(audio.paused){

        audio.play();

        playButton.innerHTML = "⏸";

        coverImage.classList.add("rotate");

    }else{

        audio.pause();

        playButton.innerHTML = "▶";

        coverImage.classList.remove("rotate");
    }
}

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playButton.innerHTML = "⏸";

    coverImage.classList.add("rotate");
}

function previousSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playButton.innerHTML = "⏸";

    coverImage.classList.add("rotate");
}

function selectSong(index){

    currentSong = index;

    loadSong(index);

    audio.play();

    playButton.innerHTML = "⏸";

    coverImage.classList.add("rotate");
}

audio.addEventListener("timeupdate",()=>{

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    document.getElementById("currentTime").innerHTML =
    formatTime(audio.currentTime);

    document.getElementById("totalTime").innerHTML =
    formatTime(audio.duration);
});

function formatTime(time){

    if(isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

progress.addEventListener("input",()=>{

    audio.currentTime = progress.value;
});

volume.addEventListener("input",()=>{

    audio.volume = volume.value;
});

audio.addEventListener("ended",()=>{

    nextSong();
});

function updatePlaylist(){

    let items = document.querySelectorAll(".playlist li");

    items.forEach(item=>{
        item.classList.remove("active");
    });

    items[currentSong].classList.add("active");
}

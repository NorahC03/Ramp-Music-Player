const music = document.querySelector('audio');
const image = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const durationEl = document.getElementById('duration');
const currentEl = document.getElementById('current-time');
//Music
const songs = [{
            name: "jacinto-1",
            displayName: "No Bullet For My Valentine",
            artist: "Arin",
        },
        {
            name: "jacinto-2",
            displayName: "Bullet For My Valentine",
            artist: "Arin",
        },
        {
            name: "jacinto-3",
            displayName: "Silver Lake",
            artist: "Arin",
        },
        {
            name: "metric-1",
            displayName: "Sea World",
            artist: "Arin",
        },
    ]
    //is Playing
var isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
    //music.pause() == true ? music.play() : music.pause();
}
// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Update Song
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}
let songIndex = 0;
//On Load=>Select Song
loadSong(songs[songIndex]);

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e) {
    if (isPlaying) {
        const {
            duration,
            currentTime
        } = e.srcElement;
        //console.log(duration, currentTime);
        //Update the progress bar 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationMinutes) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // console.log('minutes', durationMinutes, 'seconds', durationSeconds);
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentMinutes) {
            currentEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}
//Play or Paused
playBtn.addEventListener('click',
    () => {
        (isPlaying ? pauseSong() : playSong())
    }
)
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
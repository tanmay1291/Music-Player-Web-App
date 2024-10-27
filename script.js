let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play")
    }
    else{
        song.play();
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.classList.remove("fa-play");
    }
}

let updateInterval;
song.addEventListener('play', () => {
    updateInterval = setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
});

song.addEventListener('pause', () => {
    clearInterval(updateInterval);
});


progress.addEventListener('input', () => {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play().then(() => {
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        }).catch((error) => {
            console.error('Error playing song after seek:', error);
        });
    }
});
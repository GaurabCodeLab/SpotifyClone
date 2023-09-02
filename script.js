const songList = [
    { songName: "Warriyo - Mortals [NCS Release]", songPath: "/songs/1.mp3", cover: "/covers/1.jpg", duration: "05:34" },
    { songName: "Cielo - Huma-Huma", songPath: "/songs/2.mp3", cover: "/covers/2.jpg", duration: "05:34" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", songPath: "/songs/3.mp3", cover: "/covers/3.jpg", duration: "05:34" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", songPath: "/songs/4.mp3", cover: "/covers/4.jpg", duration: "05:34" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", songPath: "/songs/5.mp3", cover: "/covers/5.jpg", duration: "05:34" },
    { songName: "Rabba - Salam-e-Ishq", songPath: "/songs/6.mp3", cover: "/covers/6.jpg", duration: "05:34" },
    { songName: "Sakhiyaan - Salam-e-Ishq", songPath: "/songs/7.mp3", cover: "/covers/7.jpg", duration: "05:34" },
    { songName: "Bhula Dena - Salam-e-Ishq", songPath: "/songs/8.mp3", cover: "/covers/8.jpg", duration: "05:34" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", songPath: "/songs/9.mp3", cover: "/covers/9.jpg", duration: "05:34" },
    { songName: "Na Jaana - Salam-e-Ishq", songPath: "/songs/10.mp3", cover: "/covers/10.jpg", duration: "05:34" },

];
let songIndex = 0;
const songSection = document.querySelectorAll(".song");
const song = new Audio("/songs/1.mp3");
const playbtn = document.querySelectorAll(".playbtn");
const masterPlay = document.querySelector(".masterplay");
const vol = document.querySelector(".volume");
const seekbar = document.querySelector(".seekbar");
const gif = document.getElementById("gif");
const songName = document.querySelector(".song-name");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

function songDuration(time) {
    const min = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const updateMin = String(min).padStart("2", 0);
    const updateSecond = String(second).padStart("2", 0);
    return `${updateMin}:${updateSecond}`;
}

function masterFunction() {
    masterPlay.classList.remove("bx-play-circle");
    masterPlay.classList.add("bx-pause-circle");
    playbtn[songIndex].classList.remove("bx-play-circle");
    playbtn[songIndex].classList.add("bx-pause-circle");
    gif.style.opacity = 1;
    song.src = songList[songIndex].songPath;
    songName.textContent = songList[songIndex].songName;
    song.addEventListener("loadeddata", () => {
        vol.value = 0.2;
        song.volume = vol.value;
        song.play();
        setInterval(() => {
            const time = song.duration - song.currentTime;
            document.getElementsByClassName("time-stamp")[songIndex].textContent = songDuration(time);
        }, 1000)
        song.addEventListener("timeupdate", () => {
            seekbar.value = parseInt((song.currentTime / song.duration) * 100);
        })
        seekbar.addEventListener("input", () => {
            song.currentTime = (seekbar.value * song.duration) / 100;
        })
        vol.addEventListener("input", (event) => {
            song.volume = event.target.value;
        })


    })
}

songList.forEach((item, i) => {
    songSection[i].children[1].textContent = songList[i].songName;
    songSection[i].children[0].src = `covers/${i + 1}.jpg`;
    const song = new Audio(`/songs/${i + 1}.mp3`);
    song.addEventListener("loadedmetadata", () => {
        document.getElementsByClassName("time-stamp")[i].textContent = songDuration(song.duration);
    })
})

function playAll() {
    playbtn.forEach((item) => {
        item.classList.add("bx-play-circle");
        item.classList.remove("bx-pause-circle");
        masterPlay.classList.add("bx-play-circle");
        masterPlay.classList.remove("bx-pause-circle");
    })
}
playbtn.forEach((item, index) => {
    item.addEventListener("click", (event) => {
        if (event.target.classList.contains("bx-play-circle")) {
            playAll();
            songIndex = index;
            masterFunction();
        } else {
            playAll();
            gif.style.opacity = 0;
            song.pause();
        }
    })
})

masterPlay.addEventListener("click", (event) => {
    if (event.target.classList.contains("bx-play-circle")) {
        playAll();
        masterFunction();
    } else {
        playAll();
        gif.style.opacity = 0;
        song.pause();

    }
})

next.addEventListener("click", () => {
    if (masterPlay.classList.contains("bx-pause-circle")) {
        if (songIndex != 9) {
            songIndex = songIndex + 1;
            playAll();
            masterFunction();
        } else {
            songIndex = 0;
            playAll();
            masterFunction();
        }
    } else {
        if (songIndex != 9) {
            songIndex = songIndex + 1;
            songName.textContent = songList[songIndex].songName;
        } else {
            songIndex = 0;
            songName.textContent = songList[songIndex].songName;
            
            
        }
    }

})

previous.addEventListener("click", () => {
    if (masterPlay.classList.contains("bx-pause-circle")) {
        if (songIndex != 0) {
            songIndex = songIndex - 1;
            playAll();
            masterFunction();
        } else {
            songIndex = 9;
            playAll();
            masterFunction();
        }
    } else {
        if (songIndex != 0) {
            songIndex = songIndex - 1;
            songName.textContent = songList[songIndex].songName;
           
        } else {
            songIndex = 9;
            songName.textContent = songList[songIndex].songName;

        }
    }
})


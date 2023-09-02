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

]
// const songSection = document.querySelectorAll(".song");
// const song = new Audio("/songs/1.mp3");
const icons = document.querySelector(".sub-icon");
// const gif = document.getElementById("gif");
const songNames = document.querySelector(".song-name");
// const playbtn = document.querySelectorAll(".playbtn");
// const masterPlay = document.querySelector(".masterplay");
// const vol = document.querySelector(".volume");
// const seekbar = document.querySelector(".seekbar");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
let songIndex = 0;
// function songDuration(time) {
//     const min = Math.floor(time / 60);
//     const second = Math.floor(time % 60);
//     const updateMin = String(min).padStart("2", 0);
//     const updateSecond = String(second).padStart("2", 0);
//     return `${updateMin}:${updateSecond}`;
// }

// songList.forEach((item, i) => {
//     songSection[i].children[1].textContent = songList[i].songName;
//     songSection[i].children[0].src = `covers/${i + 1}.jpg`;
//     const song = new Audio(`/songs/${i+1}.mp3`);
//     song.addEventListener("loadedmetadata", ()=>{
//         document.getElementsByClassName("time-stamp")[i].textContent = songDuration(song.duration);    
//     })
// })

function playAll()
{
    playbtn.forEach((item)=>{
        item.classList.add("bx-play-circle");
        item.classList.remove("bx-pause-circle");
    })
}

playbtn.forEach((item, i) => {
    item.addEventListener("click", (event) => {
        songNames.textContent = songList[i].songName
        if (event.target.classList.contains("bx-play-circle")) {
            playAll();
            songIndex = event.target.id;
            event.target.classList.remove("bx-play-circle");
            event.target.classList.add("bx-pause-circle");
            masterPlay.classList.remove("bx-play-circle");
            masterPlay.classList.add("bx-pause-circle");
            gif.style.display = "block";
            song.src = songList[i].songPath;
            song.play();
            song.addEventListener("loadeddata", () => {
                vol.addEventListener("input", () => {
                    song.volume = vol.value;
                })
                song.addEventListener("timeupdate", () => {
                    seekbar.value = (song.currentTime / song.duration) * 100;
                })
                seekbar.addEventListener("input", () => {
                    song.currentTime = (seekbar.value * song.duration) / 100;

                })
                
            })


        } else {
            item.classList.remove("bx-pause-circle");
            item.classList.add("bx-play-circle");
            masterPlay.classList.remove("bx-pause-circle");
            masterPlay.classList.add("bx-play-circle");
            gif.style.display = "none";
            song.pause();

        }

    })
})

masterPlay.addEventListener("click", () => {
    if (masterPlay.classList.contains("bx-play-circle")) {
        masterPlay.classList.remove("bx-play-circle");
        masterPlay.classList.add("bx-pause-circle");
        gif.style.display = "block";
        songList.forEach((item, i) => {
            if (item.songName == songNames.textContent) {
                songSection[i].children[2].children[1].classList.remove("bx-play-circle");
                songSection[i].children[2].children[1].classList.add("bx-pause-circle");
                song.src = songList[i].songPath;
                song.play();
                song.addEventListener("loadeddata", () => {
                    vol.addEventListener("input", () => {
                        song.volume = vol.value;
                    })
                    song.addEventListener("timeupdate", () => {
                        seekbar.value = (song.currentTime / song.duration) * 100;
                    })
                    seekbar.addEventListener("input", () => {
                        song.currentTime = (seekbar.value * song.duration) / 100;

                    })
                })

            }
        })
    } else {
        masterPlay.classList.remove("bx-pause-circle");
        masterPlay.classList.add("bx-play-circle");
        gif.style.display = "none";
        songList.forEach((item, i) => {
            if (item.songName == songNames.textContent) {
                song.src = songList[i].songPath;
                songSection[i].children[2].children[1].classList.remove("bx-pause-circle");
                songSection[i].children[2].children[1].classList.add("bx-play-circle");
                song.pause();
            }
        })

    }
})

next.addEventListener("click", ()=>{
      if (masterPlay.classList.contains("bx-pause-circle")){
        if(songIndex === 10){
            songIndex = 1;
            song.src = "/songs/1.mp3";
            song.play();
            console.log("call hua");

        }
    }
})



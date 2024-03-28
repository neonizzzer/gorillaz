let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let playpauseIcon = document.querySelector(".playpause_btn");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let repeatIcon = document.querySelector(".fa-repeat");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeated = false;
let updateTimer;

const music_list = [
  {
    img: "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/cover1.png?v=1686061794473",
    name: "Doncamatic",
    artist: "Gorillaz feat. Daley",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/Doncamatic.mp3?v=1686061958285",
  },
  {
    img: "https://cdn.glitch.global/f67bed56-e0b7-4459-bcb3-f9a5b3299e26/song%20machine%20album.jpg?v=1670246954620",
    name: "Desole",
    artist: "Gorillaz feat. Fatoumata Diawara",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/Desole.mp3?v=1686061797525",
  },
  {
    img: "https://cdn.glitch.global/f67bed56-e0b7-4459-bcb3-f9a5b3299e26/humanz%20album.jpeg?v=1670246682352",
    name: "Strobelite",
    artist: "Gorillaz feat. Peven Everett",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/Strobelite.mp3?v=1686061992085",
  },
  {
    img: "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/cover4.png?v=1686061795624",
    name: "Cracker Island",
    artist: "Gorillaz feat. Thundercat",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/CrackerIsland.mp3?v=1686061906277",
  },
  {
    img: "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/cover5.jpg?v=1686061792883",
    name: "Do Ya Thing",
    artist: "Gorillaz feat. Andre 3000 & James Murphy",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/DoYaThing.mp3?v=1686062179145",
  },
  {
    img: "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/cover6.jpg?v=1686061893208",
    name: "The Pink Phantom",
    artist: "Gorillaz feat. Elton John & 6LACK",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/ThePink.mp3?v=1686062241932",
  },
  {
    img: "https://cdn.glitch.global/f67bed56-e0b7-4459-bcb3-f9a5b3299e26/plastic%20beach%20album.jpg?v=1670246494477",
    name: "Empire Ants",
    artist: "Gorillaz feat. Little Dragon",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/EmpireAnts.mp3?v=1686062246348",
  },
  {
    img: "https://cdn.glitch.global/f67bed56-e0b7-4459-bcb3-f9a5b3299e26/demon%20days.jpg?v=1670246346101",
    name: "Dirty Harry",
    artist: "Gorillaz feat. Bootie Brown",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/DirtyHarry.mp3?v=1686061922968",
  },
  {
    img: "https://cdn.glitch.global/f67bed56-e0b7-4459-bcb3-f9a5b3299e26/gorillaz%20album.jpg?v=1670246348330",
    name: "Rock The House",
    artist: "Gorillaz",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/RockTheHouse.mp3?v=1686062165573",
  },
  {
    img: "https://cdn.glitch.global/f67bed56-e0b7-4459-bcb3-f9a5b3299e26/humanz%20album.jpeg?v=1670246682352",
    name: "The Apprentice",
    artist: "Gorillaz feat. Zebra Katz, Ray BLK, Rag'N'Bone Man",
    music:
      "https://cdn.glitch.global/29e32685-de48-4b07-9cec-c245da8a258c/Apprentice.mp3?v=1686061314054",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
  randomIcon.style.color = "#d90368";
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
  randomIcon.style.color = "#252525";
}

function repeatTrack() {
  isRepeated ? pauseRepeat() : startRepeat();
}

function startRepeat() {
  isRepeated = true;
  let current_index = track_index;
  repeatIcon.style.color = "#d90368";
}

function pauseRepeat() {
  isRepeated = false;
  repeatIcon.style.color = "#252525";
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  //playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  //playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-5x"></i>';
}

function nextTrack() {
  if (isRepeated == false) {
    if (track_index < music_list.length - 1 && isRandom === false) {
      track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
      let random_index = Number.parseInt(Math.random() * music_list.length);
      track_index = random_index;
    } else {
      track_index = 0;
    }
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

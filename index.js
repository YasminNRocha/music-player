let musicContainer = document.getElementById('music-container')
let cover = document.getElementById('cover')
let songName = document.getElementById('song-name')
let artist = document.getElementById('artist')
let audio = document.getElementById('audio')

let btnPlay = document.getElementById('start')
let btnNext = document.getElementById('next')
let btnBack = document.getElementById('back') 

let progress = document.getElementById('pregress-bar-content')
let progressContainer = document.getElementById('progress-bar-base')

let songs = ['love you like', 'always', 'zzz']
let artists = ['viviz', 'dreamcatcher', 'youha']

let i = 0

songInfo(songs[i])


function songInfo (song) {
    audio.src = `./audio/${song}.mp3`
    cover.src = `./img/${song}.jpg`
    songName.innerHTML = song
    artist.innerHTML = artists[i]
}

function playSong() {
    musicContainer.classList.add('play')
    btnPlay.classList.remove('fa-play')
    btnPlay.classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    btnPlay.classList.add('fa-play')
    btnPlay.classList.remove('fa-pause')

    audio.pause()
}

function nextSong() {
    i++;

    if (i > songs.length - 1) {
        i = 0
    }
    
    songInfo(songs[i])
    playSong()

}

function backSong() {
    i--;
    
    if (i < 0) {
        i = songs.length - 1
    }
    
    songInfo(songs[i])
    playSong()

}

function updateTime(p) {
    let {duration, currentTime} = p.srcElement;
    let progressPercent = currentTime / duration * 100;
    progress.style.width = `${progressPercent}%`
}

function setTime(e) {
    let width = this.clientWidth
    let clickX = e.offsetX
    let duration = audio.duration

    audio.currentTime = (clickX / width) * duration;
}

btnPlay.addEventListener('click', () => {
    let isPlaying = musicContainer.classList.contains('play')

    if (isPlaying){
        pauseSong()
    }
    else {
        playSong()
    }
})

btnNext.addEventListener('click', nextSong)
btnBack.addEventListener('click', backSong)

audio.addEventListener('timeupdate', updateTime)
progressContainer.addEventListener('click', setTime)

audio.addEventListener('timeupdate', timer)



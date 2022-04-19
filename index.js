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

let volume = document.querySelector('#volume')
let btnVolume = document.getElementById('volume-icon')

let totalTime = document.getElementById('total-time')
let nowTime = document.getElementById('current-time')

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

function timer(e) {
    let {duration, currentTime} = e.srcElement;

    let minutes = Math.floor(currentTime / 60)
    let seconds = Math.floor(currentTime % 60)
    seconds = seconds < 10 ? 0 + `${seconds}` : `${seconds}`

    let fullTimeM = Math.floor(duration / 60)
    let fullTimeS = Math.floor(duration % 60)

    nowTime.innerHTML = `${minutes}:${seconds}`
    totalTime.innerHTML = `${fullTimeM}:${fullTimeS}`

    if(isNaN(fullTimeM, fullTimeS)) {
        totalTime.innerHTML = "0:00"
    }
    else{
    totalTime.innerHTML = `${fullTimeM}:${fullTimeS}`
    }
}   

function muteSong(e) {
    if(audio.muted) {
        audio.muted = false
        btnVolume.classList.add('fa-volume-high')
        btnVolume.classList.remove('fa-volume-xmark')
        volume.value = 50
    }
    else {
        audio.muted = true
        btnVolume.classList.remove('fa-volume-high')
        btnVolume.classList.add('fa-volume-xmark')
        volume.value = 0
    }
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
audio.addEventListener ('ended', nextSong)


volume.addEventListener('change', function(e) {
    audio.volume = e.currentTarget.value / 100;
})

btnVolume.addEventListener('click', muteSong)


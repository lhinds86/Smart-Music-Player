console.log('working')

const musicContainer = document.querySelector('.music-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

//Songs 
const songs = ['B.I.G - One More Chance', ' B.I.G - Juicy', '2Pac - Ambitionz Az A Ridah', '2Pac - Picture Me Rollin']



//Song Tracker
let songIndex = 0

//Init song
loadSong(songs[songIndex])

//Update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `/music/${song}.mp3`
  cover.src = `/images/album-covers/${song}.jpeg`
}
//Play / Pause button
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Previous song
function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong();
}

// Next song
function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

//Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
  if (progressPercent == 100){
        nextSong()
    }
}
audio.addEventListener('timeupdate', updateProgress)

// User progress bar input
function setProgress(e)  {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// Skip Buttons
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
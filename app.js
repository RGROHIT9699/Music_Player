

const play = document.querySelector('#pb')
const prog = document.querySelector('#prog')
const sl = document.querySelector('#song-list')

let cur = 0;
let song = [
    {
        name: 'e0' ,
        id: 0
    },
    {
        name: 'e1' ,
        id: 1
    },
    {
        name: 'e2' ,
        id: 2
    },
    {
        name: 'e3' ,
        id: 3
    }
]

const aud = new Audio('./assets/e1.mp3');

for(let s of song){
    const li = document.createElement('li');
    li.innerText = s.name;
    li.setAttribute('id',s.id);
    li.classList.add('si');
    sl.append(li);
}

play.addEventListener('click',function(){
    aud.paused ? aud.play() : aud.pause();
    if(play.children[0].classList.contains('fa-circle-play')){
        play.children[0].classList.remove('fa-circle-play');
        play.children[0].classList.add('fa-circle-pause');
    } else {
        play.children[0].classList.remove('fa-circle-pause');
        play.children[0].classList.add('fa-circle-play');
    }
})

aud.addEventListener('timeupdate',function() {
    const pro = aud.currentTime * 100 / aud.duration;
    prog.value = pro;
})

prog.addEventListener('change', function() {
    const update = aud.duration * prog.value /100;
    aud.currentTime = update;
})

sl.addEventListener('click',function(e){
    let sgi = e.target.getAttribute('id');
    aud.src = `./assets/e${sgi}.mp3`;
    cur = sgi;
    aud.currentTime = 0;
    aud.play();
    play.children[0].classList.remove('fa-circle-play');
    play.children[0].classList.add('fa-circle-pause');
})

const prev = document.querySelector('#pr');
const next = document.querySelector('#nr');
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

function prevSong() {
    if (cur > 0) {
        cur--;
        updateSong();
    } else if( cur === 0 ) {
        cur = song.length - 1;
        updateSong();
    }
}

function nextSong() {
    if (cur < song.length - 1) {
        cur++;
        updateSong();
    } else if (cur === song.length - 1) {
        cur = 0;
        updateSong();
    }
}

function updateSong() {
  const newSongId = song[cur].id;
  aud.src = `./assets/e${newSongId}.mp3`;
  aud.currentTime = 0;
  aud.play();
  play.children[0].classList.remove('fa-circle-play');
  play.children[0].classList.add('fa-circle-pause');
}
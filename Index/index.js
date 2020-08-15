const seeker = document.getElementById("audio-seeker");
const pausePlayBtn = document.getElementById("pause/play");
const forward = document.getElementById("forward");
const rewind = document.getElementById("rewind");
const shuffle = document.getElementById("shuffle");
const repeat = document.getElementById("repeat");
const checkBox = document.querySelectorAll(".checkbox-menu");
const body = document.getElementsByTagName("body")[0];
const songName = document.getElementById("seeker-song-name");
const artistName = document.getElementById("seeker-artist-name");
const seekerImage = document.getElementById("song-thumbnail");
const playLinks = document.querySelectorAll(".play-link");
const volumeIcon = document.getElementById("volume-icon");
const volumeSeeker = document.getElementById("volume-seeker");
const footer = document.getElementById("player-container");
const totalTime = document.getElementById("total-time");
const timeElapsed = document.getElementById("time-elapsed"); 

let songNamesList = [{name:"dont-look", artist:"karan-aujla"} ,{name:"demons", artist:"imagine-dragons"},{name:"skechers", artist:"drip-report"},{name:"old-skool", artist:"sidhu-moosewala"},{name:"aaj-bhi", artist:"vishal-mishra"},{name:"allah-ve", artist:"jassi-gill"},
{name:"stuck-with-u", artist:"ariana-grande"},{name:"chitta-kurta", artist:"karan-aujla"},{name:"go-crazy", artist:"chris-brown"},{name:"lose-yourself", artist:"eminem"},{name:"not-afraid", artist:"eminem"},
{name:"bad-liar", artist:"imagine-dragons"},{name:"righteous", artist:"juice-WRLD"},{name:"legend", artist:"sidhu-moosewala"},{name:"be-kind", artist:"marshmellow"},{name:"move", artist:"raftaar"},
{name:"na-na-na", artist:"karan-aujla"},{name:"nri", artist:"rajakumari"},{name:"red-eyes", artist:"karan-aujla"},{name:"same-beef", artist:"sidhu-moosewala"},{name:"teri-mitti", artist:"b-praak"},
{name:"teri-yaari", artist:"milind-gaba"},{name:"the-scotts", artist:"travis-scott"},{name:"hall-of-fame", artist:"the-script"}];


let isPlaying = false;
let index= 0;

let song  = new Audio();
song.autoplay = true;

// Adding the song dynamically to the player
for(let i of playLinks){
    i.addEventListener("click",function(e){
        e.preventDefault();
        // making the player visible
        // TO-DO

        //Adding the song
        song.src = "./songs/" + i.getAttribute("data-song-name") + ".mp3";
        //adding song image
        seekerImage.src = "./img/Q/" + i.getAttribute("data-song-name") + ".png";
        //adding about info 
        songName.innerText = i.getAttribute("data-song-name");
        artistName.innerText = i.getAttribute("data-artist");

        isPlaying=true;
        //setting initial audio of the song
        song.volume = volumeSeeker.value;
        // getting the song duration and setting the length of seeker
        setTimeout(function(){
            seeker.max = song.duration ;
            let minutes = Math.floor(song.duration/60);
            let seconds = Math.floor(song.duration%60);
            if(seconds<10){
                totalTime.innerText = "0" + minutes.toString() + ":0" + seconds.toString();
            }else{
                totalTime.innerText = "0" + minutes.toString() + ":" + seconds.toString();
            }
            
        },200);

        footer.style.display = "flex";

        for(let k=0;k<songNamesList.length;k++){
            if(songNamesList[k].name == i.getAttribute("data-song-name")){
                index = k;
            }
        }
    })
}

//making the seeker move with song
song.addEventListener("timeupdate",function(){
        seeker.value = song.currentTime;
        let minutes = Math.floor(song.currentTime/60);
        let seconds = Math.floor(song.currentTime%60);
        if(seconds<10){
            timeElapsed.innerText = "0" + minutes.toString() + ":0" + seconds.toString();
        }else{
            timeElapsed.innerText = "0" + minutes.toString() + ":" + seconds.toString();
        }
});
//  manipulating song using seeker
seeker.addEventListener("change",function(){
    song.currentTime = seeker.value;
})

//working of pause/play button
pausePlayBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(isPlaying){
        song.pause();
        isPlaying = false;        
        pausePlayBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }else{
        song.play();
        isPlaying = true;
        pausePlayBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }
});


//volume controls
volumeSeeker.addEventListener("change",function(){
    song.volume = volumeSeeker.value;
    // prevVol = volumeSeeker.value;
    if(song.volume == 0 ){
        volumeIcon.innerHTML = "<i class='fa fa-volume-off' aria-hidden='true'></i>";
    }
    else if(song.volume <=0.3){
        volumeIcon.innerHTML = "<i class='fa fa-volume-down' aria-hidden='true'></i>";
    }
    else{
        volumeIcon.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>";
    }
});


//mute function
volumeIcon.addEventListener("click",function(){   
    if(song.muted){
        song.muted = false;
        volumeSeeker.value = song.volume;
        console.log("unmuted-succesfully");
        volumeIcon.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>";
    }
    else{
        song.muted = true;
        volumeSeeker.value = 0;
        console.log("muted-succesfully");
        volumeIcon.innerHTML = "<i class='fa fa-volume-off' aria-hidden='true'></i>";
    }
});


let onRepeat = false;
//repeat button function
repeat.addEventListener("click",function(){
    if(!onRepeat){
        song.loop = true;
        onRepeat = true;
        repeat.style.color = "#1475ff";
    }
    else{
        song.loop = false;
        onRepeat = false;
        repeat.style.color = "white";
    }
});


//shuffle playlist function
let shufflePressForward = false;
let shufflePressRewind = false;
shuffle.addEventListener("click",function(){
    shufflePressForward= true;
    shufflePressRewind = true;
    //fisher-yates algorithm
    for(let i= songNamesList.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = songNamesList[i];
        songNamesList[i] = songNamesList[j];
        songNamesList[j] = temp;
    }
})

shuffle.onmousedown = function(){
    shuffle.style.color = "#1475ff";
}
shuffle.onmouseup = function(){
    shuffle.style.color = "white";
}




//forward-button function
forward.addEventListener("click",function(){
    if(shufflePressForward){
        shufflePressForward = false;
        for(let k=0;k<songNamesList.length;k++){
            if(songNamesList[k].name == songName.innerText ){
                index = k;
            }
        }
    }else{
        index=index+1;
    }

    if(index<songNamesList.length){
        song.src = "./songs/" + songNamesList[index].name + ".mp3";
        //adding song image
        seekerImage.src = "./img/Q/" + songNamesList[index].name + ".png";
        //adding about info 
        songName.innerText = songNamesList[index].name;
        artistName.innerText = songNamesList[index].artist;

        isPlaying=true;
        //setting initial audio of the song
        song.volume = volumeSeeker.value;
        // getting the song duration and setting the length of seeker
        setTimeout(function(){
            seeker.max = song.duration ;
            let minutes = Math.floor(song.duration/60);
            let seconds = Math.floor(song.duration%60);
            if(seconds<10){
                totalTime.innerText = "0" + minutes.toString() + ":0" + seconds.toString();
            }else{
                totalTime.innerText = "0" + minutes.toString() + ":" + seconds.toString();
            }
        },200);
    }
    else{
        song.currentTime = song.duration;
        seeker.value = song.currentTime;
    }
});

//rewind function

rewind.addEventListener("click",function(){
    if(shufflePressRewind){
        shufflePressRewind = false;
        for(let k=0;k<songNamesList.length;k++){
            if(songNamesList[k].name == songName.innerText ){
                index = k;
            }
        }
    }else{
        index=index-1;
    }
    if(index >= 0){
        song.src = "./songs/" + songNamesList[index].name + ".mp3";
        //adding song image
        seekerImage.src = "./img/Q/" + songNamesList[index].name + ".png";
        //adding about info 
        songName.innerText = songNamesList[index].name;
        artistName.innerText = songNamesList[index].artist;

        isPlaying=true;
        //setting initial audio of the song
        song.volume = volumeSeeker.value;
        // getting the song duration and setting the length of seeker
        setTimeout(function(){
            seeker.max = song.duration ;
            let minutes = Math.floor(song.duration/60);
            let seconds = Math.floor(song.duration%60);
            if(seconds<10){
                totalTime.innerText = "0" + minutes.toString() + ":0" + seconds.toString();
            }else{
                totalTime.innerText = "0" + minutes.toString() + ":" + seconds.toString();
            }
        },200);
    }
    else{
        song.currentTime = 0;
        seeker.value = song.currentTime;
    }
});
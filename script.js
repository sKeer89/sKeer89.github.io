var pieces, radius, fft, mapMouseX, mapMouseY, toggleBtn, audio, audios, uploadBtn, uploadedAudio, uploadAnim, textInput;

// COLOR SCHEME
// background, inner (bass), middle (mid), outer (treble)
var colorPalette1 = ["#000", "#753456", "#FF8E8E", "#FFB1B1"]; //pink FFB1B1
var colorPalette2 = ["#000", "#CF9D63", "#F29F70", "#FFC353"]; //orange
var colorPalette3 = ["#000", "#799985", "#4c956c", "#A1C765"]; //green
var colorPalette4 = ["#000", "#739EAD", "#87CEFA", "#2D7AB3"]; //blue
var colorPalette5 = ["#000", "#837BD0", "#814F9C", "#8D509C"]; //purple
var palettes = [colorPalette1, colorPalette2, colorPalette3, colorPalette4, colorPalette5];
var state = 0;
var colorPalette = palettes[state];
var uploadLoading = false;
/*
Feeling on top of the world! - Kawhi Kabhi aditi
Need a little comfort today. - All too well
Have an exam tomorrow? - ME
Exploring the wonders around me. - Starlight
Ready to groove and move - Shake it off
In the mood for love. - Paper rings
Brighter days are ahead! - You are on your kid
Feeling worried! - Daylight
Can feel the serenity now - Cardigan
Really tired, fed up! - Illicit affairs */
var artists = ["Tash Sultana", "Taylor Swift", "Taylor Swift", "Taylor Swift", "Taylor Swift", "Taylor Swift", "Taylor Swift", "Taylor Swift", "Taylor Swift", "Taylor Swift"];
var songs = ["Notion", "All too well", "ME", "Starlight", "Shake it off", "Paper Rings", "You're on your own kid", "Daylight", "Cardigan", "Illicit Affairs"];
var tracks = ["track/Kabhi kabhi Aditi.mp3",
    "track/Taylor Swift - All to well.mp3",
    "track/Taylor Swift - Me.mp3",
    "track/Taylor Swift - Starlight.mp3",
    "track/Taylor Swift - Shake it off.mp3",
    "tracks/Taylor Swift - Paper Rings.mp3", //6 - 1 = 5
    "track/Taylor Swift - You are your own kid.mp3",
    "track/daylight.mp3",
    "track/Taylor Swift - Cardigan.mp3",
    "track/taylor-swift-illicit-affairs-official-lyric-video.mp3"
];

function preload() {
    audio = loadSound("tracks/TashSultana-Notion.mp3");
}

function manual_load(path) {
    uploadedAudio = loadSound(path, uploadedAudioPlay);
}


function uploaded(file) {
    console.log(file);
    uploadLoading = true;
    uploadedAudio = loadSound(file.data, uploadedAudioPlay);
}


function uploadedAudioPlay(audioFile) {

    uploadLoading = false;

    if (audio.isPlaying()) {
        audio.pause();
    }

    audio = audioFile;
    audio.loop();
}


function setup() {
    uploadAnim = select('#uploading-animation');
    createCanvas(windowWidth, windowHeight);
    toggleBtn = createButton("Resume / Pause");
    uploadBtn = createFileInput(uploaded);
    uploadBtn.addClass("upload-btn");
    toggleBtn.addClass("toggle-btn");
    toggleBtn.mousePressed(toggleAudio);

    let userInfoDiv = createDiv('Hello Kitty fhdgfdbn bf dhgbhfdgh fhguhfdghfdj user_id is unique and immutable and uniquely identifies a user<br>Password stores the hash value of the user’s password');
    userInfoDiv.style('padding', '10px');
    userInfoDiv.style('text-align', 'center');
    userInfoDiv.style('color', 'white');
    userInfoDiv.style('position', 'absolute');
    userInfoDiv.style('width', '400px');
    userInfoDiv.style('left', '50%');
    userInfoDiv.style('top', 'calc(100% - 170px)');
    userInfoDiv.style('transform', 'translateX(-50%)');
    userInfoDiv.style('border', '1px solid red');
    userInfoDiv.style('font-family', '"Roboto", sans-serif');
    userInfoDiv.style('font-size', '0.85rem');
    userInfoDiv.style('box-sizing', 'border-box');
    userInfoDiv.style('background', 'rgba(0, 0, 0, 0.8)');
    userInfoDiv.style('border-radius', '5px');
    userInfoDiv.style('z-index', '10');

    // Add the div to the canvas wrapper, assuming there is one
    let canvasWrapper = select('.canvas-wrapper');
    if (canvasWrapper) {
        canvasWrapper.child(userInfoDiv);
    } else {
        document.body.appendChild(userInfoDiv.elt);
    }
    fft = new p5.FFT();
    audio.pause();
}

function draw() {

    // Add a loading animation for the uploaded track
    if (uploadLoading) {
        uploadAnim.addClass('is-visible');
    } else {
        uploadAnim.removeClass('is-visible');
    }


    background(colorPalette[0]);
    noFill();
    fft.analyze();
    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy("treble");
    var mid = fft.getEnergy("mid");

    var map_mid = map(mid, 0, 255, -radius, radius);
    var scale_mid = map(mid, 0, 255, 1, 1.5);

    var map_treble = map(treble, 0, 255, -radius, radius);
    var scale_treble = map(treble, 0, 255, 1, 1.5);

    var map_bass = map(bass, 0, 255, -100, 800);
    var scale_bass = map(bass, 0, 255, 0, 0.8);

    // mapMouseX = map(mouseX, 0, width, 4, 8);
    mapMouseX = map(mouseX, 0, width, windowWidth / 4, windowWidth);
    mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

    pieces = 6;
    radius = Math.sqrt((mapMouseX ** 2) + (mapMouseY ** 2)) / 3;

    translate(windowWidth / 2, windowHeight / 2);

    strokeWeight(1);

    for (i = 0; i < pieces; i += 0.25) {

        rotate(TWO_PI / pieces);


        /*----------  BASS  ----------*/
        push();
        strokeWeight(5);
        stroke(colorPalette[1]);
        scale(scale_bass);
        rotate(frameCount * -0.5);
        line(map_bass, radius / 2, radius, radius);
        line(-map_bass, -radius / 2, radius, radius);
        pop();



        /*----------  MID  ----------*/
        push();
        strokeWeight(0.5);
        stroke(colorPalette[2]);
        scale(scale_mid);
        line(map_mid, radius / 2, radius, radius);
        line(-map_mid, -radius / 2, radius, radius);
        pop();


        /*----------  TREBLE  ----------*/
        push();
        stroke(colorPalette[3]);
        scale(scale_treble);
        line(map_treble, radius / 2, radius, radius);
        line(-map_treble, -radius / 2, radius, radius);
        pop();

    }

}


function toggleAudio() {
    if (audio.isPlaying()) {
        console.log("playing");
        audio.pause();
    } else {
        console.log("not playing");
        audio.play();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

$("#tracknum").focus(function() { $(this).val(""); });

function play_new_song(index) {
    manual_load(tracks[index]);
    this.document.getElementById("fixed-div").innerHTML = artists[index] + "<br>" + songs[index];
    $("#fixed-div").slideDown();
    this.setTimeout(function() {
        this.document.getElementById("fixed-div").innerHTML = "";
        $("#fixed-div").slideUp()
    }, 5000);
}

$("#body").dblclick(function() {
    console.log(state);
    if (state < 4)
        state += 1;
    else
        state = 0;
    colorPalette = palettes[state];
})

window.addEventListener('keypress', function(e) {
    var keyCode = e.keyCode;

    // audio switching
    if (keyCode >= 48 && keyCode <= 57) {
        var index = keyCode - 48;
        play_new_song(index);
    }

    // color scheme switching [Enter]
    else if (keyCode == 13) {
        if (state < 4)
            state += 1;
        else
            state = 0;
    }


    // play/pause toggle [Space]
    else if (keyCode == 32) {
        toggleAudio();
    }

    colorPalette = palettes[state];
});

window.addEventListener('load', function() {
    var selectElement = document.getElementById('tracknum');

    selectElement.addEventListener('change', function() {
        var value = this.value;
        if (value > 0 && value <= 10) {
            play_new_song(value - 1);
        }
        console.log('Track selected:', value);
    });
});
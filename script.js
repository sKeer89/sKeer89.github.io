var pieces, radius, fft, mapMouseX, mapMouseY, toggleBtn, audio, audios, uploadBtn, uploadedAudio, uploadAnim, textInput;

// COLOR SCHEME
// background, inner (bass), middle (mid), outer (treble)
var colorPalette1 = ["#3B3131", "#753456", "#FF8E8E", "#FFB1B1"];
var colorPalette2 = ["#25383C", "#CF9D63", "#F29F70", "#FFC353"];
var colorPalette3 = ["#666362", "#799985", "#4c956c", "#A1C765"];
var colorPalette4 = ["#566D7E", "#739EAD", "#87CEFA", "#2D7AB3"];
var colorPalette5 = ["#254117", "#837BD0", "#814F9C", "#8D509C"];
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

    let userInfoDiv = createDiv('Your privacy and preferences are important to us. The dashboard is designed to respect your data and personal settings without compromising on the user experience');
    userInfoDiv.style('padding', '10px');
    userInfoDiv.style('text-align', 'center');
    userInfoDiv.style('color', 'white');
    userInfoDiv.style('position', 'absolute');
    userInfoDiv.style('width', '400px');
    userInfoDiv.style('left', '85%');
    userInfoDiv.style('top', 'calc(100% - 175px)');
    userInfoDiv.style('transform', 'translateX(-50%)');
    userInfoDiv.style('border', '1px solid');
    userInfoDiv.style('font-family', '"Roboto", sans-serif');
    userInfoDiv.style('font-size', '0.85rem');
    userInfoDiv.style('box-sizing', 'border-box');
    userInfoDiv.style('background', 'transparent');
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
        triangle(0, radius / 2, map_bass, radius, -map_bass, radius);
        pop();



        /*----------  MID  ----------*/
        push();
        strokeWeight(0.5);
        stroke(colorPalette[2]);
        scale(scale_mid);
        ellipse(0, radius / 2, map_mid);
        pop();


        /*----------  TREBLE  ----------*/
        push();
        strokeWeight(0.5);
        stroke(colorPalette[2]);
        scale(scale_mid);
        octagon(0, radius / 2, 50); // Draw octagon
        pop();

    }

}

// Function to draw an octagon
function octagon(x, y, radius) {
    var angle = TWO_PI / 8;
    beginShape();
    for (var i = 0; i < TWO_PI; i += angle) {
        var sx = x + cos(i) * radius;
        var sy = y + sin(i) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
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

    if (keyCode == 13) {
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
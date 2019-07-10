//I use Chrome since p5.AudioIn is not supported on Safari and iOS.
let song;
let button;
let displayMode;
let buttonDisplay;

let amp;
const widthX = 600;//Must be power of 2 if I use p5.FFT()
const resolution = 64;
const w = widthX / resolution;
let offset = 0.0;
let sphere;
let rotateAngle = 0.0;
let offsetSlider, lengthSlider, lineWeightSlider, colorChangeSlider;
let offsetDisplay, lengthDisplay, lineWeightDisplay, colorChangeDisplay;
let colorChangeSpeed;

let pointWeightSlider;

let flashes;
let doesFlashes = false;
let verticalLines;
let doesShowLines = false;

let headLine1;
let headLine2;


function preload(){
  song = loadSound("Konac - Away.mp3");
  // song = loadSound("bensound-popdance.mp3");
  // song = loadSound("bensound-romantic.mp3");
  // song = loadSound("Daniel_Shiffman - This_Dot_(prod._Kristian_Pedersen).wav");
}

function setup(){
  createCanvas(widthX, widthX, WEBGL);
  angleMode(DEGREES);

  buttonDisplay = createDiv();
  buttonDisplay.class("buttonDisplay");
  button = createButton("play");
  button.mousePressed(togglePlaying);

  amp = new p5.Amplitude(0.5);
  // fft = new p5.FFT(0.5, resolution);//For linear

  // fft = new p5.FFT(0.5, 256);
  sphere = new Sphere();

  displayMode = createSelect();
  displayMode.option("Line");
  displayMode.option("Point");

  offsetDisplay = createDiv();
  offsetDisplay.class("Display");
  offsetSlider = createSlider(0, 0.1, 0.02, 0.01);
  offsetSlider.class("Slider");

  headLine1 = createP("----- Line mode -----");
  headLine1.class("headline");


  lengthDisplay = createDiv();
  lengthDisplay.class("Display");
  lengthSlider = createSlider(0.1, 2, 0.1, 0.1);
  lengthSlider.class("Slider");

  lineWeightDisplay = createDiv();
  lineWeightDisplay.class("Display");
  lineWeightSlider = createSlider(0, 10, 1, 1);
  lineWeightSlider.class("Slider");

  colorChangeDisplay = createDiv();
  colorChangeDisplay.class("Display");
  colorChangeSlider = createSlider(1000, 6000, 3000, 500);
  colorChangeSlider.class("Slider");

  headLine2 = createP("----- Point mode -----");
  headLine2.class("headline");

  flashes = createCheckbox("flashes", false);
  flashes.changed(pointModeFlashes);
  verticalLines = createCheckbox("verticalLines", false);
  verticalLines.changed(pointModeVerticalLines);
}

function draw(){
  background(0);

  let vol = amp.getLevel();
  rotateAngle += 0.2;

  sphere.rotation(vol, rotateAngle);
  sphere.show(vol);

  offsetDisplay.html("Noise offset: " + offsetSlider.value());
  lengthDisplay.html("Line length: " + lengthSlider.value());
  lineWeightDisplay.html("Line thickness: " + lineWeightSlider.value());

  colorChangeSpeed = map(colorChangeSlider.value(), 1000, 6000, 6, 1);
  colorChangeDisplay.html("Color change speed: " + colorChangeSpeed);

}

function pointModeFlashes(){
  if(this.checked()){
    doesFlashes = true;
  }else{
    doesFlashes = false;
  }
}
function pointModeVerticalLines(){
  if(this.checked()){
    doesShowLines = true;
  }else{
    doesShowLines = false;
  }
}


function togglePlaying(){
  if(!song.isPlaying()){
    song.loop();
    button.html("pause");
  }else{
    song.pause();
    button.html("play");
  }
}

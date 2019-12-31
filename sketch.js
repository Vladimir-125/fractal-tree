let angle;
let strWeightRatio;
let angleSlider;
let weightRatioSlider;
let updateBtn;
let angleOld;
let strWeightRatioOld;
let saveName;
let saveBtn;
var canv;
function setup() {
  canv = createCanvas(window.innerWidth*0.7, window.innerHeight - 100);
  canv.style('display', 'block');
  noLoop();
  var angleChange = createDiv('').size(100, 30);
  angleChange.html('Change angle: ');
  angleChange.style('float', 'left');
  angleSlider = createSlider(0, TWO_PI, Math.PI/4, 0.01);
  angleSlider.style('display', 'block');
  angleSlider.style('clear', 'right');
  var weightChange = createDiv('').size(120, 30);
  weightChange.html('Change thickness: ');
  weightChange.style('clear', 'left');
  weightChange.style('float', 'left');
  weightRatioSlider = createSlider(0, 0.2, 0.07, 0.01);
  weightRatioSlider.style('clear', 'right');
  weightRatioSlider.style('display', 'block');
  angle = angleOld = angleSlider.value(); //initialize current and old
  strWeightRatio = strWeightRatioOld = weightRatioSlider.value(); //initialize current and old
  updateBtn = createButton('Update');
  updateBtn.mousePressed(update);
  updateBtn.style('margin-top', '10px');
  updateBtn.style('margin-left', '-115px');
  saveBtn = createButton('Save image');
  saveBtn.mousePressed(saveCnv);
  saveBtn.style('margin-left', '10px');
}
function draw() {
  	// put drawing code here
  	background(51); // 51 - dark grey
	angleOld = angle;
	strWeightRatioOld = strWeightRatio;
	let len = 180;
	stroke(255); // white
	strokeWeight(len*0.5);
	translate(width/2, height); // moves origin point to the new point
	branch(len);
}

function mouseClicked() {
	angle = angleSlider.value();
  	strWeightRatio = weightRatioSlider.value();
  	if(angle!=angleOld || strWeightRatio!=strWeightRatioOld){
  		redraw();
  	}
}

function update(){
	redraw();
}

function branch(len){
	let nextBranchRatio = getRandomArbitrary(0.5, 0.7); //0.67 2/3
	let desicionVar;
	strokeWeight(len*strWeightRatio);
	line(0, 0, 0, -len);
	translate(0, -len);
	desicionVar = Math.random() * 100;
	if(len > 4 ){
		let mutateAngle = getRandomArbitrary(0.5, 1);

		push();
		branch(len*nextBranchRatio);
		pop();

		desicionVar = Math.random() * 100;
		nextBranchRatio = getRandomArbitrary(0.5, 0.7);

		if(desicionVar < 80) // 60% chance
		{
		push(); // saves its location
		rotate(angle*mutateAngle);
		branch(len*nextBranchRatio);
		pop();	// retrives previously saved location
		}
		
		desicionVar = Math.random() * 100;
		nextBranchRatio = getRandomArbitrary(0.5, 0.7);

		if(desicionVar < 80) // 60% chance
		{
		push()
		rotate(-angle*mutateAngle);
		branch(len*nextBranchRatio);
		pop(); 
		}
	}
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

 function saveCnv(){
 	saveCanvas();
 }
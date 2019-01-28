//set the modes for the things we are using
angleMode = "degrees";
textAlign(CENTER,CENTER);
ellipseMode(CENTER);

//Define Clock object
var Clock = function(position, sizeMult, colors,hasArc, hasFace) {
    //sets up the time values
    this.hr = 0;
    this.min = 0;
    this.sec = 0;
    //sets up the angles for each
    this.hourAngle = 0;
    this.minuteAngle = 0;
    this.secondAngle = 0;
    //A PVector for position
    this.pos = position;
    //A decimal, normal size = 1.00
    this.size = sizeMult;
    //colors
    this.faceColor = colors[0];
    this.hColor = colors[1];
    this.mColor = colors[2];
    this.sColor = colors[3];
    
    //optional arc and clock face
    this.arcs = hasArc;
    this.face = hasFace;
};
Clock.prototype.update = function() {
    //get the time
    this.hr = hour();
    this.min = minute();
    this.sec = second();
    //turn them into angles
    this.hourAngle = map((this.hr % 12), 0, 12, 0, 360);
    this.minuteAngle = map(this.min, 0, 60, 0, 360);
    this.secondAngle = map(this.sec, 0, 60, 0, 360);
};
Clock.prototype.drawFace = function() {
    strokeWeight(4*this.size);
    stroke(this.faceColor);
    noFill();
    ellipse(0,0,250*this.size,250*this.size);
    fill(this.faceColor);
    textSize(this.size*18);
    for (var deg = 30; deg < 390; deg += 30) {
        var rotated = new PVector(110*this.size, 0);
        rotated.rotate(deg);
        //Draw Dashes
            var dash1 = rotated.get();
            var dash2 = rotated.get();
            dash1.mult(0.8);
            dash2.mult(0.85);
            line(dash1.x,dash1.y,dash2.x,dash2.y);
        //Show Text the right way up
            pushMatrix();
            translate(rotated.x, rotated.y);
            rotate(90);
            text(deg/30, 0, 0);
            popMatrix();
    }
};
Clock.prototype.drawArc = function() {
    noFill();
    //Second (Long, Red) Hand
    strokeWeight(5*this.size);
    stroke(this.sColor);
    arc(0, 0, 300*this.size, 300*this.size, 0, this.secondAngle);
    
    //Minute (Medium, Purple) Hand
    strokeWeight(7*this.size);
    stroke(this.mColor);
    arc(0, 0, 280*this.size, 280*this.size, 0, this.minuteAngle);
    
    //Hour (Short, Green) Hand
    strokeWeight(8*this.size);
    stroke(this.hColor);
    arc(0, 0, 260*this.size, 260*this.size, 0, this.hourAngle);
};
Clock.prototype.draw = function() {
    resetMatrix();
    translate(this.pos.x,this.pos.y);
    rotate(-90);
    //Optional Clock Face
    if (this.face) {
        this.drawFace();
    }
    //Optional Arcs
    if (this.arcs) {
        this.drawArc();
    }
    //Clock Hands
    //Second (Long, Red) Hand
        strokeWeight(3*this.size);
        pushMatrix();
        rotate(this.secondAngle);
        stroke(this.sColor);
        line(0, 0, 100*this.size, 0);
        popMatrix();
        
    //Minute (Medium, Purple) Hand
        strokeWeight(7*this.size);
        pushMatrix();
        rotate(this.minuteAngle);
        stroke(this.mColor);
        line(0, 0, 75*this.size, 0);
        popMatrix();
        
    //Hour (Short, Green) Hand
        strokeWeight(8*this.size);
        pushMatrix();
        rotate(this.hourAngle);
        stroke(this.hColor);
        line(0, 0, 50*this.size, 0);
        popMatrix();
    //Center Dot
        stroke(this.faceColor);
        point(0, 0);
};
Clock.prototype.run = function(){
    this.update();
    this.draw();
};
//Make a Clock with regular colors and nothing (the old one)
var clock1pos = new PVector(100,100);
var clock1Colors = [color(255, 255, 255), color(135, 81, 252), color(158, 255, 97), color(255, 100, 150)];
var clock1 = new Clock(clock1pos, 0.70,clock1Colors, 0, 0);

//MAKE EXTRA CLOCKS
//Make a Clock with regular colors and a face
var clock2pos = new PVector(300,100);
var clock2Colors = [color(255, 255, 255), color(135, 81, 252), color(158, 255, 97), color(255, 100, 150)];
var clock2 = new Clock(clock2pos, 0.70, clock2Colors, 0, 1);

//Make a Clock with regular colors and arcs
var clock3pos = new PVector(100,300);
var clock3Colors = [color(255, 255, 255), color(135, 81, 252), color(158, 255, 97), color(255, 100, 150)];
var clock3 = new Clock(clock3pos, 0.70, clock3Colors, 1, 0);

//Make a Clock with different colors and a red face
var clock4pos = new PVector(300,300);
var clock4Colors = [color(250, 147, 147), color(255, 255, 255), color(255, 255, 255), color(255, 255, 255)];
var clock4 = new Clock(clock4pos, 0.70,clock4Colors, 0, 1);

draw = function() {
    background(0, 0, 0);
    clock1.run();
    //extra clokcs
    clock2.run();
    clock3.run();
    clock4.run();
};

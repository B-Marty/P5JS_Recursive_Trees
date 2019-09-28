var canvas_width;
var canvas_height;
var i = 0;
var j = 0;

function setup() {
    canvas_width = windowWidth - 20;
    canvas_height = windowHeight - 20;    
    createCanvas(canvas_width, canvas_height);
}

function draw() {
    background(128,128,128);
    
    branche(width / 2,
            height - 1,
            200,
            0.7,
            (270 / 360) * (2 * 3.14),
            (map(mouseX,0,width,0,720) / 360) * (2 * 3.14),
            (map(mouseY,0,height,0,360) / 360) * (2 * 3.14),
            8);
            
    /*
    branche(width / 2,
            height - 1,
            200,
            0.7,
            (270 / 360) * (2 * 3.14),
            (map(i,0,width,0,720) / 360) * (2 * 3.14),
            (map(j,0,height,0,360) / 360) * (2 * 3.14),
            8);
    
    
    i += 20;
    if(i > width){
        i = 0;
        j += 20;
        if(j > height){
            j = 0;
        }
    }
    j ++;
    i = i % width;
    j = j % height;
    */
    
    //drawCircle(width/2,height/2,min(width,height));
}

function branche(x,y,l,coeff_l,angle,angle1,angle2,p){
    strokeWeight(1);
    if(p == 0){
        stroke(255,0,0);
    } else {
        stroke(255,255,255);
        //noStroke();
    }
    
    line(x,y,x + cos(angle) * l,y + sin(angle) * l);
    ellipse(x,y,4,4);

    if(p > 0){

        branche(x + cos(angle) * l,y + sin(angle) * l,l * coeff_l,coeff_l,angle + angle1 / 2 + angle2,angle1,angle2,p-1);
        branche(x + cos(angle) * l,y + sin(angle) * l,l * coeff_l,coeff_l,angle - angle1 / 2 + angle2, angle1,angle2,p-1);
    }
}


/*
void draw() {
  background(255);
  drawCircle(width/2,height/2,min(width,height));
}
*/
function drawCircle(x, y, radius) {
    stroke(0);
    noFill();
    ellipse(x, y, radius, radius);
    if(radius > 2) {
        //drawCircle() calls itself twice, creating a branching effect. For every circle, a smaller circle is drawn to the left and the right.
        drawCircle(x + radius/2, y, radius/2);
        drawCircle(x - radius/2, y, radius/2);

    }
}

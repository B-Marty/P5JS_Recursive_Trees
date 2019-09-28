
function setup() {   
    createCanvas(windowWidth - 20, windowHeight - 20);
}

function draw() {
    background(128,128,128);
    branche(width / 2,
            height - 1,
            200,
            0.7,
            (270 / 360) * (2 * 3.14),
            (map(mouseX,0,width,0,360) / 360) * (2 * 3.14),
            (map(mouseY,0,height,0,360) / 360) * (2 * 3.14),
            8);
}

function branche(x,y,l,coeff_l,angle,angle1,angle2,p){
    strokeWeight(1);
    
    stroke(map(p,0,8,255,0));
    fill(map(p,0,8,255,0));
    
    line(x,y,x + cos(angle) * l,y + sin(angle) * l);
    ellipse(x,y,4,4);
    if(p > 0){
        branche(x + cos(angle) * l,
                y + sin(angle) * l,
                l * coeff_l,
                coeff_l,
                angle + angle1 / 2 + angle2,
                angle1,
                angle2,
                p-1);
        branche(x + cos(angle) * l,
                y + sin(angle) * l,
                l * coeff_l,
                coeff_l,
                angle - angle1 / 2 + angle2,
                angle1,
                angle2,
                p-1);
    }
}

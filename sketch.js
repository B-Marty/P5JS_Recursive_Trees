/* P5JS_Binary_Tree
* author : boyer marty
*/


// ***** VARIABLES
// BRANCH PARAMETERS
var angle;
var rotation;
var length;
var coeff_length;
var depth;
var branch_number;

// TMP VARIABLES TO AVOID SOME CALCULUS
var angle_in_PI;
var rotation_in_PI;
var lengths;
var angle_in_PI_divided_by_branch_number;
var strokes;
var fills;


// UI ELEMENTS
var checkbox_tools_menu; // Checkbox - Display Tool Menu
var checkbox_values; // Checkbox - Display values of the tree
var button_reset; // Button - Reset
var slider_lenght; // Slider - Lenght of the tronk
var slider_coeff_lenght; // Slider - Reduction coefficient of the lenght
var slider_number_branch; // Slider - Number of branch for each node
var slider_depth; // Slider - Depth of the tree
var checkbox_nodes; // Checkbox - Enable / disable nodes
var checkbox_branches; // Checkbox - Enable / disable branches



function setup() {  
    createCanvas(max(windowWidth, 500), windowHeight);
    setup_DOM();
    textSize(15);
    strokeCap(PROJECT);
    // DEFAULT VALUES
    reset_values();
}

function draw() {
    background(150,150,255);

    angle = map(mouseX,0,width,0,360*branch_number);
    rotation = map(mouseY,0,height,0,360);
    length = slider_lenght.value();
    coeff_length = slider_coeff_lenght.value();
    branch_number = slider_number_branch.value();
    depth = slider_depth.value();
    
    angle_in_PI = map(angle, 0, 360, 0, TWO_PI);
    rotation_in_PI = map(rotation, 0, 360, 0, TWO_PI);
    lengths = []; 
    strokes = [];
    fills = [];
    tmp_l = length;
    for(let i=depth; i>=0; i--){
        lengths[i] = tmp_l;
        tmp_l *= coeff_length;
        strokes[i] = map(i,depth,0,0,255);
        fills[i] = strokes[i];
    }
    angle_in_PI_divided_by_branch_number = angle_in_PI / branch_number;


    translate(width/2, height);
    branch(depth);
    translate(-width/2, -height);


    // Print values of the tree
    fill(255);
    stroke(150,150,255);
    if(checkbox_values.checked()){
        text('angle (x) : ' + nf(angle,0,2).toString(), width - 150, 15);
        text('rotation (y) : ' + nf(rotation,0,2).toString(), width - 150, 35);
        text('leaves : ' + (branch_number ** depth).toString(), width - 150, 55);
        text('length : ' + length,width - 150,75);
        text('coeff length : ' + coeff_length,width - 150,95);
        text('branch number : ' + branch_number,width - 150,115);
        text('depth : ' + depth,width - 150,135);
    }

    if(checkbox_tools_menu.checked()){
        text('length : ' + length,410,70);
        text('coeff length : ' + coeff_length,410,100);
        text('branch number : ' + branch_number,410,130);
        text('depth : ' + depth,410,160);
    }

    noLoop();
}

function mouseMoved(){
    loop();
}

function branch(d){
    strokeWeight(d+1);
    stroke(strokes[d]);
    fill(fills[d]);

    if(checkbox_branches.checked()){
        line(0, 0, 0, -lengths[d]);
    }

    translate(0, -lengths[d]);

    if(checkbox_nodes.checked()){
        ellipse(0, 0,4,4);
    }
    
    rotate(-rotation_in_PI);

    if(d > 0){
        for(let i=0; i<branch_number; i++){
            branch(d-1);
            rotate(angle_in_PI_divided_by_branch_number);
        }
        rotate(-angle_in_PI);
    }
    rotate(rotation_in_PI);
    translate(0, lengths[d]);

}


function setup_DOM(){
    checkbox_tools_menu = createCheckbox('menu', true); 
    checkbox_tools_menu.position(0,0);
    checkbox_tools_menu.changed(display_menu);

    checkbox_values = createCheckbox('values', true);
    checkbox_values.position(65,0);

    button_reset = createButton('Reset');
    button_reset.position(5,30);
    button_reset.mousePressed(reset_values);

    slider_lenght = createSlider(0,height,height / 4,1);
    slider_lenght.position(5,60);
    slider_lenght.style('width','400px');

    slider_coeff_lenght = createSlider(0,1,0.7,0.001);
    slider_coeff_lenght.position(5,90);
    slider_coeff_lenght.style('width','400px');

    slider_number_branch = createSlider(1,20,2,1);
    slider_number_branch.position(5,120);
    slider_number_branch.style('width','400px');

    slider_depth = createSlider(1,20,8,1);
    slider_depth.position(5,150);
    slider_depth.style('width','400px');

    checkbox_nodes = createCheckbox('nodes', true); 
    checkbox_nodes.position(5,180);

    checkbox_branches = createCheckbox('branches', true); 
    checkbox_branches.position(5,210);
}


function display_menu(){
    if(checkbox_tools_menu.checked()){
        button_reset.show();
        slider_lenght.show();
        slider_coeff_lenght.show();
        slider_number_branch.show();
        slider_depth.show();
        checkbox_nodes.show();
        checkbox_branches.show();
    } else {
        button_reset.hide();
        slider_lenght.hide();
        slider_coeff_lenght.hide();
        slider_number_branch.hide();
        slider_depth.hide();
        checkbox_nodes.hide();
        checkbox_branches.hide();
    }

}

// SET DEFAULT SLIDERS VALUES
function reset_values(){
    length = height / 4;
    coeff_length = 0.7;
    depth = 8;
    number = 2

    slider_lenght.value(length);
    slider_coeff_lenght.value(coeff_length);
    slider_number_branch.value(number);
    slider_depth.value(depth);
    checkbox_nodes.checked(true);
}
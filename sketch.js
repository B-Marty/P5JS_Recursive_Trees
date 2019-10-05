/* P5JS_Binary_Tree
* author : boyer marty
*/


// ***** VARIABLES
// BRANCH PARAMETERS
var length;
var coeff_length;
var depth;
var nuber;

// UI ELEMENTS
var checkbox_tools_menu; // Checkbox - Display Tools Menu
var checkbox_values; // Checkbox- Display values of the trees
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
    // DEFAUL VALUES
    reset_values();
}

function draw() {
    background(150,150,255);


    if(checkbox_tools_menu.checked()){
        length = slider_lenght.value();
        coeff_length = slider_coeff_lenght.value();
        number = slider_number_branch.value();
        depth = slider_depth.value();
    }

    branch(width / 2,
           height,
           length,
           coeff_length,
           (270 / 360) * (2 * 3.14),
           (map(mouseX,0,width,0,max(360*(number-1),360)) / 360) * (2 * 3.14),
           (map(mouseY,0,height,0,360) / 360) * (2 * 3.14),
           depth,
           number);


    // Values of the tree
    textSize(15);
    fill(255);
    stroke(150,150,255);
    if(checkbox_values.checked()){
        text('angle (x) : ' + nf(map(mouseX,0,width,0,360*number),0,2).toString(), width - 130, 15);
        text('rotation (y) : ' + nf(map(mouseY,0,height,0,360),0,2).toString(), width - 130, 35);
        text('leaves : ' + (number ** depth).toString(), width - 130, 55);
        text('length : ' + length,width - 130,75);
        text('coeff length : ' + coeff_length,width - 130,95);
        text('branch number : ' + number,width - 130,115);
        text('depth : ' + depth,width - 130,135);
    }

    if(checkbox_tools_menu.checked()){
        text('length : ' + length,410,70);
        text('coeff length : ' + coeff_length,410,100);
        text('branch number : ' + number,410,130);
        text('depth : ' + depth,410,160);
    }
}


function branch(x,y,l,coeff_l,angle,ref_angle,r,d,n){
    /**
    *    x : starting point in axis x
    *    y : starting point in axis y
    *    l : length of the trunk
    *    coeff_l : coefficient of the length of the next branch : l * coeff_l
    *    angle : angle of the branch compared to the trigonometric circle (trunk 3 PI / 2)
    *    ref_angle : reference angle
    *    r : rotation of the branches relative to the node
    *    d : depth of the tree
    *    n : number of branch for each node
    **/

    strokeWeight(d + 1);

    strokeCap(PROJECT);
    stroke(map(d,0,depth,255,0));
    fill(map(d,0,depth,255,0));

    if(checkbox_branches.checked()){
        line(x,y,x + cos(angle) * l,y + sin(angle) * l);
    }

    if(checkbox_nodes.checked()){
        ellipse(x + cos(angle) * l,y + sin(angle) * l,4,4);
    }

    if(d > 0){
        for(let i = 0; i < n; i ++){
            let a;
            if(n == 1){
                a = angle - ref_angle + r
            } else {
                a = angle + map(i,0,n-1,-1,1) * ref_angle + r;
            }
            branch(x + cos(angle) * l,
                   y + sin(angle) * l,
                   l * coeff_l,
                   coeff_l,
                   a,
                   ref_angle,
                   r,
                   d-1,
                   n);
        }
    }
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
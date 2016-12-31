var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var menuHeight = 50;

var world = new box(0, 0, canvas.width, canvas.height, "darkkhaki");
var menuBar = new menu(0, canvas.height - menuHeight, canvas.width, menuHeight, "grey");

interval(draw, 34); //30FPS WOOT
interval(logic, 50);

function logic()
{
    
}

function draw()
{
    world.draw(context);
    menuBar.draw(context);
}
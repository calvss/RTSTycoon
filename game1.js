var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.onmousedown = mouseDown;

var mouse = {x:0, y:0};

var menuHeight = 100;

var world = new box(0, 0, canvas.width, canvas.height, "darkkhaki");
var menuBar = new menu(0, canvas.height - menuHeight, canvas.width, menuHeight, "grey");

var aPressed = false;
var wPressed = false;
var sPressed = false;
var dPressed = false;
var spacePressed = false;

interval(draw, 34); //30FPS WOOT
interval(logic, 5);//200 ticks per second

var button1Pointer = menuBar.pushElement(new box(15, 15, 20, 20, "green"));

function logic()
{				
}

function draw()
{
    world.draw(context);
    menuBar.draw(context);
}

function mouseDown()
{
    mouse.x = event.offsetX;
	mouse.y = event.offsetY;
}
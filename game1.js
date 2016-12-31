var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.onmousedown = mouseDown;

var mouse = {x:0, y:0};

var menuHeight = 100;

var world = new box(0, 0, canvas.width, canvas.height, "darkkhaki");
var menuBar = new menu(0, canvas.height - menuHeight, canvas.width, menuHeight, "grey");

interval(draw, 34); //30FPS WOOT
interval(logic, 50);//20 ticks per second, lol like minecraft

var button1 = menuBar.getElement(menuBar.pushElement(new box(15, 15, 50, 50, "blue")));

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
    
    if(button1.contains(mouse.x, mouse.y))
    {
        button1.color = "black";
    }
    else button1.color = "blue";
}
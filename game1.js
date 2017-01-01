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

var but2 = new box(100, 15, 25, 25, "blue");
but2.onClick = function()
{
    console.log("wew");
}

var button2Pointer = menuBar.pushElement(but2);

var bob = new circle(0, 0, 20, "grey");

function logic()
{				
}

function draw()
{
    world.draw(context);
    menuBar.draw(context);
    bob.draw(context);
}

function mouseDown()
{
    mouse.x = event.offsetX;
	mouse.y = event.offsetY;
    
    var num = menuBar.getElementCount();//check mouseclicks at menuBar
    var element = null;
    for(i = 0; i < num; i++)
    {
        element = menuBar.getElement(i)
        
        if(element.contains(mouse.x, mouse.y))
        {
            if("onClick" in element)
            {
                element.onClick();
            }
        }
    }
    
    if(bob.contains(mouse.x, mouse.y))
    {
        console.log("inside");
    }
    else console.log("outside");
}
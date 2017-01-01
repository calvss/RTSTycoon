var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.onmousedown = mouseDown;
document.onkeypress = keyDown;
document.onkeyup = keyUp;

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

var button1Addr = menuBar.pushElement(new box(15, 15, 50, 50, "blue"));
var button2Addr = menuBar.pushElement(new box(200, 15, 60, 60, "green"))

var button1 = menuBar.getElement(button1Addr);
var button2 = menuBar.getElement(button2Addr);

var roger = new mob(0, 0, 20, 100, "green", 0, 0, 1);

function logic()
{
    if(aPressed && roger.x > 0)						//move the player at the specified move speed
	{													//
		roger.x-=roger.moveSpeed;							//left if 'a' is pressed and not at the leftmost edge
        //console.log("left");
	}													//
	else if(dPressed && roger.x + roger.width < canvas.width)	//
	{													//
		roger.x+=roger.moveSpeed;							//right if 'd' is pressed and not at the rightmost edge
	}													//
	if(wPressed && roger.y > 0)
	{
		roger.y-=roger.moveSpeed;
	}
	else if(sPressed && roger.y + roger.height < canvas.height)
	{
		roger.y+=roger.moveSpeed;
	}					
}

function draw()
{
    world.draw(context);
    menuBar.draw(context);
    roger.draw(context);
}

function mouseDown()
{
    mouse.x = event.offsetX;
	mouse.y = event.offsetY;
    
    if(button1.contains(mouse.x, mouse.y))
    {
        button1.color = "black";
        
        menuBar.removeElement(button2Addr);
    }
    else button1.color = "blue";
    if(button2.contains(mouse.x, mouse.y))
    {
        button2.color = "white";
        roger = undefined;
    }
    else button2.color = "green";
}

function keyDown(event)
{
	ascii = event.keyCode;
	if(ascii == 119)
	{
		wPressed = true;
	}
	else if(ascii == 115)
	{
		sPressed = true;
	}
	else if(ascii == 97)
	{
		aPressed = true;
	}
	else if(ascii == 100)
	{
		dPressed = true;
	}
	else if(ascii == 32)
	{
		spacePressed = true;
	}
	
}
//			~~~~~~~~~~~no idea why keyDown is uppercase ASCII and keyUp is lowercase ASCII~~~~~~~~~~~~~
function keyUp(event)
{
	ascii = event.keyCode;
	if(ascii == 87)
	{
		wPressed = false;
	}
	else if(ascii == 83)
	{
		sPressed = false;
	}
	else if(ascii == 65)
	{
		aPressed = false;
	}
	else if(ascii == 68)
	{
		dPressed = false;
	}
	else if(ascii == 32)
	{
		spacePressed = false;
	}
}
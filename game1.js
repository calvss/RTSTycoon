var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.onmousedown = mouseDown;
canvas.onmousemove = onMouseMove;

var mouse = {x:0, y:0, unitSelected:-1};

var menuHeight = 100;

var world = new box(0, 0, canvas.width, canvas.height, "darkkhaki");
var menuBar = new menu(0, canvas.height - menuHeight, canvas.width, menuHeight, "grey");

interval(draw, 17); //60FPS WOOT
interval(logic, 10);//100 logic ticks per second

var button1Pointer = menuBar.pushElement(new box(15, 15, 20, 20, "green"));

var but2 = new box(100, 15, 25, 25, "blue");
but2.onClick = function()
{
    console.log("wew");
}

var button2Pointer = menuBar.pushElement(but2);

var bob = new circle(0, 0, 20, "grey");

menuBar.getElement(button2Pointer).onClick = function()
{
    if(mouse.unitSelected == -1)
    {
        mouse.unitSelected = new box(100, 100, 20, 20, "blue", true);
    }
}

function logic()
{				
}

function draw()
{
    world.draw(context);
    menuBar.draw(context);
    bob.draw(context);
    
    if(mouse.unitSelected != -1)
    {
        mouse.unitSelected.draw(context);
    }
}

function onMouseMove()
{
    mouse.x = event.offsetX;
	mouse.y = event.offsetY;
    
    if(mouse.unitSelected != -1)
    {
        if(mouse.unitSelected.followsMouse == true)
        {
            mouse.unitSelected.x = mouse.x;
            mouse.unitSelected.y = mouse.y;
        }
    }
}

function mouseDown()
{
    mouse.x = event.offsetX;
	mouse.y = event.offsetY;
    
    if(mouse.unitSelected != -1)
    {
        mouse.unitSelected.followsMouse = false;
    //    mouse.unitSelected = -1;
    }
    else
    {
        //check mouseclicks at menuBar
        var num = menuBar.getElementCount();
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
    }
    
    
    if(bob.contains(mouse.x, mouse.y))
    {
        console.log("inside");
    }
    else console.log("outside");
}
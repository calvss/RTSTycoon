var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.onmousedown = mouseDown;
canvas.onmousemove = onMouseMove;

var mouse = {x:0, y:0, unitSelected:-1};

var menuHeight = 100;

var world = new box(0, 0, canvas.width, canvas.height, "darkkhaki");
var menuBar = new menu(0, canvas.height - menuHeight, canvas.width, menuHeight, "grey");
var activeMenu = menuBar;

var units = [];
var buildings = [];

interval(draw, 17); //60FPS WOOT
interval(logic, 10);//100 logic ticks per second

var button1Pointer = menuBar.pushElement(new box(15, 15, 20, 20, "green"));

var but2 = new box(100, 15, 25, 25, "blue");
but2.onClick = function()
{
    console.log("wew");
}

var button2Pointer = menuBar.pushElement(but2);

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
    activeMenu.draw(context);
    
    if(mouse.unitSelected != -1)
    {
        mouse.unitSelected.draw(context);
    }
    
    for(i = 0; i < units.length; i++)
    {
        units[i].draw(context);
    }
    
    for(i = 0; i < buildings.length; i++)
    {
        buildings[i].draw(context);
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
        
        if(mouse.unitSelected instanceof building)
        {
            buildings.push(mouse.unitSelected);
        }
        else
        {
            units.push(mouse.unitSelected);
        }
        
        mouse.unitSelected = -1;
    }
    else
    {
        //check mouseclicks at current menu
        var num = activeMenu.getElementCount();
        var element = null;
        for(i = 0; i < num; i++)
        {
            element = activeMenu.getElement(i);
            
            if(element.contains(mouse.x, mouse.y))
            {
                if("onClick" in element)
                {
                    element.onClick();
                }
            }
        }
    }
}
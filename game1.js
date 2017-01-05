var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

canvas.onmousedown = mouseDown;
canvas.onmousemove = onMouseMove;

var mouse = {x:0, y:0, unitSelected:-1};

var menuHeight = 100;

var world = new box(0, 0, canvas.width, canvas.height, "darkkhaki");
var menuBar = new menu(0, canvas.height - menuHeight, canvas.width, menuHeight, "grey");
{
    var button1Pointer = menuBar.pushElement(new box(15, 15, 20, 20, "green"));

    var but2 = new box(100, 15, 25, 25, "blue");

    var button2Pointer = menuBar.pushElement(but2);

    menuBar.getElement(button2Pointer).onClick = function()
    {
        if(mouse.unitSelected == -1)
        {
            mouse.unitSelected = new mob(100, 100, 20, 20, "blue", true);
            
            tempButton = new box(10, 500, 30, 30, "red");
            tempButton.onClick = function()
            {
                console.log("yay");
            }
            mouse.unitSelected.menuItems.push(tempButton);
        }
    }
}
var activeMenu = clone(menuBar);

var units = [];
var buildings = [];

interval(draw, 17); //60FPS WOOT
interval(logic, 10);//100 logic ticks per second



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
    
    //console.log(menuBar);
    
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
        let clickedOnWorld = true;
        
        if(clickedOnWorld == true)
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
                        clickedOnWorld = false;
                        break;
                    }
                }
            }
        }
        
        if(clickedOnWorld == true)
        {
            //check mouseclicks at units
            var unitCount = units.length;
            for(i = 0; i < unitCount; i++)
            {
                if(units[i].contains(mouse.x, mouse.y))
                {
                    activeMenu.menuElements = units[i].menuItems;
                    //console.log(activeMenu);
                    clickedOnWorld = false;
                    break;
                }   
            }
        }
        
        if(clickedOnWorld == true)
        {
            //check mouseclicks at buildings
            var bldgCount = buildings.length;
            for(i = 0; i < bldgCount; i++)
            {
                if(buildings[i].contains(mouse.x, mouse.y))
                {
                    activeMenu.menuElements = buildings[i].menuItems;
                    clickedOnWorld = false;
                    break;
                }   
            }
        }
        
        if(clickedOnWorld == true)
        {
            if(activeMenu.contains(mouse.x, mouse.y))
            {
                clickedOnWorld = false;
            }
        }
        
        if(clickedOnWorld == true)//if nothing else was clicked
        {
            activeMenu = clone(menuBar);
            //console.log(menuBar);
        }
    }
}
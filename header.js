function interval(func, wait, times){	//a better alternative to setInterval from thecodeship.com. it waits for previous execution to finish
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};

function drawable(xPos = 0, yPos = 0, wideness = 10, highness = 10, colour = "grey", followsTheMouse = false) //superclass to everything drawable on screen
{
    this.x = xPos;
    this.y = yPos;
    this.width = wideness;
    this.height = highness;
    this.color = colour;
    this.followsMouse = followsTheMouse;
    
    this.draw = function(context)
    {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.contains = function(xCoord, yCoord)//check whether this drawable contains the specified point
    {
        if((xCoord >= this.x) && (xCoord <= (this.x + this.width)) && (yCoord >= this.y) && (yCoord <= (this.y + this.height)))
        {
            return true;
        }
        else return false;
    }
}

function box(xPos, yPos, wideness, highness, colour, followsTheMouse = false, velX = 0, velY = 0)//box subclass declaration
{
    drawable.call(this, xPos, yPos, wideness, highness, colour, followsTheMouse);//constructor
    this.vx = velX;
    this.vy = velY;
}
box.prototype = Object.create(drawable.prototype);//box inherits from drawable
box.prototype.constructor = box;

function circle(xPos, yPos, rad, colour, followsTheMouse = false, velX = 0, velY = 0)
{
    drawable.call(this, xPos, yPos, 2*rad, 2*rad, colour);
    
    this.radius = rad;
    
    this.draw = function(context)
    {
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
    
    this.contains = function(xCoord, yCoord)//check whether this drawable contains the specified point
    {
        if(Math.pow((Math.pow(xCoord - this.radius - this.x,2) + Math.pow(yCoord - this.radius - this.y,2)),0.5) <= this.radius)
        {
            return true;
        }
        else return false;
    }
}
circle.prototype = Object.create(drawable.prototype);//circle inherits from drawable
circle.prototype.constructor = circle;

function menu(xPos, yPos, wideness, highness, colour, followsTheMouse = false)//main menu subclass declaration
{    
    drawable.call(this, xPos, yPos, wideness, highness, colour, followsTheMouse);//constructor
    
    var menuElements = [];
    var elementCount = 0;
    
    this.bg = new box(this.x, this.y, this.width, this.height, this.color);//menu has member 'bg' which is a box
    
    this.pushElement = function(thingToAdd)//dynamically push elements onto the menu
    {
        var newElement = thingToAdd;
        if("draw" in newElement)//only push objects that can be drawn
        {
            newElement.x = newElement.x + this.x;//new menu elements are defined w/respect to the origin of the menu, not the screen
            newElement.y = newElement.y + this.y;
            
            menuElements.push(newElement);
            elementCount++;
            
            return (menuElements.length - 1);//return the position of the new element
        }
        else return "notDrawable";
    }
    
    this.removeElement = function(index)//remove selected element
    {
        if (index > -1)
        {
            menuElements[index] = undefined;
            menuElements.splice(index, 1);
            elementCount--;
        }
    }
    
    this.getElement = function(index)//get specific element from index
    {
        return menuElements[index];
    }
    
    this.getElementCount = function()
    {
        return elementCount;
    }
    
    this.draw = function(context)
    {
        this.bg.draw(context);
        
        for(i = 0; i < menuElements.length; i++)
        {
            menuElements[i].draw(context);
        }
    }
}
menu.prototype = Object.create(drawable.prototype);//menu inherits from drawable
menu.prototype.constructor = menu;

function mob(xPos, yPos, wideness, highness, colour, followsTheMouse = false, velX = 0, velY = 0, speed = 0)
{
    drawable.call(this, xPos, yPos, wideness, highness, colour, followsTheMouse);//constructor
    
    this.vx = velX;
    this.vy = velY;
    this.moveSpeed = speed;
}
mob.prototype = Object.create(drawable.prototype);//mob inherits from drawable
mob.prototype.constructor = mob;

function building(xPos, yPos, wideness, highness, colour, followsTheMouse = false)
{
    drawable.call(this, xPos, yPos, wideness, highness, colour, followsTheMouse);//constructor
}
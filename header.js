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

function drawable(xPos = 0, yPos = 0, wideness = 10, highness = 10, colour = "grey") //superclass to everything drawable on screen
{
    this.x = xPos;
    this.y = yPos;
    this.width = wideness;
    this.height = highness;
    this.color = colour;
    
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

function box(xPos, yPos, wideness, highness, colour, velX = 0, velY = 0)//box subclass declaration
{
    drawable.call(this, xPos, yPos, wideness, highness, colour);//constructor
    this.vx = velX;
    this.vy = velY;
}
box.prototype = Object.create(drawable.prototype);//box inherits from drawable
box.prototype.constructor = box;

function menu(xPos, yPos, wideness, highness, colour)//main menu subclass declaration
{    
    drawable.call(this, xPos, yPos, wideness, highness, colour);//constructor
    
    var menuElements = [];
    
    this.bg = new box(this.x, this.y, this.width, this.height, this.color);//menu has member 'bg' which is a box
    
    this.pushElement = function(thingToAdd)//dynamically push elements onto the menu
    {
        var newElement = thingToAdd;
        if(newElement instanceof drawable)
        {
            newElement.x = newElement.x + this.x;//new menu elements are defined w/respect to the origin of the menu, not the screen
            newElement.y = newElement.y + this.y;
            
            menuElements.push(newElement);
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
        }
    }
    
    this.getElement = function(index)//get specific element from index
    {
        return menuElements[index];
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

function mob(xPos, yPos, wideness, highness, colour, velX = 0, velY = 0, speed)
{
    drawable.call(this, xPos, yPos, wideness, highness, colour);//constructor
    
    this.vx = velX;
    this.vy = velY;
    this.moveSpeed = speed;
}
mob.prototype = Object.create(drawable.prototype);//mob inherits from drawable
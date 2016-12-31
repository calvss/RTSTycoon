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

function drawable(xPos = 0, yPos = 0, wideness = 10, highness = 10, colour = "grey")
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
}

function box(xPos, yPos, wideness, highness, colour, velX = 0, velY = 0)
{
    drawable.call(this, xPos, yPos, wideness, highness, colour);
    this.vx = velX;
    this.vy = velY;
}
box.prototype = Object.create(drawable.prototype);
box.prototype.constructor = box;

function menu(xPos, yPos, wideness, highness, colour)
{    
    drawable.call(this, xPos, yPos, wideness, highness, colour);
    
    var menuElements = [];
    
    this.bg = new box(this.x, this.y, this.width, this.height, this.color);
    
    this.pushElement = function(thingToAdd)
    {
        if(thingToAdd instanceof drawable)
        {
            menuElements.push(thingToAdd);
        }
        else throw "notDrawable";
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
menu.prototype = Object.create(drawable.prototype);
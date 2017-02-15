var canvas = document.getElementById("canvas");
var mx=0;
var my=0;
var all_locations=[];
var context = canvas.getContext("2d");
canvas.addEventListener("mousemove", mousePos);
  

function mousePos()
{
	mx = event.offsetX;
    my = event.offsetY;   //offsetX, offsetY, may not work in older browsers


	document.getElementById("coordinates").innerHTML="X:  "+ mx+", Y:  "+my;

    
}


canvas.addEventListener('click', showInfo);
function showInfo()
{
var infoArea=document.getElementById("info");
var clickBox=10;
for (var i=0; i<all_locations.length; i++)
{
if (mx > all_locations[i].x-clickBox && mx < all_locations[i].x+clickBox)
if (my > all_locations[i].y-clickBox && my < all_locations[i].y+clickBox)

{
infoArea.innerHTML=all_locations[i].name;
}
}
}

function drawCircle(x,y, radius,color)
{
context.beginPath();
context.arc(x, y,radius,0,2*Math.PI);
context.fillStyle=color;
context.fill();

	
}

var Location = function(n, x, y, color) {
  this.name = n;
this.x=x;
this.y=y;

drawCircle(this.x, this.y, 5, color);
  
  all_locations.push(this); //add newly created location object to array
  
};


var Earth = new Location("Earth",canvas.width/2, canvas.height/2, "blue");
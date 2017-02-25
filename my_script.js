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


	//document.getElementById("coordinates").innerHTML="X:  "+ mx+", Y:  "+my;

    
}


canvas.addEventListener('click', showInfo);
var Location = function(n, description, x, y, color) {
  this.name = n;
this.x=x;
this.y=y;
this.description=description;
drawCircle(this.x, this.y, 5, color);
  
  all_locations.push(this); //add newly created location object to array
  
};
var Sol = new Location("Sol System", "Human home system. Home to human-kind. Breathable atmosphere.", canvas.width/2, canvas.height/2, "blue");



function showInfo()
{
var infoArea=document.getElementById("info");
var clickBox=10;
var l=null;
for (var i=0; i<all_locations.length; i++)
{
if (mx > all_locations[i].x-clickBox && mx < all_locations[i].x+clickBox)
if (my > all_locations[i].y-clickBox && my < all_locations[i].y+clickBox)

{
l=all_locations[i];
infoArea.innerHTML=l.name+
"<br>"+
l.description;
}
}
}

var shipHealth=100;
var displayShipHealthElement = document.getElementById("displayHealth");
displayShipHealthElement.innerHTML= "Ship Health:  "+shipHealth;
var enginesSlider=document.getElementById("engines");
var weaponsSlider=document.getElementById("weapons");
var shieldsSlider=document.getElementById("shields");
var sensorsSlider=document.getElementById("sensors");
var displayEnginesValue=document.getElementById("displayEnginesValue");
var maxEnergy=1000;
var energy= maxEnergy;
document.getElementById("totalEnergy").innerHTML= "Total Energy to be consumed:  "+getTotalEnergyUse();

function showEnginesValue(newValue)
{
	document.getElementById("enginesDisplayValue").innerHTML=newValue;
	updateValues();
}


function showWeaponsValue(newValue)
{
	document.getElementById("weaponsDisplayValue").innerHTML=newValue;
	updateValues();

}

function showShieldsValue(newValue)
{
	document.getElementById("shieldsDisplayValue").innerHTML=newValue;
		updateValues();
}


function showSensorsValue(newValue)
{
	document.getElementById("sensorsDisplayValue").innerHTML=newValue;
		updateValues();
}

  var energyDisplayArea=document.getElementById("displayEnergy");

function updateValues()
{
displayShipHealth.innerHTML= "Ship Health:  "+shipHealth;

document.getElementById("totalEnergy").innerHTML= "Total Energy to be consumed:  "+getTotalEnergyUse();
energyDisplayArea.innerHTML="Available Energy: "+energy+" / "+maxEnergy;
}

function getTotalEnergyUse()
{
var total=0;
total+=parseInt(document.getElementById("enginesDisplayValue").innerHTML);
total+=parseInt(document.getElementById("weaponsDisplayValue").innerHTML);
total+=parseInt(document.getElementById("shieldsDisplayValue").innerHTML);
total+=parseInt(document.getElementById("sensorsDisplayValue").innerHTML);
return total;
}





function drawCircle(x,y, radius,color)
{
context.beginPath();
context.arc(x, y,radius,0,2*Math.PI);
context.fillStyle=color;
context.fill();

	
}

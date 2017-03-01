var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var infoArea=document.getElementById("info");

var goButton = document.getElementById("goButton");
goButton.addEventListener('click', travel);
var selectedLocation=null;
var mx=0;
var my=0;


var all_locations=[];



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
this.color=color;
drawCircle(this.x, this.y, 5, color);
  
  all_locations.push(this); //add newly created location object to array
  
};

//initialize all locations
var Sol = new Location("Sol System", "Human home system. Home to human-kind. Breathable atmosphere.", canvas.width/2, canvas.height/2, "blue");
var Alpha = new Location("Alpha Centauri", "Nearest star system to Earth. Consists of three stars, Alpha, Beta, and Proxima.", canvas.width/2+30, canvas.height/2+30, "red");

var ship = function() {
  this.name = "Ship";
this.x=Sol.x;
this.y=Sol.y;
context.font = "12px Arial";
context.fillStyle="white";
context.fillText("You are here", this.x+10, this.y);  
};
var ship = new ship();


//set initial HTML of the info area
infoArea.innerHTML=Sol.name+"<br>"+Sol.description;

function showInfo()
{
var clickBox=10;
var l=null;
	
for (var i=0; i<all_locations.length; i++)
{
	
if (mx > all_locations[i].x-clickBox && mx < all_locations[i].x+clickBox)
if (my > all_locations[i].y-clickBox && my < all_locations[i].y+clickBox)

{
l=all_locations[i];
selectedLocation=l;
infoArea.innerHTML=l.name+
"<br>"+
l.description+"<br>Distance from current position: "
+parseInt(getDistance(ship.x, ship.y, l.x, l.y))+" parsecs";


}


}
redrawCanvas();	
}

var shipHealth=100;
var enginesScore=100;
var sensorsScore=100;
var weaponsScore=100;
var shieldsScore =100;
var weaponsModifiedElement=document.getElementById("weaponsModifiedRating");
var enginesModifiedElement=document.getElementById("enginesModifiedRating");
var shieldsModifiedElement=document.getElementById("shieldsModifiedRating");
var sensorsModifiedElement=document.getElementById("sensorsModifiedRating");
var energyDisplayArea=document.getElementById("displayEnergy");

var displayShipHealthElement = document.getElementById("displayHealth");
displayShipHealthElement.innerHTML= "Ship Health:  "+shipHealth;
var displayEnginesValue=document.getElementById("displayEnginesValue");
var maxEnergy=1000;
var energy= maxEnergy;
document.getElementById("totalEnergy").innerHTML= "Total Energy to be consumed:  "+getTotalEnergyUse();
var enginesPercent = 50;
var weaponsPercent=50;
var shieldsPercent=50;
var sensorsPercent=50;

enginesModifiedElement.innerHTML=enginesScore*(enginesPercent/100);
weaponsModifiedElement.innerHTML=weaponsScore*(weaponsPercent/100);
shieldsModifiedElement.innerHTML=shieldsScore*(shieldsPercent/100);
sensorsModifiedElement.innerHTML=sensorsScore*(sensorsPercent/100);

updateValues();

function showEnginesValue(newValue)
{
	document.getElementById("enginesDisplayValue").innerHTML=newValue;
	enginesPercent=newValue;
	
	updateValues();
}


function showWeaponsValue(newValue)
{
	document.getElementById("weaponsDisplayValue").innerHTML=newValue;
	weaponsPercent=newValue;
	updateValues();

}

function showShieldsValue(newValue)
{
	document.getElementById("shieldsDisplayValue").innerHTML=newValue;
	shieldsPercent=newValue;
		updateValues();
}


function showSensorsValue(newValue)
{
	document.getElementById("sensorsDisplayValue").innerHTML=newValue;
	sensorsPercent=newValue;
		updateValues();
}

  
function updateValues()
{
displayShipHealthElement.innerHTML= "Ship Health:  "+shipHealth;

//if scores change, update their new values in the document
document.getElementById("enginesRating").innerHTML=enginesScore;
document.getElementById("weaponsRating").innerHTML=weaponsScore;
document.getElementById("shieldsRating").innerHTML=shieldsScore;
document.getElementById("sensorsRating").innerHTML=sensorsScore;

//update the modified system values
enginesModifiedElement.innerHTML=enginesScore*(enginesPercent/100);
weaponsModifiedElement.innerHTML=weaponsScore*(weaponsPercent/100);
shieldsModifiedElement.innerHTML=shieldsScore*(shieldsPercent/100);
sensorsModifiedElement.innerHTML=sensorsScore*(sensorsPercent/100);


var energyDisplayArea = document.getElementById("totalEnergy").innerHTML= "Total Energy to be consumed:  "+getTotalEnergyUse();
energyDisplayArea.innerHTML="Available Energy: "+energy+" / "+maxEnergy;
}

function getTotalEnergyUse()
{
var total=0;
total+=parseInt(enginesModifiedElement.innerHTML);
total+=parseInt(weaponsModifiedElement.innerHTML);
total+=parseInt(shieldsModifiedElement.innerHTML);
total+=parseInt(sensorsModifiedElement.innerHTML);



return total;
}





function drawCircle(x,y, radius,color)
{
context.beginPath();
context.arc(x, y,radius,0,2*Math.PI);
context.fillStyle=color;
context.fill();

	
}


function getDistance(x1,y1,x2,y2)
{
	var a = x1 - x2;
var b = y1 - y2;

var c = Math.sqrt( a*a + b*b );
c/=3
return c;
}

function travel()
{

var distance = getDistance(ship.x,ship.y,selectedLocation.x,selectedLocation.y);
var energyConsumption = Math.round(distance*1000);
	if (distance>0)
	{
		var answer=confirm("Are you sure you want to set a course for "+selectedLocation.name+"? \n This trip will take "+energyConsumption+" units of your energy reserves.");
		if (energy >= energyConsumption)
		{
			if (answer==true)
			{
				ship.x=selectedLocation.x;
				ship.y=selectedLocation.y;
	
			}
		
		}
		else {alert("You do not have enough energy to make this trip.");}
		
	}else {alert("You are already at that destination");}
	

redrawCanvas();
}



function redrawCanvas()
{
	context.clearRect(0,0, canvas.width, canvas.height);
	context.strokeStyle="yellow";
context.strokeRect(selectedLocation.x-10, selectedLocation.y-10, 20, 20);
context.font = "12px Arial";
context.fillStyle="white";
context.fillText("You are here",ship.x+10, ship.y);
var i=0;
for (i=0; i<all_locations.length; i+=1)
{
	drawCircle(all_locations[i].x, all_locations[i].y, 10, all_locations[i].color);

}

}
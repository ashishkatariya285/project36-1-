//Create variables here
var dog,happydog,database,foodS,foodStock;
var dogIMG1,dogIMG2;
var addFood,feed;
var fedTime,lastFed;
var foodObj;
function preload()
{
	//load images here
  dogIMG1=loadImage("Dog.png");
  dogIMg2=loadImage("happydog.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog=createSprite(200,300)
  dog.addImage("dog",dogIMG1);
  dog.scale=0.3
  foodStock=database.ref('food');
  foodStock.on("value",feedDog)
foodObj=new Food();
feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95)
addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87);

 

fedTime=database.ref('FedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})
fill(255,255,254)
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFed%12 + "PM",350,30);
}else  if(lastFed=0){
  text("Last Feed :12 AM",350,30)
}else {
  text("Last Feed : "+lastFed +"AM",350,30)
}
}
/*function readStock(data){
foodS=data.val()
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
database.ref('/').update({food:x})
}*/
function feedDog(){
  dog.addImage(dogIMG2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

let money = document.getElementById("money"); 
let display = document.getElementById("display");
let displayInfo = document.getElementById("displayInfo");
let balance = document.getElementById("balance");
let bills = document.querySelectorAll('[src$="rub.jpg"]'); 
let billAcc = document.getElementById("billAcc");
let changeBox = document.getElementById("changeBox");
let progressBar = document.querySelector(".progress-bar"); // 
for(let i=0; i<bills.length; i++){  
  let img = bills[i]; 
  img.onmousedown = function(event){ 
    img.ondragstart = function(){return false;}
    img.style.position = "absolute";
    img.style.transform = "rotate(90deg)";
    img.style.left = event.clientX-img.width/2+"px";
    img.style.top = event.clientY-img.height/2+"px";
    document.onmousemove = function(e){  
      img.style.left = e.clientX-img.width/2+"px";
      img.style.top = e.clientY-img.height/2+"px";
    }
    img.onmouseup = function(){ 
      document.onmousemove = function(){return false;}
      let topBillAcc = billAcc.getBoundingClientRect().top;
      let bottomBillAcc = billAcc.getBoundingClientRect().bottom;
      let leftBillAcc = billAcc.getBoundingClientRect().left;
      let rightBillAcc = billAcc.getBoundingClientRect().right;
      let topBill = img.getBoundingClientRect().top; 
      let leftBill = img.getBoundingClientRect().left;
      let rightBill = img.getBoundingClientRect().right;
      if(topBillAcc<topBill && bottomBillAcc>topBill && leftBillAcc<leftBill && rightBillAcc>rightBill){
        img.hidden = true;
        money.value = +money.value + +img.dataset.balance; 
        balance.innerText = money.value; 
      }
      
    }
  }
}
function getCoffee(coffeeName, price){
  if(money.value>=price){
    money.value = money.value - price;
    balance.innerText = money.value; 
    let n = 0;
    let timerId = setInterval(function(){
      progressBar.hidden = false; 
      progressBar.style.width = (n++)+"%";
      if(n==125){
        clearInterval(timerId); 
        n=0;
        progressBar.hidden = true;
        progressBar.style.width = "0%";
        displayInfo.innerText = "Напиток "+coffeeName+" готов";
      }
    },40); 
    
    
    
  }else{
    displayInfo.innerText = "Недостаточно денег";
  }
}

function getChange(num){ 
  let left = getRandom(0,changeBox.getBoundingClientRect().width-75);
  let top = getRandom(0, 250-75);
  let coin = 0; 
  if(num>=10) coin = 10;
  else if(num>=5) coin = 5;
  else if(num>=2) coin = 2;
  else if(num>=1) coin = 1;
  
  if(coin!=0){ 
    changeBox.innerHTML = changeBox.innerHTML + `<img onclick="this.hidden=true" style="left:${left}px; top:${top}px;" src="img/${coin}rub.png">`; 
    getChange(num-coin);
  }else{
     money.value = 0; 
        balance.innerText = money.value;
  }
}

function getRandom(min,max){
  return Math.random()*(max-min)+min;
}
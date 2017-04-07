// активируется случайная клавиша
// Если клавиша нажата верно, то количество кнопок увеличивается на 1

var ar = []; // array for the list of signals
// variable for temporary item in array
var count = 0; // number of signals
var temp = 0; // score
 //document.getElementById('blue').style.backgroundColor = 'white';
var strict= false; // boolean for strict mode
var color = ['blue','red','green','yellow'];
function randomColor(min, max) { //function to create random color
    
  var result = Math.floor(Math.random() * (max - min + 1)) + min;
  return color[result];
}


 //function to on/off the game using checkbox
document.getElementsByClassName('ssBtn')[0].style.pointerEvents = 'none';
 document.getElementsByClassName('ssBtn')[1].style.pointerEvents = 'none';
 for(var i =0;i < color.length;i++){
        document.getElementsByClassName('mainBtn')[i].style.pointerEvents = 'none';
    }
var check = document.getElementById('checkbox');
function turnOn(){
if(check){
    document.getElementById('score').innerHTML = '0';
    document.getElementsByClassName('ssBtn')[0].style.pointerEvents = 'auto';
    document.getElementsByClassName('ssBtn')[1].style.pointerEvents = 'auto';
    check=false;
}else{
    document.getElementById('score').innerHTML = '';
   document.getElementsByClassName('ssBtn')[0].style.pointerEvents = 'none';
    document.getElementsByClassName('ssBtn')[1].style.pointerEvents = 'none';
     for(let i =0;i<color.length;i++){  //disable buttons when game is off
        document.getElementsByClassName('mainBtn')[i].style.pointerEvents = 'none';
    }
    ar=[];
    temp=0;
    count=0;
    check=true;
}
}
check.addEventListener('click',turnOn,false);

function strictMode(){
    if(strict){
        strict=false;
    }else{
        strict=true;
    }
}
document.getElementsByClassName('ssBtn')[1].addEventListener('click', strictMode, false);

function play(){ //show buttons and play sound  
        if(ar.length=== 0){
            ar.push(randomColor(0,3));
        }
    var timerId = setTimeout(function init(){
    var x = document.getElementById(ar[count]);
           
        switch(ar[count]){
            case 'blue':
                x.style.backgroundColor = 'darkblue';
                 document.getElementById('sound' + ar[count]).play();
                temp++;
                
                break;
            case 'green':
                x.style.backgroundColor = 'darkgreen';
                document.getElementById('sound' + ar[count]).play();
                temp++;
                
                break;
            case 'yellow':
                x.style.backgroundColor = 'gold';
                document.getElementById('sound' + ar[count]).play();
                temp++;
                break;
            case 'red':
                x.style.backgroundColor = '#b30000';
                document.getElementById('sound' + ar[count]).play();
                temp++;
            break;
            default:
                 document.getElementById(ar[count-1]).style.backgroundColor = ar[count-1];
                
           
        }     
        if(count==ar.length){
            document.getElementById(ar[count-1]).style.backgroundColor = ar[count-1];
                              clearInterval(timerId);
            for(let i =0;i<color.length;i++){  //enable buttons when game is on
        document.getElementsByClassName('mainBtn')[i].style.pointerEvents = 'auto';
    }
                      count=0;
                   temp=0;
        }else{            
            
        document.getElementById('score').innerHTML = temp;
           count++;
         
        timerId = setTimeout(init, 500);
        }
        
          
                       
    }, 2000);
       
       };
document.getElementsByClassName('ssBtn')[0].addEventListener('click',play,false); //start


var className = document.getElementsByClassName('mainBtn');
var myFunc = function(){ //when button clicked
    
    var attr = this.getAttribute('id');
    if(attr == ar[temp]){
        
    
    switch (attr){
                case 'blue':
                this.style.backgroundColor = 'darkblue';
                 document.getElementById('sound' + attr).play();
                break;
            case 'green':
                this.style.backgroundColor = 'darkgreen';
                document.getElementById('sound' + attr).play();
                break;
            case 'yellow':
                this.style.backgroundColor = 'gold';
                document.getElementById('sound' + attr).play();
                break;
            case 'red':
                this.style.backgroundColor = '#b30000';
               document.getElementById('sound' + attr).play();
            break;
                }
       
    
  }else{
        console.log('mistake');
      if(strict){
          ar=[];
      }
        document.getElementById('wrong').play();
        temp=0;
        for(let i =0;i<color.length;i++){  //disable buttons 
        document.getElementsByClassName('mainBtn')[i].style.pointerEvents = 'none';
    }
        play();
        }
    
}



function myFuncOff(){ // when button released
    var attr = this.getAttribute('id');
    this.style.backgroundColor = attr;
     temp+=2;
          if(temp -1 == ar.length){
              if(ar.length>40){
                  alert('victory');
                  ar=[];
                  temp=0;
                  count=0;
              }else{
        ar.push(1); // add space for a pause
        ar.push(randomColor(0,3));//add random color
        temp=0;
        count=0;
        for(let i =0;i<color.length;i++){  //disable buttons 
        document.getElementsByClassName('mainBtn')[i].style.pointerEvents = 'none';
    }      
               document.getElementsByClassName('ssBtn')[0].style.pointerEvents = 'none';
    document.getElementsByClassName('ssBtn')[1].style.pointerEvents = 'none';
        play(); 
        
    }
    
          }
} 
for (var i = 0; i< className.length; i++){
    className[i].addEventListener('mousedown', myFunc, false);
    className[i].addEventListener('mouseup', myFuncOff, false);
}
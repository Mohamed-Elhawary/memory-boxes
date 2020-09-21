/*global document, prompt*/

//splash window

document.querySelector("#controls #span").onclick = function () {
    "use strict";
	
    var playerName = prompt("what is your name?");
    
    if (playerName === '') {
        document.querySelector('#name span').innerHTML = "unknown";
    } else {
        document.querySelector('#name span').innerHTML = playerName;
    }
    document.getElementById("controls").remove();
    
    
    //set the Timer
    var	seconds = 120,
		myTimer = document.getElementById("timer"),
		countDown = setInterval(secondsInterval, 1000);

    function secondsInterval() {

        "use strict";

        var minutes = Math.floor(seconds / 60),
        remSeconds = seconds % 60;

        if (remSeconds < 10) {

            remSeconds = "0" + remSeconds;
        }
        
        if (remSeconds < 10 && minutes == 0) {
            myTimer.style.backgroundColor = "#fff";
            myTimer.style.color = "brown";
        }

        if (minutes == 1 && remSeconds == 56) {
            showBtn.style.display = "none";
        }

        myTimer.innerHTML = minutes + ":" + remSeconds;

        if (seconds > 0) {
            seconds = seconds - 1;
        } else {
            clearInterval(countDown);
            document.getElementById("timer").remove();
            document.querySelector(".winner").remove();
            document.querySelector(".run-out").classList.add("splash2");
            document.querySelector(".run-out span").classList.add("replay");
            document.querySelector(".run-out button").classList.add("replay");
            document.getElementById("lose").play();
        } 
        
        document.querySelector(".splash2 button").onclick = function () {
            
            window.location.reload();
        }

    }

};


//define your duration and Arrays and the show boxes button

var duration = 1000,
    showBtn = document.getElementById("show"),
    myContainer = document.querySelector(".container"),
    blocks   = Array.from(myContainer.children),
    randomArray = Array.from(Array(blocks.length).keys()); /*can use spread operators here >> randomArray = [....Array(blocks.length).keys()] get the same result (ES6)*/


/*call the shuffle Array here to get the random Array with its perfect shape of random. (before enter the forEach loop)*/
shuffle(randomArray);


//foreach loop 
blocks.forEach((block, index) => {
    block.style.order = randomArray[index];
    
    block.addEventListener("click", function() {
    "use strict";
    flippedBlock(block);
    }); 
    
    
    //show the boxes at first befor playing
    showBtn.onclick = function () {
        for (block of blocks) {
            block.classList.add("start-flip");
            
        }

    //rotate the boxes again to its original position after 5s
        setTimeout(() => {
            blocks.forEach((block) => {
                block.classList.remove("start-flip");
            })
    
        }, 5000);
            

    //hide the showboxes after you clicked on it one time
    this.style.display = "none";
    }
    
    
    block.onclick = function() {
        
        //hide the show boxes button if you start the game
        showBtn.style.display = "none";
        
        //the spalsh window in case of winning the game
        var x = document.querySelectorAll(".container .box.matched");
        if (x.length === 20) {
            document.getElementById("timer").remove();
            document.querySelector(".run-out").remove();
            document.querySelector(".winner").classList.add("splash1");
            document.querySelector(".winner span").classList.add("replay");
            document.querySelector(".winner button").classList.add("replay");
            document.getElementById("congratulation").play();
        }
        
        document.querySelector(".splash1 button").onclick = function() {
            
            window.location.reload();
        }
    }
         
});


//flippedBlock function
function flippedBlock(selectedBlock) {
    
    selectedBlock.classList.add("flipped");
    var allFlippedBlocks = blocks.filter(myBlock => myBlock.classList.contains("flipped"));
    
    if (allFlippedBlocks.length === 2) {
        stopClick();
        matched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    
}

//stopClick function 
function stopClick() {
    myContainer.classList.add("no-click");
    setTimeout(() => {
        myContainer.classList.remove("no-click");

    }, duration);
}


//matched function
function matched(firstBlock, secondBlock) {
        var wrongTries = document.querySelector("#tries span"),
            attr1 = firstBlock.getAttribute('data-img'),
            attr2 = secondBlock.getAttribute('data-img');
    
        if (attr1 === attr2) { 
        /* you can use the dataset as a keyword for data to get the attribute like that >> 
        if (firstBlock.dataset.img === secondBlock.dataset.img)*/
        
            firstBlock.classList.remove("flipped");
            secondBlock.classList.remove("flipped");

            firstBlock.classList.add("matched");
            secondBlock.classList.add("matched");

            document.getElementById("success").play();
        
        } else {
        
            wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;

            setTimeout (() => {
            firstBlock.classList.remove("flipped");
            secondBlock.classList.remove("flipped");  
            }, duration);
        
            document.getElementById("fail").play();
        }
}


//shuflle fuction 
function shuffle(array) {
    var current = array.length,
        temp,
        random;
    while (current > 0) {
    random = Math.floor(Math.random() * current);
    current = current - 1;
    
    temp =array[current];
    array[current] = array[random]; /* swapping between the random number and the current number*/
    array[random] = temp;

/* you can use ES6 for swapping in easy way >>[array[current], array[random]] = [array[random], array[current]]*/

/* the steps :

  [1] Save Current Element in temp
  [2] Current Element = Random Element (swapping)
  [3] Random Element = Get Element From temp
*/
        
}
    return array;
    
}

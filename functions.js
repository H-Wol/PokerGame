function shuffle(arr){
    arr.sort(function(){return 0.5-Math.random()});
    return arr;
}

function makeDeck(){
    var deck = [];
    for (let i = 1; i < 41; i++) {
      deck.push(i);
      
  }
  return deck;
}

function checkAlivePlayer(){
    var alivePlayer = [];
    var player = DATA.length;
    for (let i = 0; i < player; i++) {
        if(DATA[i]["alive"] ===1){
            alivePlayer.push(i);
        }
    }   
    return alivePlayer;
}

function cardDistribution(player,deck){
    const cardFront = "<div class=\"card\"><div class=\"front\"></div><div class=\"back ";
    const cardBack = "\"></div>";
    var code = '';
    var alivePlayer = checkAlivePlayer(player);
    var i = 0;
    function givecard(){
        if(deck[0]>26){
            code = String.fromCharCode(deck[0]+70);    
        }
        else{
            code = String.fromCharCode(deck[0]+64);
        }
        if(deck[0]%10 === 0){
            DATA[alivePlayer[i]]['deck'].push(10);
        }
        else{
            DATA[alivePlayer[i]]['deck'].push((deck[0]%10));
        }

        deck.shift();
            player[alivePlayer[i]].innerHTML += cardFront + code+ cardBack;

        i++
        if(i == alivePlayer.length){
            cardFlipper();
            clearInterval(repeat);
        }
    }
    var repeat =  setInterval(givecard, 200);
    
}

function cardFlipper(){
    let l = document.querySelector('#me').childNodes;
    l.forEach(l=>{
        l.addEventListener('click',()=>{
          l.style.transform = 'rotateY(180deg)';
      })
    })
}

function betOrDie(player){
    var randomval = Math.floor(Math.random() * 10);
    var consoleA = document.getElementById("console");

    console.log(DATA[player]['user'] + "is Thinking");
    if(randomval === 1){
        DATA[player]["alive"] = 0;
        console.log("Player "+ DATA[player]["user"] + " is dead");
        var deadInfo =document.querySelectorAll(".userInfo");
        deadInfo[player].style.backgroundImage = "url(\'image/Dead.PNG\')";
        let dead = document.querySelectorAll(".cardDeck")[player].childNodes;
        for (let i = dead.length-1; i>=0 ; i--) {
           dead[i].remove();
        }
    }
    else{
        payMoney(player,arguments[1]/2);
    }
}

function payMoney(playerNum,money){
    DATA[playerNum]["money"] -= money;
    moneyTotal += money;
}

function prepareForNextGame(decks){
    moneyTotal = 0;
    decks.forEach(deck => {
        for (var i = deck.childNodes.length -1; i >= 0 ; i--) {
            deck.childNodes[i].remove();
        }
    });
    DATA.forEach(eachPlayer=>{
        eachPlayer["deck"] = [];
        eachPlayer["cardRank"] = [];
    })
    refreshValues();
}

function btnAbled(boolean){
     var btns = document.getElementsByClassName("dis");
     Array.from(btns).forEach(btns => {
         btns.disabled =  boolean;
     });

}

function refreshValues(){ 
    const total = document.querySelector(".totalVal");
    const informations = document.querySelectorAll(".userInfo");
    var count = 0;
    informations.forEach(info => {
        info.childNodes[1].innerHTML = DATA[count]["user"];
        info.childNodes[3].innerHTML ="\\ "+ DATA[count]['money'];
        count++;
    });
    informations[0].childNodes[5].innerHTML = DATA[0]["win"];
    informations[0].childNodes[7].innerHTML = DATA[0]["lose"];
    
    total.innerHTML = "Total : \\" + moneyTotal;

}
function refreshResult(){
    const board_names = document.querySelectorAll(".name_result");
    const board_ranks = document.querySelectorAll(".card_result");

    for(let i in board_names){
        board_names[i].innerHTML = "";
        board_ranks[i].innerHTML = "";

    }
}

function displayResult(wonPlayer,startMoney){
    const board_names = document.querySelectorAll(".name_result");
    const board_ranks = document.querySelectorAll(".card_result");
    wonPlayer.forEach(player => {
        DATA[player]["money"] += moneyTotal/wonPlayer.length;
    });
    for(let i in DATA){
        var earnMoney = DATA[i]['money'] - startMoney[i];
        if(earnMoney > 0){
            earnMoney = "+"+ earnMoney;
        }
        board_names[i].innerHTML = DATA[i]['user'] + " : " + earnMoney;
        board_names[i].style.color = 'white';
        board_ranks[i].innerHTML = DATA[i]['cardRank'][1] +" , "+ cardRank[DATA[i]['cardRank'][0]];
        if(wonPlayer.includes(i)){
            board_names[i].style.color = "red";
        }
    }
    
}

function changeUserInfoBackGr(player,num){
    var info = document.querySelectorAll(".userInfo");
    if(arguments[2]&& DATA[player[player.length-1]]["alive"]==1){
        info[player[player.length-1]].style.backgroundImage = "url(\'image/nemo.PNG\')";
    }
    else if(arguments[2]){
        
    }
    else if(arguments[0] == 1){
        info[0].style.backgroundImage = "url(\'image/thinking.PNG\')";
    }
    else{
        info[player[num]].style.backgroundImage = "url(\'image/thinking.PNG\')";
        if(num>0&&DATA[player[num-1]]['alive']===1){
            info[player[num-1]].style.backgroundImage = "url(\'image/nemo.PNG\')";
        }
        else{
            info[0].style.backgroundImage = "url(\'image/nemo.PNG\')";
        }
    }
}
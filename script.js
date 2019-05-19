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

    for(let i = 0; i < alivePlayer.length; i++){
        if(deck[i]>26){
            code = String.fromCharCode(deck[i]+70);    
        }
        else{
            code = String.fromCharCode(deck[i]+64);
        }
        player[alivePlayer[i]].innerHTML += cardFront + code+ cardBack;
        if(deck[i]%10 === 0){
            DATA[alivePlayer[i]]['deck'].push(10);
        }
        else{
            DATA[alivePlayer[i]]['deck'].push((deck[i]%10));
        }
        deck.shift();
    }
    
    cardFlipper();
}

function cardFlipper(){
    let l = document.querySelector('#me').childNodes;
    l.forEach(l=>{
        l.addEventListener('click',()=>{
          l.style.transform = 'rotateY(180deg)';
      })
    })
}
function test(){
    var a = document.querySelector('#bet');
    var b = document.querySelector("#die");
    bettabble = 0;
    a.addEventListener("click",()=>{
        console.log('a');
        a.disabled = true;

    })
    b.addEventListener("click",()=>{
        console.log('b');
    })
}

function betOrDie(player){
    var randomval = Math.floor(Math.random() * 10);
    
    if(randomval === 1){
        DATA[player]["alive"] = 0;
        document.querySelectorAll(".cardDeck")[player].style.background = 'black';
        alert("Player "+ DATA[player]["user"] + " is dead");
    }
    else{
        payMoney(player,moneyTotal/2);
    }
}

function payMoney(playerNum,money){
    DATA[playerNum]["money"] -= money;
    moneyTotal += money;
}
function prepareForNextGame(decks){
    moneyTotal = 0;
    refresValues();
    decks.forEach(deck => {
        for (var i = deck.childNodes.length -1; i >= 0 ; i--) {
            deck.childNodes[i].remove();
        }
    });
    DATA.forEach(eachPlayer=>{
        eachPlayer["deck"] = [];
    })
}
function btnAbled(boolean){
     var btns = document.getElementsByClassName("dis");
     Array.from(btns).forEach(btns => {
         btns.disabled =  boolean;
     });

}
function refresValues(){ 
    const total = document.querySelector(".totalVal");
    total.innerHTML = "Total : \\" + moneyTotal;

}
function checkcard(deck){
    deck.sort(function(a,b){
        return a - b;
    });
}
function game(){
    const start = document.getElementById("btn_start");
    const playerDecks = document.querySelectorAll('.cardDeck');
    var round  = 0;
    
    const deck = shuffle(makeDeck());
    start.addEventListener('click',()=>{

        round = 1;
        start.disabled = true;
        //base betting
        for(let i = 0; i < 4; i++){
            DATA[i]["alive"] = 1;
            payMoney(i,10);
        }
        //give 3 cards to each player
        for (let i = 0; i < 3; i++) {
            cardDistribution(playerDecks,deck);    
        }
        refresValues();
        btnAbled(false);
      })
    document.querySelector("#bet").addEventListener('click',()=>{
       var alivePlayer =checkAlivePlayer();
       alivePlayer.shift(); //자신제외
       round++;

       btnAbled(true);
       alivePlayer.forEach(player => {
           betOrDie(player);
       });

       cardDistribution(playerDecks,deck);    
       refresValues();
       
       btnAbled(false);
    })
    
    
    document.querySelector("#btn_reset").addEventListener('click',()=>{
        btnAbled(true);
        start.disabled = false;
        alert("game over");
        prepareForNextGame(playerDecks);
        DATA.forEach(eachPlayer=>{
            eachPlayer["money"] = 1000;
        })
        DATA[0]["win"] = DATA[0]["lose"] = 0;
    })
}

window.onload = function(){
  game();
  }


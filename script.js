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
        
        if(arguments[2] == 1){
            player[alivePlayer[i]].lastElementChild.style.transform = 'rotateY(180deg)';
        }
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
        alert("Player "+ DATA[player]["user"] + " is dead");
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
    })
    refresValues();

}

function btnAbled(boolean){
     var btns = document.getElementsByClassName("dis");
     Array.from(btns).forEach(btns => {
         btns.disabled =  boolean;
     });

}

function refresValues(){ 
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

function checkcard(deck){ //카드 패 확인 함수
    deck.sort(function(a,b){
        return a - b;
    });
}

function game(){
    const start = document.getElementById("btn_start");
    const playerDecks = document.querySelectorAll('.cardDeck');
    var round;
    var temTotalMoney = 0;
    var deck ;
    start.addEventListener('click',()=>{
        round = 0;
        prepareForNextGame(playerDecks);
        deck = shuffle(makeDeck());
        start.disabled = true;
        //base betting
        for(let i = 0; i < 4; i++){
            DATA[i]["alive"] = 1;
            payMoney(i,10);
        }
        //give 3 cards to each player
        for (let i = 0; i < 2; i++) {
            cardDistribution(playerDecks,deck);    
        }
        cardDistribution(playerDecks,deck,1);
        refresValues();
        btnAbled(false);
      })

    document.querySelector("#bet").addEventListener('click',()=>{
       var alivePlayer = checkAlivePlayer();
       temTotalMoney = moneyTotal;
       alivePlayer.shift(); //자신제외
       round++;
        
       btnAbled(true);
       payMoney(0,temTotalMoney/2); // 본인 배팅
       alivePlayer.forEach(player => {
           betOrDie(player,temTotalMoney);
       });

       cardDistribution(playerDecks,deck,1);
       refresValues();
       
       btnAbled(false);
       if(round === 2){
           btnAbled(true);
           playerDecks.forEach(eachDeck=>{ // 앞의 두 카드 오픈
               if(eachDeck.children.length !== 0){ // 플레이어가 죽지 않아 카드가 있을경우에만 실행
               eachDeck.children[0].style.transform = eachDeck.children[1].style.transform = "rotateY(180deg)"; 
               }
            })
           start.disabled = false;
       }
    })
    
    document.querySelector("#die").addEventListener('click',()=>{
        var alivePlayer = checkAlivePlayer();
        alivePlayer.shift();
        var reword = Math.floor(moneyTotal/alivePlayer.length);
        alert("you're dead!");
        alivePlayer.forEach(alivePlayer=>{
            DATA[alivePlayer]['money'] += reword;
        })
        moneyTotal = 0;
        DATA[0]["lose"] += 1;
        refresValues();
        btnAbled(true);
        start.disabled = false;
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


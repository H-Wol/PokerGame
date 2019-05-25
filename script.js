
function game(){
    const start = document.getElementById("btn_start");
    const playerDecks = document.querySelectorAll('.cardDeck');
    var round;
    var temTotalMoney = 0;
    var temUserMoney;
    var deck ;
    start.addEventListener('click',()=>{
        round = 0;
        prepareForNextGame(playerDecks);
        refreshResult();
        deck = shuffle(makeDeck());
        start.disabled = true;
        temUserMoney = [];
        
        //base betting
        for(let i = 0; i < 4; i++){
            DATA[i]["alive"] = 1;
            temUserMoney.push(DATA[i]["money"]);
            payMoney(i,10);
        }
        console.log(temUserMoney);
        refreshValues();
        //give 3 cards to each player
        cardDistribution(playerDecks,deck);
        setTimeout(() => {
            cardDistribution(playerDecks,deck);    
            
        }, 1000);
        
        setTimeout(() => {
            cardDistribution(playerDecks,deck,1);    
        }, 2000);
        setTimeout(() => {
            playerDecks.forEach(playerDecks=>{
                playerDecks.lastElementChild.style.transform = 'rotateY(180deg)';
            })
            btnAbled(false);
        }, 3000);
      })

    document.querySelector("#bet").addEventListener('click',()=>{
       var alivePlayer = checkAlivePlayer();
       var consoleA = document.getElementById("console");

       var time  = (alivePlayer.length)*900;
       var timePlus = 900;
       temTotalMoney = moneyTotal;
       alivePlayer.shift(); //자신제외
       round++;
       btnAbled(true);
       payMoney(0,temTotalMoney/2); // 본인 배팅
       consoleA.innerHTML = DATA[alivePlayer[0]]["user"] + " is Thinking";

       for(let i = 0; i< alivePlayer.length; i++){
        setTimeout(() => {
            betOrDie(alivePlayer[i],temTotalMoney);
            refreshValues();
            if(i < alivePlayer.length-1){
            consoleA.innerHTML = DATA[alivePlayer[i]+1]["user"] + " is Thinking";
            }
        }, (i+1)*timePlus);
       }
       setTimeout(() => {
        consoleA.innerHTML = "";
        cardDistribution(playerDecks,deck,1);
       },time+900);
       setTimeout(() => {
            playerDecks.forEach(playerDecks=>{
                if(playerDecks.lastElementChild)
                {playerDecks.lastElementChild.style.transform = 'rotateY(180deg)';
            }})
            btnAbled(false);
       }, time+timePlus*3);
       if(round === 2){
           setTimeout(() => {
            btnAbled(true);
            start.disabled = false;
            playerDecks.forEach(eachDeck=>{ // 앞의 두 카드 오픈
               if(eachDeck.children.length !== 0){ // 플레이어가 죽지 않아 카드가 있을경우에만 실행
               eachDeck.children[0].style.transform = eachDeck.children[1].style.transform = "rotateY(180deg)"; 
               }
            })
            var wonPlayer = checkCardRank();
            displayResult(wonPlayer,temUserMoney);
            refreshValues();
           }, time+timePlus*3+100);
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
        refreshValues();
        btnAbled(true);
        start.disabled = false;
    })

    document.querySelector("#btn_reset").addEventListener('click',()=>{
        btnAbled(true);
        refreshResult();
        start.disabled = false;
        alert("game over");
        DATA.forEach(eachPlayer=>{
            eachPlayer["money"] = 1000;
        })
        DATA[0]["win"] = DATA[0]["lose"] = 0;
        prepareForNextGame(playerDecks); 
    })

    document.querySelector("#logout").addEventListener('click',()=>{
        alert("logout");
        setTimeout(() => {
            location.replace("Login.html");
        }, 500);
    })
}

window.onload = function(){
    var name = location.href.split("?");
    DATA[0]['user'] = name[1];
    refreshValues();
    game();
  }


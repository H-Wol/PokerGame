
function game(){
    const start = document.getElementById("btn_start");
    const playerDecks = document.querySelectorAll('.cardDeck');
    var info = document.querySelectorAll(".userInfo");
    var round;
    var temTotalMoney = 0;
    var temUserMoney;
    var deck;
    start.addEventListener('click',()=>{
        round = 0;
        prepareForNextGame(playerDecks);
        refreshResult();
        deck = shuffle(makeDeck());
        start.disabled = true;
        temUserMoney = [];
        refreshMoneyTable();
        //base betting
        for(let i = 0; i < 4; i++){
            DATA[i]["alive"] = 1;
            temUserMoney.push(DATA[i]["money"]);
            payMoney(i,10);
            refreshMoneyTable();
            document.querySelectorAll(".userInfo")[i].style.backgroundImage = "url(\'image/nemo.PNG\')";
        }
        refreshValues();
        refreshMoneyTable();
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
            changeUserInfoBackGr(1); //본인의 턴임을 알리는 배경 변경
        }, 3000);
      })

    document.querySelector("#bet").addEventListener('click',()=>{
       var alivePlayer = checkAlivePlayer();
       var time  = (alivePlayer.length)*600;
       var timePlus = 800;
       temTotalMoney = moneyTotal;
       alivePlayer.shift(); //자신제외
       round++;
       btnAbled(true);
       
       payMoney(0,temTotalMoney/2); // 본인 배팅
       refreshMoneyTable();
       changeUserInfoBackGr(alivePlayer,0); // 나의 다음 순서자의 배경 변경 및 본인 배경색 변경
       refreshValues();
       refreshMoneyTable();

       for(let i = 0; i< alivePlayer.length; i++){
        setTimeout(() => {
            betOrDie(alivePlayer[i],temTotalMoney);
            refreshValues();
            refreshMoneyTable();
            if(i < alivePlayer.length-1){
                changeUserInfoBackGr(alivePlayer,i+1); // 다음 순서자 배경 번경 및 이전 순서자 변경
            }
        }, (i+1)*timePlus);
       }
       setTimeout(() => {
        if(checkAlivePlayer().length===1){
            setTimeout(() => {
            btnAbled(true);
            alert("No one servive without you!");
            DATA[0].money += moneyTotal;
            moneyTotal = 0;
            start.disabled = false;
            DATA[0].win += 1;
            refreshValues();
            refreshMoneyTable();
            },time-2000);
           }
           else{
            setTimeout(() => {
                changeUserInfoBackGr(alivePlayer,1,1); // 마지막 순서의 배경 변경
                if(round!==3){ 
                cardDistribution(playerDecks,deck,1);}
            },time-2000);
    
            setTimeout(() => {
                    playerDecks.forEach(playerDecks=>{
                        if(playerDecks.lastElementChild&& round !==2)
                        {playerDecks.lastElementChild.style.transform = 'rotateY(180deg)';
                    }})
                    btnAbled(false);
                    if(round !==3){
                        changeUserInfoBackGr(1);
                    }
            }, time+timePlus*2-2000);
    
            if(round === 3){
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
                    refreshMoneyTable();
                }, time+timePlus*3-2500);
                }
            }   
       }, time );
       
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
        refreshMoneyTable();
        btnAbled(true);
        start.disabled = false;
    })

    document.querySelector("#btn_reset").addEventListener('click',()=>{
        btnAbled(true);
        refreshResult();
        refreshMoneyTable();
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
    refreshMoneyTable();
    game();
  }


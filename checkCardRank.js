function getPair(deck){
    var result = {};
    var secResult = {};
    var longest = 0;
    var position;
    var paircount = 0;
    var returnType = [];
    for(var i in deck){
        if(!(deck[i] in result))
        {result[deck[i]] = [];}
        result[deck[i]].push(deck[i]);
     }
     
     for(var i in result){
        if(result[i].length > longest){
            longest = result[i].length;
            position = i;
        }
        else if(result[i].length == longest){
            if(result[i][0] > result[position][0]){
                position = i;
            }
        }
        if(result[i].length ===2){
            paircount++;
        }
     }
     if(longest >= 3){
             returnType= [6];
             if(longest == 4){
                returnType= [8];
             }
         }
    else if(longest ===2){
        if(paircount == 1){
        returnType = [2];
        }
        else{
            returnType = [4]
        }   
    }
    else{
        returnType = [1];
    }
    returnType.push(result[position][0]);
    return returnType;
}
function getStraight(deck){
    var result = [];
    var returnType = [];
    var returnTypeFir = 0;
    var diff = [];
    var count = 0;
    var position = 0;
    var maxlen = 0;

    var arr = deck.filter(function(value, index, self) { 
        return self.indexOf(value) === index;
    });
    for (let i = 0; i < arr.length-1; i++) {
        diff.push(arr[i+1] - arr[i]);
    }
    for(let i =0; i < diff.length; i++){
        if(diff[i]== 1){
            count++;
        }
        else{
            count = 0;
            position = i+1;
        }
        if(count >= 2 && count >= maxlen){
            maxlen = count;
            result = [];
            for (let j = position; j <count+position+1; j++) {
                result.push(arr[j]);
            }
        }
    }
    switch (maxlen) {
        case 0:
            returnTypeFir = 1;
            break;
        case 2:
            returnTypeFir = 3;
            break;
        case 3:
            returnTypeFir = 5;
            break;
        case 4:
            returnTypeFir = 7;
            break;
        default:
            returnTypeFir = 7;
        break;

    }
    if(result.length == 0){
        result[maxlen] = arr[arr.length-1];
    }
    returnType = [returnTypeFir,result[maxlen]];
    return returnType;
}

function checkCardRank(){
    var aliveplayer = checkAlivePlayer();
    var hightest = 0;
    var wonPlayerNum = 0;
    for(let i = 0; i < DATA.length; i++){
        if(aliveplayer.includes(i)){
            DATA[i]["deck"].sort(function(a,b){
                return a - b;
            });
            var pair = getPair(DATA[i]['deck']);
            var straight = getStraight(DATA[i]['deck']);
            if(pair[0]> straight[0]){
                DATA[i]['cardRank'] = pair;
            }
            else{
                DATA[i]['cardRank'] = straight;
            }

        }
        else{
            DATA[i]['cardRank'] = [0,'dead'];
        }
    }
    for(let i in DATA){
        if(hightest < DATA[i]['cardRank'][0]){
            hightest = DATA[i]['cardRank'][0];
            wonPlayerNum = [i];
        }
        else if(hightest == DATA[i]['cardRank'][0]){
            if(DATA[wonPlayerNum[0]]['cardRank'][1] < DATA[i]['cardRank'][1]){
                wonPlayerNum = [i];
            }
            else if(DATA[wonPlayerNum[0]]['cardRank'][1] == DATA[i]['cardRank'][1]){
                wonPlayerNum.push(i);
            }
        }
    }
    if(wonPlayerNum .includes("0")){
        DATA[0]['win'] ++;
    }
    else{
        DATA[0]['lose']++;
    }
    console.log(wonPlayerNum);  
    return wonPlayerNum;

}
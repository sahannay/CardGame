/**
 * Created by scott on 4/10/16.
 */

///<reference path="utilities.ts" />
///<reference path="card.ts" />
///<reference path="deck.ts" />
///<reference path="player.ts" />


  //  console.log("message - "+msg);




var cardDeck = new Deck.Deck(1);
var downPile = new Deck.cardPile(0);
var turn:number = 0;
var gameDone:boolean = false;

var player1 = new Player.Player("Scott");
var player2 = new Player.Player("Sue");
var player1Card = null;
var player2Card = null;


for( var i = 1; i <=26; i++) {
    player1.collectCard(cardDeck.deal());
    player2.collectCard(cardDeck.deal());
}

player1.useWonPile();
player2.useWonPile();



while( (turn <=1000 ) && enoughCards(1) && !gameDone) {

    turn++;

    player1Card = player1.playCard();
    player2Card = player2.playCard();

    console.log("Turn "+turn.toString());
    console.log(player1.getName()+" - "+player1Card);
    console.log(player2.getName()+" - "+player2Card);


    if (player1Card.getRank() > player2Card.getRank()) {
        console.log(player1.getName()+" Won this hand");
        player1.collectCard(player1Card);
        player1.collectCard(player2Card);
    } else if (player1Card.getRank() < player2Card.getRank()){
        console.log(player2.getName()+" Won this hand");
        player2.collectCard(player1Card);
        player2.collectCard(player2Card);
    } else {
        gameDone = War();
    }

    console.log("-------------------------------------------");
}

if (player1.getNumCards() > player2.getNumCards()) {
    console.log(player1.getName()+" won!");
} else {
    console.log(player2.getName()+" won!");
}


console.log("------------------  DONE  ------------------------");


function War(){

    var continueWar:boolean = false;
    var warCount:number = 0;

    do {
        warCount++;
        continueWar = false;

        var numOfCards:number = player1Card.getRank();  // does not matter which player card we use since they are equal

        if (numOfCards === 14) numOfCards = 1; // draw one card if it is an Ace

        if (!enoughCards(numOfCards)) return true;

        downPile.addCard(player1Card);
        downPile.addCard(player2Card);

        console.log("WAR!!!!!!!!!!!");
        console.log("players put down " + numOfCards + " cards!");

        for( var i:number = 1; i <= numOfCards-1; i++) {
            downPile.addCard(player1.playCard());
            downPile.addCard(player2.playCard());
        }
        player1Card = player1.playCard();
        player2Card = player2.playCard();
        downPile.addCard(player1Card);
        downPile.addCard(player2Card);

        console.log("War turn "+warCount.toString());
        console.log(player1.getName()+" - "+player1Card);
        console.log(player2.getName()+" - "+player2Card);

        if (player1Card.getRank() > player2Card.getRank()) {
            console.log(player1.getName()+" Won this War");
            player1.collectCards(downPile);
        } else if (player1Card.getRank() < player2Card.getRank()) {
            console.log(player2.getName() + " Won this War");
            player2.collectCards(downPile)
        } else {
            continueWar = true;
        }
    }
    while (continueWar);

    return false;
}

function enoughCards(n:number){
    return ((player1.getNumCards() >= n) && (player2.getNumCards() >= n))
}
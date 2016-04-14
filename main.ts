/**
 * Created by scott on 4/10/16.
 */

///<reference path="utilities.ts" />
///<reference path="card.ts" />
///<reference path="deck.ts" />
///<reference path="player.ts" />

var cardDeck = new Deck.Deck(1);
var downPile = new Deck.cardPile(0);
var turn:number = 0;
var gameDone:boolean = false;

var player1 = new Player.Player("Scott");
var player2 = new Player.Player("Sue");

for( var i = 1; i <=26; i++) {  // deal 13 cards to each player
    player1.collectCard(cardDeck.deal());
    player2.collectCard(cardDeck.deal());
}

while( (turn <=3000 ) && enoughCards(1) && !gameDone) {  // it checks for turn <= 3000 to avoid endless looping,
        // also checks to make sure each player has at least one card and game is not done
    turn++;

    var player1Card = player1.playCard();  // get next card from player 1
    var player2Card = player2.playCard();  // get next card from player 2

    console.log("Turn "+turn.toString());
    console.log(player1.getName()+" - "+player1Card);
    console.log(player2.getName()+" - "+player2Card);


    if (player1Card.getRank() > player2Card.getRank()) { // does player 1 have the higher card?
        console.log(player1.getName()+" Won this hand");
        player1.collectCard(player1Card);
        player1.collectCard(player2Card);
    } else if (player1Card.getRank() < player2Card.getRank()){  // does player 2 have the higher card?
        console.log(player2.getName()+" Won this hand");
        player2.collectCard(player1Card);
        player2.collectCard(player2Card);
    } else {  // its a tie....War!
        gameDone = War();  // handle all the war code separate
    }

    console.log("-------------------------------------------");
}  // end of the game loop. If it gets past here, the game is over

if (player1.getNumCards() > player2.getNumCards()) {  // see which player has the most cards and declare the winner
    console.log(player1.getName()+" won!");
} else {
    console.log(player2.getName()+" won!");
}
console.log("------------------  DONE  ------------------------");


function War(){

    var continueWar:boolean = false;  // if the players encounter another war situation in this function, set to true
    var warCount:number = 0;  // track number of war situations happen back to back

    do {
        warCount++;
        continueWar = false;

        var numOfCards:number = player1Card.getRank();  // does not matter which player card we use since they are equal

        if (numOfCards === 14) numOfCards = 1; // draw one card if it is an Ace

        if (!enoughCards(numOfCards)) return true;  // leave and return true (done) if either player does not have enough cards

        downPile.addCard(player1Card); // add the player 1 card to the down pile
        downPile.addCard(player2Card); // add the player 2 card to the down pile

        console.log("WAR!!!!!!!!!!!");
        console.log("players put down " + numOfCards + " cards!");

        for( var i:number = 1; i <= numOfCards - 1; i++) {  // take numofcards - 1 from each player and add to the down pile
            downPile.addCard(player1.playCard());
            downPile.addCard(player2.playCard());
        }
        player1Card = player1.playCard();  // player 1 next card to compare
        player2Card = player2.playCard();  // player 2 next card to compare
        downPile.addCard(player1Card);  // add the player 1 card to the down pile
        downPile.addCard(player2Card);  // add the player 1 card to the down pile

        console.log("War turn "+warCount.toString());
        console.log(player1.getName()+" - "+player1Card);
        console.log(player2.getName()+" - "+player2Card);

        if (player1Card.getRank() > player2Card.getRank()) {  // if player 1 wins, collect the down pile
            console.log(player1.getName()+" Won this War");
            player1.collectCards(downPile);
        } else if (player1Card.getRank() < player2Card.getRank()) { // if player 2 wins, collect the down pile
            console.log(player2.getName() + " Won this War");
            player2.collectCards(downPile)
        } else {  // tie, yet another war situation so loop through again
            continueWar = true;
        }
    }
    while (continueWar);

    return false; // return false (not done)
}

function enoughCards(n:number){  // return false if either player is short the needed number of cards
    return ((player1.getNumCards() >= n) && (player2.getNumCards() >= n))
}
/**
 * Created by scott on 4/10/16.
 */

/**
 * Created by scott on 4/10/16.
 */

///<reference path="card.ts" />
///<reference path="utilities.ts" />


    // The original documentation broke deck and pile into two classes. I decided to extend pile from
    // deck since they both had mostly the same functions. I just visualized a deck as a special pile
    // of cards. It would probably make more sense to change the class names


module Deck {
    export class Deck {

        public _deck = [];

        constructor(deckSize:number) {  // create a standard deck of 52 cards if the number 52 is passed, pass 0 for no cards
            if(deckSize === 1) {
                for (var i = 1; i <= 13; i++) {
                    for (var j = 1; j <= 4; j++) {
                        this._deck.push(new Card.Card(i, j));
                    }
                }
                this.shuffle();
            }
        }

        public shuffle() {  // start from the first card and randomly swap it with any other card in the deck, including possibly itself
            for( var i = 0; i < this._deck.length; i++) {
                var myRandom:number = Utilities.randomIntFromInterval(0,this._deck.length-1);
                var temp = this._deck[i];
                this._deck[i] = this._deck[myRandom];
                this._deck[myRandom] = temp;
            }
        }

        public deal() {  // chop the top card off the deck and return it
            if (this._deck.length === 0) {
                return null;
            }
            return this._deck.splice(this._deck.length-1,1)[0];
        }

        public Size() {  // return the number of cards in the deck
            return this._deck.length;
        }


    }

    // extends deck and adds ability to add cards
    // I may just combine both classes into one and call it cardpile with a deck being a special case

    export class cardPile extends Deck {

        public addCard(newCard) { // take a card and push it into the pile
            this._deck.push(newCard);
        }

        public addCards(newCards) {  // loop through an array of cards pushing each one into the pile
            var arrayLength = newCards.Size();

            for( var i = 0; i < arrayLength; i++) {
                this.addCard(newCards.deal())
            }
        }
    }

}



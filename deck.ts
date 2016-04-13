/**
 * Created by scott on 4/10/16.
 */

/**
 * Created by scott on 4/10/16.
 */

///<reference path="card.ts" />
///<reference path="utilities.ts" />

module Deck {
    export class Deck {

        public _deck = [];

        constructor(deckSize:number) {
            if(deckSize === 1) {
                for (var i = 1; i <= 13; i++) {
                    for (var j = 1; j <= 4; j++) {
                        this._deck.push(new Card.Card(i, j));
                    }
                }
                this.shuffle();
            }

        }

        public shuffle() {
            for( var i = 0; i < this._deck.length; i++) {
                var myRandom:number = Utilities.randomIntFromInterval(0,this._deck.length-1);
                var temp = this._deck[i];
                this._deck[i] = this._deck[myRandom];
                this._deck[myRandom] = temp;
            }
        }

        public deal() {
            if (this._deck.length === 0) {
                return null;
            }
            return this._deck.splice(this._deck.length-1,1)[0];
        }

        public toString() {
            var rnumber:number = Utilities.randomIntFromInterval(0,51);
            return this._deck[rnumber]+" -- "+rnumber.toString();
        }

        public Size() {
            return this._deck.length;
        }


    }

    export class cardPile extends Deck {


        public addCard(newCard) {
            this._deck.push(newCard);
        }

        public addCards(newCards) {
            var arrayLength = newCards.Size();

            for( var i = 0; i < arrayLength; i++) {
                this.addCard(newCards.deal())
            }
        }
    }

}



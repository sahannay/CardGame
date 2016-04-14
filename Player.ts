/**
 * Created by scott on 4/11/16.
 */

///<reference path="deck.ts" />

module Player {
    export class Player {

        private _name:string;  // name of the player
        private _playPile = null;  // pile of cards the player deals from
        private _wonPile = null;  // pile of cards the player has won so far


        constructor(n:string) {
            this._name = n;
            this._playPile = new Deck.cardPile(0);
            this._wonPile = new Deck.cardPile(0);
        }

        public playCard() {
            if(this._playPile.Size() === 0){ // if player runs out of cards, move the cards from the won pile over
                this._playPile.addCards(this._wonPile);
            }
            if(this._playPile.Size()> 0){  // play from the play pile
                return this._playPile.deal();
            }
            return null;
          }

        public getName() {
            return this._name; // obvious
        }

        public getNumCards() { // return the total number of cards the player has by adding the play and won piles together
            return this._playPile.Size()+this._wonPile.Size();
        }

        public collectCard(theDeck) {  // a played collects cards into the won pile
            this._wonPile.addCard(theDeck)
        }

        public collectCards(thePile) { // a played collects cards into the won pile
            this._wonPile.addCards(thePile)
        }
    }
}

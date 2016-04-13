/**
 * Created by scott on 4/11/16.
 */

///<reference path="deck.ts" />

module Player {
    export class Player {

        private _name:string;
        private _playPile = null;
        private _wonPile = null;


        constructor(n:string) {
            this._name = n;
            this._playPile = new Deck.cardPile(0);
            this._wonPile = new Deck.cardPile(0);
        }

        public playCard() {
            if(this._playPile.Size() === 0){
                this.useWonPile()
            }
            if(this._playPile.Size()> 0){
                return this._playPile.deal();
            }
            return null;
          }

        public getName() {
            return this._name;
        }

        public getNumCards() {
            return this._playPile.Size()+this._wonPile.Size();
        }

        public useWonPile() {
            this._playPile.addCards(this._wonPile);

        }

        public collectCard(theDeck) {
            this._wonPile.addCard(theDeck)
        }

        public collectCards(thePile) {
            this._wonPile.addCards(thePile)
        }
    }


}

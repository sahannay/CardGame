/**
 * Created by scott on 4/10/16.
 */

///<reference path="utilities.ts" />

/**
 * Created by scott on 4/10/16.
 */

module Card {
    export class Card {

        private _rank:number;
        private _suit:number;

        constructor(r:number, s:number ) {
            if (r<0 || r>13){  // rank must be between 1 (ace) and 13 (king)
                r=0;
            }
            if (s<0 || s>4){  // suit must be between 1 and 4 ( 1 = clubs, 2 = diamonds, 3 = hearts, 4 = spades)
                s=0;          // The order of suit is not necessary for War but may matter in other card games
            }
            this._rank = r;
            this._suit = s;
        }

        public getRank():number { // return the ranking of the card from Ace to King (1 - 13)
            if (this._rank === 1) return 14; // in War the Ace is this highest ranking card so we return 14
            return this._rank;
        }


        public toString() {  // display the card in readable text format

            var rankText:string;
            var suits = ["Invalid Suit","Clubs","Diamonds","Hearts","Spades"];

            switch(this._rank){
                case 0:
                    rankText = "Invalid Rank";
                    break;
                case 1:
                    rankText = "Ace";
                    break;
                case 11:
                    rankText = "Jack";
                    break;
                case 12:
                    rankText = "Queen";
                    break;
                case 13:
                    rankText = "King";
                    break;
                default:
                    rankText = this._rank.toString()
            }

            return rankText+" of "+suits[this._suit]+"("+this._rank.toString()+","+this._suit.toString()+")";
        }

    }

}

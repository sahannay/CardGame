/**
 * Created by scott on 4/11/16.
 */

   // I don't really need a Utility file for this project since it is so small but just wanted to do it
   // this way to prepare for larger projects...

namespace Utilities {

   export function randomIntFromInterval(min,max) {return Math.floor(Math.random()*(max-min+1)+min);}

}

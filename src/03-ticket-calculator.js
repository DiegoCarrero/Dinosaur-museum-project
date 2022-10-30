/*
  Do not change the line below. If you'd like to run code from this file, you may use the 
  `exampleTicketData` variable below to gain access to tickets data. This data is pulled from 
  the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains 
  the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all 
  tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The 
 * `ticketInfo` will be in the following shape. See below for more details on each key.
 * 
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, 
 * or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message 
 * should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. 
 * See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string 
 * except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change 
 * depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a 
 * different "extra" that can be added to the ticket. All strings should be keys under the 
 * `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  let costInCents = 0;
  if (ticketInfo.ticketType != 'general' && ticketInfo.ticketType != 'membership') {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  for (let a = 0; a < ticketInfo.extras.length; a++) {
    if (ticketInfo.extras[a] != 'movie' && ticketInfo.extras[a] != 'education' && ticketInfo.extras[a] != 'terrace') {
      return "Extra type 'incorrect-extra' cannot be found.";
    }
  }
  if (ticketInfo.entrantType != 'child' && ticketInfo.entrantType != 'adult' && ticketInfo.entrantType != 'senior') {
    return "Entrant type 'incorrect-entrant' cannot be found.";
  }
  if (ticketInfo.entrantType == 'child') {
    if (ticketInfo.ticketType == 'general') {
      costInCents += 2000;
    } else {
      costInCents += 1500;
    }
    if (ticketInfo.extras.includes('movie')) {
      costInCents += 1000;
    }
    if (ticketInfo.extras.includes('education')) {
      costInCents += 1000;
    }
    if (ticketInfo.extras.includes('terrace')) {
      costInCents += 500;
    }
  } else if (ticketInfo.entrantType == 'adult') {
    if (ticketInfo.ticketType == 'general') {
      costInCents += 3000;
    } else {
      costInCents += 2800;
    }
    if (ticketInfo.extras.includes('movie')) {
      costInCents += 1000;
    }
    if (ticketInfo.extras.includes('education')) {
      costInCents += 1200;
    }
    if (ticketInfo.extras.includes('terrace')) {
      costInCents += 1000;
    } 
  } else {
    if (ticketInfo.ticketType == 'general') {
      costInCents += 2500;
    } else {
      costInCents += 2300;
    }
    if (ticketInfo.extras.includes('movie')) {
      costInCents += 1000;
    }
    if (ticketInfo.extras.includes('education')) {
      costInCents += 1200;
    }
    if (ticketInfo.extras.includes('terrace')) {
      costInCents += 1000;
    }
  }
  return costInCents;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchases. Each "purchase" maintains the shape 
 * from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it 
 * is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format 
 * to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the 
 * `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value 
 * "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the 
 * entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" 
 * that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  
  let receipt = 'Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n';
  let priceTotal = 0;
  for (let a = 0; a < purchases.length; a++) {
    if (purchases[a].ticketType != 'general' && purchases[a].ticketType != 'membership') {
      return `Ticket type '${purchases[a].ticketType}' cannot be found.`;
    }
    for (let b = 0; b < purchases[a].extras.length; b++) {
      if (purchases[a].extras[b] != 'movie' && purchases[a].extras[b] != 'education' && purchases[a].extras[b] != 'terrace') {
        return "Extra type 'incorrect-extra' cannot be found.";
      }
    }
    if (purchases[a].entrantType != 'child' && purchases[a].entrantType != 'adult' && purchases[a].entrantType != 'senior') {
      return "Entrant type 'incorrect-entrant' cannot be found.";
    }

    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"
    if (purchases[a].entrantType == 'child') {
      receipt += 'Child ';
    } else if (purchases[a].entrantType == 'adult') {
      receipt += 'Adult ';      
    } else {
      receipt += 'Senior ';
    }

    if (purchases[a].ticketType == 'general') {
      receipt += 'General ';
    } else {
      receipt += 'Membership ';
    }

    let priceOfEachPurchase = calculateTicketPrice(ticketData, purchases[a]) / 100;
    priceTotal += priceOfEachPurchase;
    receipt += `Admission: $${priceOfEachPurchase.toFixed(2)}`;
    
    
    let extrasArray = [];
    if (purchases[a].extras.includes('education')) {
      extrasArray.push('Education Access');
    }
    if (purchases[a].extras.includes('movie')) {
      extrasArray.push('Movie Access');
    }
    if (purchases[a].extras.includes('terrace')) {
      extrasArray.push('Terrace Access');
    }
    if (purchases[a].extras.includes('terrace') && purchases[a].extras.includes('education') && !purchases[a].extras.includes('movie')) {
      extrasArray[0] = extrasArray.splice(1, 1, extrasArray[0]);
    }
    if (extrasArray.length != 0) {
      const extrasString = extrasArray.join(', ');
      receipt += ` (${extrasString})\n`;    
    } else {
      receipt += '\n'
    }
  }
  receipt += `-------------------------------------------\nTOTAL: $${priceTotal.toFixed(2)}`;
  return receipt;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};

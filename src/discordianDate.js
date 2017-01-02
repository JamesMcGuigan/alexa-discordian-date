/**
 * All Hail Discordia! - this script prints Discordian date using system date.
 * original author: jklu, lang: JavaScript
 * original source: https://rosettacode.org/wiki/Discordian_date#JavaScript
 *
 * Modified to return same output syntax as unix ddate - James McGuigan
 */
var seasons = [
  "Chaos", "Discord", "Confusion",
  "Bureaucracy", "The Aftermath"
];
var weekday = [
  "Sweetmorn", "Boomtime", "Pungenday",
  "Prickle-Prickle", "Setting Orange"
];

var apostle = [
  "Mungday", "Mojoday", "Syaday",
  "Zaraday", "Maladay"
];

var holiday = [
  "Chaoflux", "Discoflux", "Confuflux",
  "Bureflux", "Afflux"
];


Date.prototype.isLeapYear = function() {
  var year = this.getFullYear();
  if( (year & 3) !== 0 ) return false;
  return ((year % 100) !== 0 || (year % 400) === 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
  var dayCount  = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var mn        = this.getMonth();
  var dn        = this.getDate();
  var dayOfYear = dayCount[mn] + dn;
  if( mn > 1 && this.isLeapYear() ) dayOfYear++;
  return dayOfYear;
};

function discordianDate(date) {
  if( !date ) { date = new Date(); }

  var y                = date.getFullYear();
  var yold             = y + 1166;
  var dayOfYear        = date.getDOY();
  var celebrateHoliday = null;

  if( date.isLeapYear() ) {
    if( dayOfYear == 60 ) {
      celebrateHoliday = "St. Tib's Day";
      // return "St. Tib's Day, in the YOLD " + yold;
    }
    else if( dayOfYear > 60 ) {
      dayOfYear--;
    }
  }
  dayOfYear--;

  var divDay = Math.floor(dayOfYear / 73);

  var seasonDay = (dayOfYear % 73) + 1;
  if( seasonDay == 5 ) {
    celebrateHoliday = apostle[divDay];
    //return apostle[divDay] + ", in the YOLD " + yold;
  }
  if( seasonDay == 50 ) {
    celebrateHoliday = holiday[divDay];
    //return holiday[divDay] + ", in the YOLD " + yold;
  }

  var season    = seasons[divDay];
  var dayOfWeek = weekday[dayOfYear % 5];

  var nth = (seasonDay % 10 == 1) ? 'st'
          : (seasonDay % 10 == 2) ? 'nd'
          : (seasonDay % 10 == 3) ? 'rd'
          : 'th';


  return "Today is " + dayOfWeek + ", the " + seasonDay + nth + " day of " +
         season + " in the YOLD " + yold
         + (celebrateHoliday ? ". Celebrate " + celebrateHoliday + "!" : '')
    ;
}

function test(y, m, d, result) {
  console.assert((discordianDate(new Date(y, m, d)) == result), [y, m, d, discordianDate(new Date(y, m, d)), result]);
}

// Only run test code if node calls this file directly
if( require.main === module ) {
  console.log(discordianDate(new Date(Date.now())));
  test(2010, 6, 22, "Today is Pungenday, the 57th day of Confusion in the YOLD 3176");
  test(2012, 1, 28, "Today is Prickle-Prickle, the 59th day of Chaos in the YOLD 3178");
  test(2012, 1, 29, "Today is Setting Orange, the 60th day of Chaos in the YOLD 3178. Celebrate St. Tib's Day!");
  test(2012, 2,  1, "Today is Setting Orange, the 60th day of Chaos in the YOLD 3178");
  test(2010, 0,  5, "Today is Setting Orange, the 5th day of Chaos in the YOLD 3176. Celebrate Mungday!");
  test(2011, 4,  3, "Today is Pungenday, the 50th day of Discord in the YOLD 3177. Celebrate Discoflux!");
  test(2015, 9, 19, "Today is Boomtime, the 73rd day of Bureaucracy in the YOLD 3181");
}

module.exports = discordianDate;

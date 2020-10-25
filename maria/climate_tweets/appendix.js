// possible analyses to include:
// total opinions on q1 & q2 (which we can get from any csv);
// dem/rep opinion on q1 & q2;
// education opinion on q1 & q2;
// age & sex are meh

var q1_party_neg = [];

var total_rep = 0;
var total_dem = 0;
var total_responses = 0;

d3.csv ('pew_data/pew_csvs/q1_F_PARTYSUM_FINAL.csv', d => {
    // console.log (d);
    total_responses += +d.count;

    if (d.ENVIR8_e_W55 == 2.0) {
        q1_party_neg.push (d);
        // console.log (d);
    }
    
    if (d.F_PARTYSUM_FINAL == 1.0) {
        total_rep += +d.count;
    }

    if (d.F_PARTYSUM_FINAL == 2.0) {
        total_dem += +d.count;
        // console.log (total_dem);
    }

    // console.log (q1_party_neg, total_rep, total_dem, total_responses);
}) 

console.log (q1_party_neg, total_rep, total_dem, total_responses);

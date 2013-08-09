


function _randomData(){
	var data = {};
	data.accountData = [];

	var days = 90;
	var accounts = [{name: "401k", type: 'deposit'}, {name: "Checking", type: "deposit"}, {name: "Credit Card", type: "debt"}];
	var MAX_AMT = 10000;

	for(var obj in accounts){
		accounts[obj].balances = [];
		var now = moment();
		for(var i = 0; i < days ; i++){
			var date = now.add('d',1);
			var value = Math.floor(Math.random() * MAX_AMT);
			var change = Math.random() * 2 - 1;
			accounts[obj].balances.push({
				"date": date.toDate(),
				"value": value,
				"change": change
			});
		}

		data.accountData.push(accounts[obj]);
	}

	return data;

}


var AccountSymphony = AccountSymphony || {};

$(function(){



// var delay = 0; // play one note every quarter second
// 		var note = 50; // the MIDI note
// 		var velocity = 127; // how hard the note hits
// 		// play the note
// 		MIDI.setVolume(0, 127);
// 		MIDI.noteOn(0, note, velocity, delay);
// 		MIDI.noteOff(0, note, delay + 0.75);


AccountSymphony.init = function(){
	



};


MIDI.loadPlugin({
	soundfontUrl: "./soundfont/",
	instrument: "acoustic_grand_piano",
	callback: function(){
		MIDI.setVolume(0, 127);
		var data = _randomData();

		var balances = data.accountData[0].balances;

		var note = 50;
		var vel = 127;
		var delay = 0;
		balances.forEach(function(d,i){
			MIDI.noteOn(1, note, vel, delay);
			MIDI.noteOff(1, note, delay + 0.75);

			note += d.change > 0 ? 1 : -1;
		});
	}
});





});




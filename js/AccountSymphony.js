


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



AccountSymphony.init = function(){	
	this.tracks = [];
	this.createTrack();



};

AccountSymphony.getKey = function(note){
	return MIDI.noteToKey[note];
};

AccountSymphony.addTrack = function(data){
	var track = this.createTrack(data);
	this.tracks.push(track);
};

AccountSymphony.createTrack = function(D){

	var data = D || _randomData();
	var balances = data.accountData[0].balances;
	var START_NOTE = 50;
	var NOTE = START_NOTE;
	var _key = this.getKey;

	var NOTE_EVENTS = [];
	

	balances.forEach(function(d){
		var _note = _key(NOTE);
		console.log(_note);
		var _noteEvent = MidiEvent.createNote( _note );
		NOTE_EVENTS.push(_noteEvent[0]);
		NOTE_EVENTS.push(_noteEvent[1]);
		NOTE += d.change > 0 ? 1 : -1;
	});

	var track = new MidiTrack({events: NOTE_EVENTS});
	
	return track;

	 var song = MidiWriter({tracks: [track]});

	 
	 this.song = song;

};


MIDI.loadPlugin(function() {
	AccountSymphony.init();
	var player = MIDI.Player;

	player.loadFile("data:audio/midi;base64," + AccountSymphony.song.b64, function(){
		player.start();
	})


	//MIDI.noteOn(0, 100, 127, 0); // plays note once loaded
 	// 	var data = _randomData();

		// var balances = data.accountData[0].balances;
		// var SONG = [];
		// var START_NOTE = 100;
		// var NOTE = START_NOTE;
		// var vel = 127;
		// var delay = 0;
		// MIDI.setVolume(0, 127);
		// balances.forEach(function(d,i){
		// 	SONG.push(NOTE);
		// 	NOTE += d.change > 0 ? 1 : -1;
		// });

		// var SPEED = 250;
		// var note = 0;
		// var cursor = 0;
		// function play(){
		// 	setTimeout(function(){
		// 		MIDI.noteOn(0,SONG[note],127,0);
		// 		if(note < SONG.length){
		// 			note++;
		// 			cursor += SPEED;
		// 			play();
		// 		}
		// 	}, cursor);
		// }
		
		
		// play();





}, "soundfont/acoustic_grand_piano-ogg.js");



});




"use strict";

function init() {

	Homey.log("com.yalelock running...");

}

Homey.manager('flow').on('trigger.manual_locked', function( callback, args, state ) {
	if ( args.locktype == state.locktype ) {
		callback(null, true)
	} else {
		callback(null, false)
	}
});

Homey.manager('flow').on('trigger.tamper_alarm', function( callback, args, state ) {
	if ( args.alarmtype == state.alarmtype ) {
		callback(null, true)
	} else {
		callback(null, false)
	}
});

module.exports.init = init;

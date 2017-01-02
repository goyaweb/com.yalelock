"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

module.exports = new ZwaveDriver( path.basename(__dirname), {
	debug: false,	
	capabilities: {
		'locked': {
			'command_class'				: 'COMMAND_CLASS_DOOR_LOCK',
			'command_get'				: 'DOOR_LOCK_OPERATION_GET',
			'command_set'				: 'DOOR_LOCK_OPERATION_SET',
			'command_set_parser'		: function( value ){
				return {
					'Door Lock Mode': ( value ) ? 'Door Secured' : 'Door Unsecured'
				}
			},
			'command_report'			: 'DOOR_LOCK_OPERATION_REPORT',
			'command_report_parser'		: function( report ){
				return report['Door Lock Mode'] === 'Door Secured';

			}
		},
		'alarm_keypad_unlocked': {
			'command_class'				: 'COMMAND_CLASS_ALARM',
			//'command_get'				: 'ALARM_GET',
			'command_report'			: 'ALARM_REPORT',
			'command_report_parser': (report, node) => {
				if (report.hasOwnProperty("Alarm Type")) {
					if (report['Alarm Type'] == '19' && report.hasOwnProperty("Alarm Level")) {
						const token = {
							"userid": report['Alarm Level']
						};
						Homey.manager('flow').triggerDevice('keypad_unlocked', token, null, node.device_data);
						//console.log('alarm_keypad_unlocked, userid is ' + report['Alarm Level']);
					};
					return null;
				}
			}
		},
		'alarm_manual_unlocked': {
			'command_class'				: 'COMMAND_CLASS_ALARM',
			//'command_get'				: 'ALARM_GET',
			'command_report'			: 'ALARM_REPORT',
			'command_report_parser': (report, node) => {
				if (report.hasOwnProperty("Alarm Type")) {
					if (report['Alarm Type'] == '22') {
						Homey.manager('flow').triggerDevice('manual_unlocked', null, null, node.device_data);
						//console.log('alarm_manual_unlocked');
					};
					return null;
				}
			}
		},
		'alarm_keypad_locked': {
			'command_class'				: 'COMMAND_CLASS_ALARM',
			//'command_get'				: 'ALARM_GET',
			'command_report'			: 'ALARM_REPORT',
			'command_report_parser': (report, node) => {
				if (report.hasOwnProperty("Alarm Type")) {
					if (report['Alarm Type'] == '18' && report.hasOwnProperty("Alarm Level")) {
						const token = {
							"userid": report['Alarm Level']
						};
						Homey.manager('flow').triggerDevice('keypad_locked', token, null, node.device_data);
						//console.log('alarm_keypad_locked, userid is ' + report['Alarm Level']);
					};
					return null;
				}
			}
		},
		'alarm_manual_locked': {
			'command_class'				: 'COMMAND_CLASS_ALARM',
			//'command_get'				: 'ALARM_GET',
			'command_report'			: 'ALARM_REPORT',
			'command_report_parser': (report, node) => {
				if (report.hasOwnProperty("Alarm Type")) {
					if (report['Alarm Type'] == '21' && report.hasOwnProperty("Alarm Level")) {
						const state = {
							"locktype": report['Alarm Level']
						};
						Homey.manager('flow').triggerDevice('manual_locked', null, state, node.device_data);
						//console.log('alarm_manual_locked, locktype is ' + report['Alarm Level']);
					};
					return null;
				}
			}
		},
		'alarm_tamper': {
			'command_class'				: 'COMMAND_CLASS_ALARM',
			//'command_get'				: 'ALARM_GET',
			'command_report'			: 'ALARM_REPORT',
			'command_report_parser': (report, node) => {
				if (report.hasOwnProperty("Alarm Type")) {
					if (report['Alarm Type'] == '161' && report.hasOwnProperty("Alarm Level")) {
						const state = {
							"alarmtype": report['Alarm Level']
						};
						Homey.manager('flow').triggerDevice('tamper_alarm', null, state, node.device_data);
						//console.log('alarm_tamper, alarmtype is ' + report['Alarm Level']);
					};
					return null;
				}
			}
		}
	},
	settings: {
		'audio_mode': {
			'index': 1,
			'size': 1
		},
		'auto_relock': {
			'index': 2,
			'size': 1
		},
		'relock_time': {
			'index': 3,
			'size': 1
		},
		'max_tries': {
			'index': 4,
			'size': 1
		},
		'lockout_time': {
			'index': 7,
			'size': 1
		},
		'operating_mode': {
			'index': 8,
			'size': 1
		},
		'one_touch_locking': {
			'index': 11,
			'size': 1
		}
	}
})

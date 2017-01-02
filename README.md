# YaleLock
Driver for Yale Real Living Z-Wave push button smartlock. Supports remote lock and unlock, notification of who has entered or left (via keypad userID), notification of a manual lock or unlock, and tamper alarms. Certain lock settings can be updated via the Devices page in Homey; currently the audio mode (whether the lock beeps or not), the maximum number of tries before a user is locked out, the lockout time, and the operating mode (whether privacy mode is enabled).

## Compatibility
Currently only tested with the Yale push button deadbolt (YRD110-ZW-619) with the following Z-Wave attributes:

* manufacturerId: 297
* productTypeId: 4
* productId: 2048

It may work with other locks from the same range, but I haven't tested that. Would likely require additional productIds to be added to the app.json.

## Changelog

### v0.2.0

* Added .gitmodules reference to homey-zwavedriver (TIL about submodules in git)
* Added writeability of the following lock attributes: audio mode, maximum number of tries, wrong code lockout time, operating mode

### v0.1.1

* Updated node-homey-zwavedriver to [90655b1](https://github.com/athombv/node-homey-zwavedriver/commit/90655b16b843c91be4a6311fd3adb4bc57a0fdec)
* Added this README.md

### v0.1.0

* Initial release, forked from the Athom Danalock code. Supports remote lock and unlock, notification of who has entered or left (via keypad user ID), notification of a manual lock or unlock, and tamper alarms. No support for changing any lock configuration.


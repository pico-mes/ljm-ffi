
// Load the LJM Library.
var ljm_ffi = require('../lib/ljm-ffi');
var ljm = ljm_ffi.load();

// Load a utility function to get the connected device's info.
var utils = require('../examples/utils/utils');
var getHandleInfoSync = utils.getHandleInfoSync;

// Define a variable that will store data from LJM function calls
var data;

// Define a variable that will store the device's handle.
var handle;

// Open the first found T7.
data = ljm.LJM_OpenS('LJM_dtT7', 'LJM_ctEthernet', 'LJM_idANY', 0);

// Exit the program if a device was not found.
if(data.ljmError !== 0) {
	console.log('Failed to open a device, please connect a T7 to your computer.');
	process.exit();
} else {
	handle = data.handle;
	console.log('Connected to device:', getHandleInfoSync(handle));
}

// Initialize an array of length 128.
var aHandles = [];
for(var i = 0; i < 128; i++) { aHandles.push(0); }


function parseOpenAllData(openAllData, userStr) {
	var handleInfo = [];
	var numOpened = openAllData.NumOpened;
	var handles = [];
	for(var i = 0; i < numOpened; i++) {
		handles.push(openAllData.aHandles[i]);
		handleInfo.push(getHandleInfoSync(openAllData.aHandles[i]));
	}
	console.log(userStr);
	console.log(handleInfo);
	console.log();
}
function performListAllTCP() {
	// Perform the open-all call.
	openAllData = ljm.LJM_OpenAll(7, 2, 0, aHandles, 0,0, '');

	// console.log('openAllData', openAllData);
	parseOpenAllData(openAllData, 'Opened Devices TCP:');
}

function performListAllUDP() {
	// Perform the open-all call.
	openAllData = ljm.LJM_OpenAll(7, 5, 0, aHandles, 0,0, '');

	// console.log('openAllData', openAllData);
	parseOpenAllData(openAllData, 'Opened Devices UDP:');
}

performListAllUDP();
performListAllTCP();



// Close the device.
data = ljm.LJM_Close(handle);

// Close all devices
data = ljm.LJM_CloseAll();

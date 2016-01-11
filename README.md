# ljm-ffi
The ljm-ffi node module provides bindings to the LabJack LJM library via ffi.  This library provides three different ways to access the library and makes both synchronous and asynchronous methods available for each.

### Type 1:
The first way to interact with the LJM driver automatically handles the converting data to and from the appropriate buffer-based data types required to perform native function calls with the ffi library.  The best way to show this is through example, (Calling the LJM_NameToAddress function).  For quick details about what arguments are required by this function look at the ./lib/ljm_functions.js file.  Look at the ./test/basic_ljm_calls.js file in the "Execute LJM_NameToAddress (Sync)" and "Execute LJM_NameToAddress (Async)" tests for more details.

```javascript
// Include and load the ljm-ffi library:
var ljm_ffi = require('ljm-ffi');
var ljm = ljm_ffi.load();

// Call the LJM_NameToAddress function:
var data = ljm.LJM_NameToAddress('AIN0', 0, 0);
console.log(data);

// The resulting output will be:
// { ljmError: 0, Name: 'AIN0', Address: 0, Type: 3 }
```


### Type 2:
As of ffi version 2.0.0 there is a bug in the FFI library where functions that don't exist in the driver behave differently on windows vs mac/linux computers.  This layer makes sure that all of the defined LJM functions exist and will throw the same error across each platform.  The inputs and outputs to these functions are exactly the same as the raw FFI functions.  Look at the ./test/basic_ljm_calls.js file in the "Execute LJM_NameToAddress (Sync) - Safe" and "Execute LJM_NameToAddress (Async) - Safe" tests for more details.  Look at the ./lib/type_helpers.js file to determine how to use the ref and buffer libraries to encode and decode the variety of data types required by LJM.

### Type 3:
These are the raw ffi functions.  If the FFI library threw an error when binding to the function it will not exist.  Look at the ./test/basic_ljm_calls.js file in the "Execute LJM_NameToAddress (Sync) - Raw" and "Execute LJM_NameToAddress (Async) - Raw" tests for more details.  Look at the ./lib/type_helpers.js file to determine how to use the ref and buffer libraries to encode and decode the variety of data types required by LJM.

## Examples:
The most straight forward example that demonstraits that this library is communicating with the LJM library properly is to request the version of LJM installed on the system.  This can be done with the following code (Synchronously):
```javascript
// Load the LJM Library.
var ljm_ffi = require('../lib/ljm-ffi');
var ljm = ljm_ffi.load();

// Call the LJM_ReadLibraryConfigS function:
var ljmLibraryVersion = ljm.LJM_ReadLibraryConfigS('LJM_LIBRARY_VERSION', 0);

// Display the installed version of LJM:
console.log('LJM Version:', ljmLibraryVersion.Value);
```

This can be done with the following code (Asynchronously):
// Load the LJM Library.
var ljm_ffi = require('../lib/ljm-ffi');
var ljm = ljm_ffi.load();

// Execute LJM Function
ljm.LJM_ReadLibraryConfigS.async('LJM_LIBRARY_VERSION', 0, function(ljmLibraryVersion) {
	// Display the installed version of LJM:
	console.log('LJM Version:', ljmLibraryVersion.Value);
});
```

This is also illustrated in the ./test/get_ljm_version.js file.

## More Examples:
Look in the ./examples and ./test folders for more examples.



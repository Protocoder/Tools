var sys = require('sys');
var util = require('util');
var exec = require('child_process').exec;

var adb_content = 'adb shell content query --uri content://org.protocoder.contentprovider';
var adb_launch = 'adb shell am start -n org.protocoder.normal/org.protocoderrunner.apprunner.AppRunnerActivity -e projectFolder examples -e projectName %s';

console.log('\x1b[36m%s\x1b[0m');  //cyan 


var scripts = [];

exec(adb_content, function puts(error, stdout, stderr) {
	//sys.puts(stdout);
	var lines = stdout.split('\n');
	lines.forEach(function(line) {
		if (line) scripts.push(line.split(',')[1].split('=')[1].trim());
	});

	executeScripts();
}); 

function executeScripts() {
	scripts.forEach(function(script) {
		setTimeout(function() {
			var execLine = util.format(adb_launch, script);
			console.log(execLine);

			exec("adb shell am force-stop org.protocoder.normal");
			setTimeout(function() {
				exec(execLine, function puts(error, stdout, stderr) {
					console.log(stdout);
				});
			}, 200);

		}, next());
	})
}

var time = -3000;
function next() {
	return time += 3000;
}

let pug, $input, $data, $css, $result, $jsonError, $pugError, $cssError;

function init() {
	$input = document.getElementById('pugedit');
	$data = document.getElementById('jsoninput');
	$css = document.getElementById('cssinput');
	
	$result = document.getElementById('result');
	$jsonError = document.getElementById('jsonError');
	$pugError = document.getElementById('pugError');
	$cssError = document.getElementById('cssError');
	$btn1 = document.getElementById('render1');
	$btn2 = document.getElementById('render2');
	
	pug = require('pug');
/*
	$input.addEventListener('input', doRender, false);
	$data.addEventListener('input', doRender, false);
	$css.addEventListener('input', doRender, false);
*/
	$btn1.addEventListener('click', doRender, false);
	$btn2.addEventListener('click', doRender, false);
/*    
	$data.value = request('http://pugclient.fumlersoft.dk/trades.json');
	$css.value = require('http://pugclient.fumlersoft.dk/trades.css');
	$input.value = require('http://pugclient.fumlersoft.dk/trades.pug');
*/
	initEditors();
	
	var files = [
		{'trades.css': cssEditor},
		{'trades.json': jsonEditor},
		{'trades.pug': pugEditor}
	];
	
	files.forEach(function (item) {
		Object.keys(item).forEach(function(key) {
			getFile(key, item[key]);
		})
	})
	
	console.log('Ready');
	doRender();
}

function getFile(url, el) {
	fetch(url).then(function(response) {
		if(response.ok) {
			return response.text().then(text => {
				el.updateCode(text);
			});
		}
		
		throw new Error('Network response was not ok.');
	
	})
}

function doRender() {
	$pugError.innerHTML='';
	$jsonError.innerHTML='';
	$cssError.innerHTML = "";

	const json = jsonEditor.getCode();
	let data = {};
	try {
		data = JSON.parse(json);
		$jsonError.innerHTML='';
	} catch(e) {
		console.log('invalid json',e.message);
		$jsonError.innerHTML = 'Invalid JSON<br/>' + e.message;
		data = {};
	}
	
	const css = cssEditor.getCode();
	try {
		// test css
	} catch(e) {
		$cssError.innerHTML = "CSS Error<br/>" + e.message;
	}
		
	try {
		var result = pug.render(pugEditor.getCode(), data);
//        console.log(result);
		$result.innerHTML = "<style scoped>" + css + "</style>" + result;
	} catch(e) {
		console.log('pug error');
		$pugError.innerHTML = e.message;
		console.dir(e);
	}
}


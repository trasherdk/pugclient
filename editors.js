function initEditors() {
	
	const pugEditor = new CodeFlask(".pugedit",{
		language: 'pug',
		lineNumbers: true,
//		areaId: 'pugtext',
//		ariaLabelledby: 'pugheader',
		handleTabs: true
	});

	const jsonEditor = new CodeFlask(".jsoninput",{
		language: 'json',
		lineNumbers: true,
//		areaId: 'pugtext',
//		ariaLabelledby: 'pugheader',
		handleTabs: true
	});

	const cssEditor = new CodeFlask(".cssinput",{
		language: 'css',
		lineNumbers: true,
//		areaId: 'pugtext',
//		ariaLabelledby: 'pugheader',
		handleTabs: true
	});

/**	
	if (document.getElementById('puginput').value !== "") {
		pugEditor.updateCode(document.getElementById('puginput').value);
		console.log("pug: copy from textarea to editor.");
	}
	
	pugEditor.onUpdate((code) => {
		document.getElementById('puginput').value = code;
		doRender();
		console.log("pug: copy from editor to textarea.");
	});
**/
	window['pugEditor'] = pugEditor;
	window['jsonEditor'] = jsonEditor;
	window['cssEditor'] = cssEditor;

/*			
	for (var lang of Object.entries(Prism.languages)) {
		//flask.addLanguage(lang[0], lang[1]);
		console.log(lang[0]);
		console.log(lang[1]);
	}
*/
}

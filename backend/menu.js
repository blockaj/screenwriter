function menu(){
	var win = gui.Window.get();
	win.position = 'center';
	win.y = 30;
	var menubar = new gui.Menu({ type: 'menubar' });
	win.showDevTools();
	menubar.createMacBuiltin('Screenwriter');
	var file = new gui.MenuItem({ label: 'File' });

	var fileMenu = new gui.Menu({ type: 'contextmenu' });
	file.submenu = fileMenu;
	fileMenu.append(new gui.MenuItem({ label: 'New...',
										key: 'n',
										modifiers: 'cmd',
										click: function() {
											newDoc();
										}
									}));
	fileMenu.append(new gui.MenuItem({ label: 'Open...',
										key: 'o',
										modifiers: 'cmd',
										click: function() {
											open();
										}
									}));
	fileMenu.append(new gui.MenuItem({ type: 'separator' }));
	fileMenu.append(new gui.MenuItem({ label: 'Save as...',
									   key: 's',
									   modifiers: 'cmd shift',
									   click: function(){
									   	saveAs();  
									   }
									}));
	fileMenu.append(new gui.MenuItem({ label: 'Save',
										key: 's',
										modifiers: 'cmd',
										click: function(){
											save(currentDocument.pathAndTitle);
										}
									}));
	fileMenu.append(new gui.MenuItem({ type: 'separator' }));
	fileMenu.append(new gui.MenuItem({ label: 'Print',
										key: 'p',
										modifiers: 'cmd',
										click: function(){
											alert('Printing...');
										}}))


	menubar.insert(file, 1);
	win.menu = menubar;
}
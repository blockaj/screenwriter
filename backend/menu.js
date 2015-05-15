function menu(){
	var win = gui.Window.get();
	win.position = 'center';
	win.y = 30;
	var menubar = new gui.Menu({ type: 'menubar' });
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
										}}));
	fileMenu.append(new gui.MenuItem({ label: 'Export',
										key: 'e',
										modifiers: 'cmd',
										click: function() {
											exportPDF();
										}}));
	var format = new gui.MenuItem({ label: 'Format'});
	var formatMenu = new gui.Menu({ type: 'contextmenu' });
	formatMenu.append(new gui.MenuItem({ label: 'Title page',
										click: function() {
											var new_win = gui.Window.open('../html/title_page.html', {
												position: "center",
												height: 660,
												width: 816,
												toolbar: false
											});
										}}));
	format.submenu = formatMenu;


	menubar.insert(file, 1);
	menubar.insert(format, 3);
	win.menu = menubar;
}
/*
---

name: Form.MultipleFileInput
description: Create a list of files that has to be uploaded
license: MIT-style license.
authors: Arian Stolwijk
requires: [Element.Event, Class, Options, Events]
provides: Form.MultipleFileInput

...
*/

Object.append(Element.NativeEvents, {
	dragenter: 2, dragleave: 2, dragover: 2, dragend: 2, drop: 2
});

if (!this.Form) this.Form = {};

Form.MultipleFileInput = new Class({

	Implements: [Options, Events],

	options: {
		itemClass: 'uploadItem',
		allowMultiple: false,
		useList:false,
		useDrop:false/*,
		onAdd: function(file){},
		onRemove: function(file){},
		onEmpty: function(){},
		onDragenter: function(event){},
		onDragleave: function(event){},
		onDragover: function(event){},
		onDrop: function(event){}*/
	},

	_files: [],

	initialize: function(input, list, drop, options){
		this.setOptions(options);
		
		input = this.element = document.id(input);
		if(this.options.useList) list = this.list = document.id(list);
		if(this.options.useList) drop = this.drop = document.id(drop);

		

		var name = input.get('name');
		if (this.options.allowMultiple && name.slice(-2) != '[]') {
			input.set('name', name + '[]');
			input.set('multiple', true);
		}
		
		this.inputEvents = {
			change: function(event){
				Array.each(input.files, this.add, this);
				this.fireEvent('change', event);
			}.bind(this)
		};
		/*
		this.dragEvents = drop && (typeof document.body.draggable != 'undefined') ? {
			dragenter: this.fireEvent.bind(this, 'dragenter'),
			dragleave: this.fireEvent.bind(this, 'dragleave'),
			dragend: this.fireEvent.bind(this, 'dragend'),
			dragover: function(event){
				event.preventDefault();
				this.fireEvent('dragover', event);
			}.bind(this),
			drop: function(event){
				event.preventDefault();
				var dataTransfer = event.event.dataTransfer;
				if (dataTransfer) Array.each(dataTransfer.files, this.add, this);
				this.fireEvent('drop', event);
			}.bind(this)
		} : null;
		*/
		this.attach();
	},

	attach: function(){
		this.element.addEvents(this.inputEvents);
		if (this.dragEvents) this.drop.addEvents(this.dragEvents);
	},

	detach: function(){
		this.input.removeEvents(this.inputEvents);
		if (this.dragEvents) this.drop.removeEvents(this.dragEvents);
	},

	add: function(file) {
		
		if(!this.options.allowMultiple) 
			this._files = file;
		else 
			this._files.push(file);
		
		/*
		var self = this;
		
		new Element('li', {
			'class': this.options.itemClass
		}).grab(new Element('span', {
			text: file.name
		})).grab(new Element('a', {
			text: 'x',
			href: '#',
			events: {click: function(e){
				e.preventDefault();
				self.remove(file);
			}}
		})).inject(this.list);
		*/
		this.fireEvent('add', file);
		return this;
	},

	remove: function(file){
		
		var index = this._files.indexOf(file);
		if (index == -1) return this;
		this._files.splice(index, 1);
		this.list.childNodes[index].destroy();
		this.fireEvent('remove', file);
		if (!this._files.length) this.fireEvent('empty');
		return this;
	},

	getFiles: function(){
		return this._files;
	}

});

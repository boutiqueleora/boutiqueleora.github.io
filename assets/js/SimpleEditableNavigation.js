/*
---
description: Have a small simple navigation that you can modify some of the rows in predefine sections.

authors:
  - Jean-Nicolas Boulay Desjardins (http://jean-nicolas.name)

license:
  - MIT-style license

requires:
 - core/1.4:   '*'

provides:
  - SimpleEditableRowNavigation
...
*/

var SimpleEditableNavigation = new Class({
    
    Implements: [Options, Events],
    
    options: {
        notHiddenSectionIndicator: '&#9660;',
        hiddenSectionIndicator: '&#9658;'
    },
    
    /* initialization */
    initialize: function(container, options) {
        this.container = document.id(container);
        this.links = this.container.getElements('li li');
        this.sectionsHeaders = this.container.getElements('.section-header');
        this.hideAble = this.container.getElements('.hide-able');
        this.editable = this.container.getElements('.editable');
        this.setOptions(options);
        this.attach();
        this.fireEvent('initialized');
    },
    
    attach: function(){
        var self = this;
        this.container.addEvents({
            'click': function(e) {
                var target = document.id(e.target);

                if (target.match('input')){return;}

                if (target.hasClass('selected')) { // Active when a row is selected twice
                    self.editLink(target);
                } else { // new selection
                    self.unEditLink();
                    self.selectLink(target);
                }

            },
            'dblclick': function(e) {
                var target = document.id(e.target);

                if (self.links.hasClass('editing')) {
                    self.unEditLink();
                }
            
                self.editLink(target);
            },
            'keydown': function(event){
                var target = document.id(event.target);
                if (event.key == 'enter'){
                    if(target.match('input')){
                        self.editable.getElement('.editing').addClass('selected');
                        self.unEditLink();
                    }
                }
            }
        });
        this.fireEvent('attach', [this.container]);
    },
    
    detach: function(){
        this.container.removeEvents([
            'click',
            'dblclick',
            'keydown'
        ]);
        this.fireEvent('detach');
    },
    
    showSection: function(section){
        
        this.fireEvent('showedSection', [section]);
    },
    
    showAllSections: function(){
    
        this.fireEvent('showedAllSections', [sections]);
    },
    
    hideSection: function(section){
    
        this.fireEvent('hiddenSection', [section]);
    },
    
    hideAllSections: function(){
    
        this.fireEvent('hiddenAllSections', [sections]);
    },
    
    selectLink: function(target){
        if (!target.getParent('li') || target.match('.section-header') || target.getParent('.section-header') || target.match('ul')){return;}
        this.links.removeClass('selected');
        target.addClass('selected');
        this.fireEvent('selectedLink', [target]);
    },
    
    unSelectLink: function(e){
    
        this.fireEvent('unSelectedLink', [link]);
    },
    
    editLink: function(target){
        if (target.match('input')){return;}
        if (!target.getParent('ul').hasClass('editable')){return;}
        var value = target.get('text');
        if (this.links.hasClass('selected')) {
            this.links.removeClass('selected');
        }
        target.addClass('editing');
        target.empty();
        var input = new Element('input', {
            'type': 'text',
            'name': 'editing',
            'value': value
            }).inject(target);
        this.fireEvent('editLink', [target, input]);
    },
    
    unEditLink: function(){
        var row = this.editable.getElement('.editing')[0];
        if(typeOf(row) == 'null'){return;}
        var input = row.getChildren('input')[0];
        var value = input.get('value');
        input.destroy();
        row.set('text', value);
        this.links.removeClass('editing');
        this.fireEvent('changedLink', [value]);
    },
    
    addLink: function(section, text, where){
        var section = document.id(section);
        var text = typeOf(text) != 'undefined' ? text : this.defaultText[section];
        var where = typeOf(where) != 'undefined' ? where : 'bottom';
        new Element('li', {
            text: text
        }).inject(section, where);
        this.fireEvent('addedLink', [link, section, where]);
    },
    
    removeLink: function(el){
        var el, oldEl = document.id(el);
        el.destroy();
        this.fireEvent('removedLink', [link, oldEl]);
    }
});
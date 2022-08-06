/*
---
description: Great way to create a small puppop bubble window.

authors:
  - Jean-Nicolas Boulay Desjardins (http://jean-nicolas.name)

license:
  - MIT-style license

requires:
 - core/1.4:   '*'

provides:
  - BubbleWindow
...
*/

var BubbleWindow = new Class({
    
    Implements: [Options, Events],
    
    options: {
        fade: true,
        className: 'bubble-window',
        inject: document.id(document.body),
        eventType: 'click',
        position: 'top' // top, bottom, left, right (You can hack the rest with CSS)
    },
    
    /* initialization */
    initialize: function(button, content, options) {
        this.button = document.id(button);
        this.content = content;
        this.setOptions(options);
        this.BubbleWindowEl = null;
        this.toggle = false;
        this.attach();
        //new Fx.Reveal();
    },
    
    attach: function(){
        this.BubbleWindowEl = new Element('div', {
            'class': this.options.className,
            'events': {
                'click': function(){
                    this.hide();
                }.bind(this)
            }
        }).adopt(this.content).inject(this.options.inject);

        var ul = this.BubbleWindowEl.getChildren('ul')[0];
        
        ul.getChildren('li').addEvent('click', function(){
            this.hide();
        }.bind(this));
        
        ul.addEvent('click', function(){
            this.hide();
        }.bind(this));
        
        document.id(document.body).addEvent('click',function(e) {
            this.hide();
        }.bind(this));
        
        this.button.addEvent(this.options.eventType, function(e){
            e.stop();
            if (this.toggle) {
                this.hide();
                return;
            }
            this.show();
        }.bind(this));
        this.fireEvent('attach');
    },
    
    detach: function(){
        this.button.removeEvent(this.options.eventType);
        this.BubbleWindowEl.destroy();
        this.fireEvent('detach');
    },
    
    show: function(){
        this.BubbleWindowEl.setStyle('display', 'block');
        var BubbleWindowCoors = this.BubbleWindowEl.getCoordinates();
        var buttonCoors = this.button.getCoordinates();

        var bubbleTop = Math.abs((buttonCoors.height.toInt()+BubbleWindowCoors.height.toInt())-buttonCoors.top.toInt());
        var bubbleLeft = Math.abs(((buttonCoors.width.toInt()/2)-(BubbleWindowCoors.width.toInt()/2)));
        this.BubbleWindowEl.setStyles({
            'top': Math.abs(bubbleTop) ,
            'left': bubbleLeft
        });
        
        this.toggle = true;
        this.fireEvent('show');
    },
    
    hide: function(){
        this.BubbleWindowEl.setStyle('display', 'none');
        this.toggle = false;
        this.fireEvent('hide');
    }

});
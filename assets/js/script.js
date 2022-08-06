window.addEvent('domready', function(){

    Element.Events.shiftclick = {
        base: 'click', // the base event type
        condition: function(event){ //a function to perform additional checks
            return (event.shift == true); // this means the event is free to fire
        }
    };

	// Making the "container" div scrollable
	new Scrollable(document.id('content'));
	new Scrollable(document.id('left'));

	var photoZoomSlider = document.id('photo-zoom-slider');
	var photoSlider = new Slider(photoZoomSlider, photoZoomSlider.getElement('.knob'), {
		range: [50, 255],
		initialStep: 65,
		onChange: function(event){
			$$('#content li div, #content li img').setStyle('height', event);
		}
	});

    /*                         *
     * ----- Content IMG ----- *
     *                         */
    /*$$('#content img').addEvents({
        'mousedown': function(event){
            event.stop();
            var target = document.id(event.target);
            var obj = this;
        
            var clone = obj.clone().setStyles(obj.getCoordinates()).setStyles({
                opacity: 0.7,
                position: 'absolute',
                zIndex: 99999
            }).inject(document.body);
        
            var drag = new Drag.Move(clone, {
                droppables: $$('#left li li'),
                onDrop: function(dragging, section){
                    dragging.destroy();
                    if (section != null){
                        var uuid = obj.getParents('div').getChildren('.uuid')[0].get('text')[0];
                        new Request({
                            url: '/photo/group_remove/' + uuid
                        }).get();
                        section.highlight('#7389AE', '#FFF');
                    }
                },
                onEnter: function(dragging, section){
                    section.tween('background-color', '#98B5C1');
                },
                onLeave: function(dragging, section){
                    section.tween('background-color', '#D9DEE8');
                },
                onCancel: function(dragging){
                    dragging.destroy();
                }
            });
        
            drag.start(event);
        
        },
        'click': function(e){
            var target = document.id(e.target);
            
            console.log(target);
            return;
            target.getParent('div').addClass('selected');
        },
        'shiftclick': function(e){
            var target = document.id(e.target);
            
            console.log(target);
            return;
            target.getParent('div').addClass('selected');
        }
    });
    
    document.id('load-more-content').addEvent('click', function(e){
        e.stop();
        
    });*/

    /*                         *
     * --- Left Navigation --- *
     *                         */
	
    new SimpleEditableNavigation('left', {
        onSelectedLink: function(target){
            // Do something!
        }
    });
    
    /*                          *
     * --- Right Navigation --- *
     *                          */
     
     
    
    /*                        *
     * --- Multi-Selector --- *
     *                        */
    var theSelector = new Element('div', {
                'class': 'multi-obj-selector',
                styles: {
                    'display': 'none'
                },
                events: {
                    'mouseup': function(e) {
                        e.stop();
                        $$('.multi-obj-selector')[0].setStyle('display', 'none');
                    }
                }
            }).inject(document.body);
            
    ///
            
    document.id('sign-out').addEvent('click', function(e){
        window.location = 'http://50.57.171.171/index.php/user/logout';
    });
    
    document.id('photo-upload').addEvent('click', function(e){
        window.location = 'http://50.57.171.171/index.php/photo/uploader';
    });
    
    ///
    
    new Request.JSON({url: '/gallery/allphotos/0',
                        onSuccess: function(photo){
                                photoSlider.detach();
                                Object.each(photo, function(value, key){
                                        if(value.group_id == 0){
                                        new Element('li').adopt(
                                            new Element('div').adopt(
                                                new Element('img', {
                                                    src: value.photo_file_small,
                                                    'class': 'img',
                                                    styles: {
                                                        height: 65
                                                    },
                                                    events: {
                                                        'click': function(e){
                                                            var target = document.id(e.target);
                                                            var dbid = target.get('dbid');
                                                            $$('#content img').removeClass('selected');
                                                            target.addClass('selected');
                                                        }
                                                    },
                                                    'dbid': value.id
                                            }))).inject($$('#content ul')[0]);
                                            }
                                });
                                photoSlider.attach();
                        }
                }).get();
                
                new Element('span', {
                    text: '10'
                }).inject(document.id('add-content'));
                
    document.id('load-more-content').addEvent('click', function(){
        var status = document.id('add-content').getElement('span').get('text').toInt();
        new Request.JSON({url: '/gallery/allphotos/' + status,
                        onSuccess: function(photo){
                                photoSlider.detach();
                                Object.each(photo, function(value, key){
                                        if(value.group_id == 0){
                                        new Element('li').adopt(
                                            new Element('div').adopt(
                                                new Element('img', {
                                                    src: value.photo_file_small,
                                                    'class': 'img',
                                                    styles: {
                                                        height: document.id('content').getElements('img')[0].getStyle('height')
                                                    },
                                                    events: {
                                                        'click': function(e){
                                                            var target = document.id(e.target);
                                                            var dbid = target.get('dbid');
                                                            $$('#content img').removeClass('selected');
                                                            target.addClass('selected');
                                                            console.log(dbid);
                                                        }
                                                    },
                                                    'dbid': value.id
                                            }))).inject($$('#content ul')[0], 'bottom');
                                            }
                                });
                                document.id('add-content').getElement('span').set('text', status + 10);
                                photoSlider.attach();
                        }
                }).get();
    });

var content = [
    new Element('ul').adopt([
        new Element('li', {
            'text': 'New Folder',
            'events': {
                'click': function(e){
                    e.stop();
                    alert('New Folder!');
                }
            }
        }),
        new Element('li', {
            'text': 'New Album',
            'events': {
                'click': function(e){
                    e.stop();
                    alert('New Album!');
                }
            }
        })
    ])
];

	new BubbleWindow('add', content);
   
            var toggle = false;
            new Tree('tree', {
                cloneOffset: {x:0, y:0}
            });
			new Collapse('menu', {
                fadeOpacity: 1,
            });
 
});

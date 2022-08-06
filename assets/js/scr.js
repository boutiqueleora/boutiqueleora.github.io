window.addEvent('domready', function(){

	$$('.gallery img').addEvent('mouseover', function(e){
			var target = document.id(e.target);
			var side = target.get('side');
			var photoBack = target.getNext('.photo_back').get('text');
			target.set('side', 'back');
			target.set('src', photoBack);
	});

	$$('.gallery img').addEvent('mouseout', function(e){
			var target = document.id(e.target);
			var side = target.get('side');
			var photoFront = target.getNext('.photo_front').get('text');
			target.set('side', 'back');
			target.set('src', photoFront);
	});

	$$('.gallery a img').addEvent('click', function(e){
			e.preventDefault();
                        var boxWrapper = new Element('div', {
                                id: 'box-wrapper',
                                styles: {
                                        height: window.getSize().y,
                                },
                                events: {
                                        'click': function(e){
                                                var target = document.id(e.target);
                                                if(target.getParent('#box-image-wrapper')){return;}
                                                if(document.id('box-image-wrapper')){
                                                        document.id('box-image-wrapper').destroy();
                                                        document.id('box-wrapper').destroy();
                                                }
                                        }
                                }
                        }).inject($$('body')[0], 'top');
                        var target = document.id(e.target);
                        var photoMedium = target.getParent('a').get('href');
                        var photoName = photoMedium.split('/').getLast();
                        new Element('div', {id: 'box-image-wrapper'}).adopt([
                                        new Element('img', {
                                                        src: photoMedium,
                                                        alt: photoName,
                                                        id: 'box-image-bigimage',
                                                        big: '/assets/img/big/' + photoName,
							events: {
								'load': function() {
									document.id('box-wrapper').setStyle('height', window.getScrollSize().y);
								}
							}
                                        }),
                                        new Element('div', {
                                                        id: 'box-image-rightbar'
                                        }).adopt([
                                                new Element('img', {
                                                        src: '/assets/img/tiny/' + photoName,
                                                        alt: photoName,
                                                        events: {
                                                                'click': function(e){
                                                                        // Change the image...
                                                                }
                                                        }
                                                })
                                        ])
                                ]).inject('box-wrapper');
                        new Zoomer('box-image-bigimage');
        });

	$$('body')[0].addEvent('change', function(e) {
		var boxWrapper = document.id('box-wrapper');
		if(boxWrapper){return;}
		boxWrapper.setStyle('height', $$('body')[0].getSize().y);
	});

});

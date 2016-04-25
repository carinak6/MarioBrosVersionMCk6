$(function(){
	var sons_fond=$('#intro');
	sons_fond.trigger('play');
	sons_fond.prop('volume', 0.4);
	$('#saute').prop('volume', 0.4);
	$('#colis').prop('volume', 0.4);
		

	$(document).keydown(function(e){
		var position_mario= $('#mario').position();
    	// avancer, on appuyant sur la fleche droite
		if(e.keyCode == 39) {			
			avancer(position_mario.left);			
		}
		//reculer, appuyant sur la fleche gauche
	    if(e.keyCode == 37) {
	    	reculer();
	    }
	    // sauter, appuyant sur la fleche haut
	    if(e.keyCode == 38) {
	    	sauter();
	    }

	});

	function avancer(gauche){

		$('#mario').css({'transform': 'rotateY(0deg)'});	//je change la direction de Mario au case où viens de la function reculer		
		if($('.principal').css('background-position-x') != '-1230px'){ //quand la position du background arrive à cette position Mario et le fonds ne bougent pas
				$('.principal').css({'background-position-x': "-=10px"});
				$('#mario').css({'left':"+=10px"});
		}		

		if(gauche == 1110){	/* la position de Mario où il dispare, c est la fin du jeux */	
			$('#mario').hide();
			$('#intro').trigger('pause');			
			$('#aurevoir').show();
			$('#aurevoir').append('<iframe width="854" height="480" src="https://www.youtube.com/embed/B9PjBgWOkng?controls=0&autohide=1&autoplay=1" frameborder="0" allowfullscreen></iframe>');
			$('#aurevoir').fadeOut(13000,"linear", function(){
            	$('#message').show();					
      		});					
		}		
	}

	function reculer(){
		$('#mario').css({'transform': 'rotateY(180deg)'}); // je change la direction de Mario quand il recule
		if(($('.principal').css('background-position-x') === $('#mario').css('left')) || $('#mario').css('left') == 0){// condition pour arreter Mario quand il recule

		}else{
			$('.principal').css({'background-position-x': "+=10px"});
			$('#mario').css({'left':"-=10px"}); 
		}			
	}

	function sauter(){		
		$('#mario').animate({bottom: "+=100px",left:"+=50px"});
        $('#mario').animate({bottom: "-=100px",left:"+=50px"});        
        $('.principal').css({'background-position-x': "-=40px"});
        $('#saute').trigger('play');		
	}

	function collision()
	{
		var mario1 = parseInt($('#mario').css('left'));
		var mechant = parseInt($('#mechant1').css('left'));	 
		if(mario1 == 380 && mechant == 400){// quand Mario et mechant colisionent dans cette position
			$('#intro').trigger('pause');
	  		$('#colis').trigger('play');		  				
	  		$('#mario').animate({bottom: "+=100px"});	  		
	  		$('#mario').animate({bottom: "-=500px"});
	  		$('#message').fadeIn(5000,"linear");
	    }
	}
	setInterval(collision, 10);
});
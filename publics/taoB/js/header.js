$(function(){
	$('.hoverss').mouseenter(function(){
		$(this).next().show();
		$(this).next().find('.phover').animate({left:'200px'})
		$(this).next().find('img').animate({right:'100'})
		$(this).parent().siblings().find('.AB_left').hide()
	   
	})
    $('.left-EM').mouseenter(function(){
    	$('.step-2-EM').animate({top:'23'},"slow")
    })
     $('.right-EM').mouseenter(function(){
    	$('.step-2-EM').animate({top:'23'},"slow")
    })
    
    
    $('dd a').mouseenter(function(){
    	
    	$(this).css('color','#0097DB');
    	$(this).find('.change').css({opacity:'1'})
    	
    })
    $('dd a').mouseout(function(){
    	
    	$(this).css('color','#e5e9ee');
    	$(this).find('.change').css({opacity:'0'})
    })
    
    
    $('.KFBT').mouseenter(function(){
    	$(this).find('.click').css('transform','rotate(180deg)')
    	$('.open-HV').animate({height:'277px'},"slow")
    });
    $('.KFBT').mouseleave(function(){
    	$(this).find('click').css('transform','rotate(-180deg)')
    	$('.open-HV').animate({height:'0'},"slow")
    })
	 $('.upDown').mouseenter(function(){
    	$(this).find('.click').css('transform','rotate(180deg)')
    	$('.three').animate({height:'150px'},"slow")
    });
    $('.upDown').mouseleave(function(){
    	$(this).find('click').css('transform','rotate(-180deg)')
    	$('.three').animate({height:'0'},"slow")
    })
    
     $('.three p').mouseenter(function(){
    	
    	$(this).css('color','#0097DB');
    	$(this).find('.change').css({opacity:'1'})
    	
    })
      $('.three p').mouseout(function(){
    	
    	$(this).css('color','#e5e9ee');
    	$(this).find('.change').css({opacity:'0'})
    })
})

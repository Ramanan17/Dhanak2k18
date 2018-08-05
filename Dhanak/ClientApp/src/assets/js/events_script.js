// (function(){

// 	var button = document.getElementById('cn-button'),
// $(document).ready(function(){
  function events_script(){ 
	wrapper = document.getElementById('cn-wrapper');
	$('#cn-wrapper ul li').hover(function(){
		$('#cn-button').html($(this).attr('data-value'));
	});
	function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}
// function setRotation(){
// 	$('#cn-wrapper ul li').each($(this).css('transform','rotate('+getRotationDegrees($(this))+'deg) skew(54deg)'));
// }
var currentlyActive;
var btn_pulse;
var isMobile = false;
$('#cn-wrapper ul li').click(function(){
	$('.component').css('paddingTop', '250px');	
	angle = getRotationDegrees($(this));
	var req_angle = 90 - (angle + 22.5); //to bring to north
	// var req_angle = 180 - (angle + 18); //to bring to east
	$('#cn-wrapper').css('transform','rotate('+req_angle+'deg)');
	$('#branch_container').css('transform','rotate('+req_angle+'deg)');
	$('#cn-wrapper ul li').css('opacity','0.3');
	$(this).css('opacity','1');
	// $('.main_event_btn').css('transform','rotate(' + angle + 'deg) skew(54deg)');
	// $(this).css('transform','rotate(' + angle + 'deg) skew(54deg) scale(1.12)');
	if(currentlyActive){		
		$('#' + currentlyActive.attr('data-value') + '>div').css('opacity','0.3');
	}
	currentlyActive = $(this);
	$('.parent').css('transform','');
	// $('#branch_container div div').css('transform','');
	$('#'+$(this).attr('data-value')).css('transform','scale(1.3)');
	// $('.node0').css('border-left-style','hidden !important');
	// $('#'+$(this).attr('data-value') + ' span').css('transform','rotate(-90deg)');
	// console.log($('#'+$(this).attr('data-value')).css('display'));
	if(isMobile || $('#'+$(this).attr('data-value')).css('display') == 'none'){
		$('.parent').css('display','none');
		$('#'+$(this).attr('data-value')).css('display','block');
		isMobile = true;
	}
	$('#' + currentlyActive.attr('data-value') + '>div').css('opacity','1');
	$('#cn-button').html($(this).attr('data-value'));
	// $(this).css('pointerEvents','none');
	// $('#' + $(this).attr('data-value') + '>div').css('opacity','1');
})

$('.popup_btn').click(function(ev){
	ev.stopPropagation();
	//close all modals
	// $('.modal').modal('close');
	//open subevent modal
	// var sub_event_id = $(this).attr('href');
	// $(sub_event_id).modal('open');
	//call main event click
	var event_id = $(this).attr('data-value');
	$(event_id).click();
	//pulse
	// btn_pulse = $(this).parent();
	// btn_pulse.css('animation', 'pulse 1.5s infinite');
	
});
function sm(){
	$('.popup_btn').parent().css('animation', 'none');
}

// $('.mat-drawer-shown').on('click',function(){
// 	btn_pulse.css('animation', 'none');
// 	console.log('blah2');

// });
// $('#branch_container').click(function(ev){
// 	console.log('branch_container clicked - modals closing');
// 	$('.modal').modal('close');
// });
function clr(){
	if(currentlyActive){
		currentlyActive.find('a').css({'border':'none'});
	}
	if(btn_pulse){		
		btn_pulse.css('animation', 'none');
	}
}

// $('.modal').modal({opacity:0.5,onCloseStart:clr});
// $('.clc').hover(function(){
// 	$(this).css('opacity','1');
// },function(){
// 	$(this).css('opacity','0.7');
// });
$('.cn-wrapper ul li').hover(function(){
	// console.log('#' + $(this).attr('data-value')+ '>div');

	$(this).css('opacity','1');
	$('#' + $(this).attr('data-value') + '>div').css('opacity','1');
},function(){
	$('#' + $(this).attr('data-value') + '>div').css('opacity','0.3');
	$(this).css('opacity','0.3');
	if(currentlyActive){
	$('#' + currentlyActive.attr('data-value') + '>div').css('opacity','1');
	currentlyActive.css('opacity','1');
	}
});

}	
//   });
	
// var el = document.getElementById('cn-wrapper');
// var ht = $('#cn-wrapper').height();
// var ratio = 180/ht;
// var hammertime = new Hammer(el);
// hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
// hammertime.on('pan', function(ev) {
// 	console.log('deltaX '+ev.deltaX);
// 	console.log('deltaY '+ev.deltaY);
// 	// $('#cn-wrapper').css('transform','rotate('+ev.angle+'deg)');
// });
// // hammertime.on('pandown', function(ev) {
// 	// console.log(ev);
// 	// console.log('dwon');
// 	// console.log(ev.distance);
// 	console.log('angle down '+ev.angle);
// 	// console.log(ev.distance*0.5*180/Math.PI);
// 	$('#cn-wrapper').css('transform','rotate('+ev.distance*ratio*-1+'deg)');
// });
// hammertime.on('panup', function(ev) {
// 	// console.log(ev);
// 	// console.log('up');
// 	console.log('angle up '+ev.angle);
// 	$('#cn-wrapper').css('transform','rotate('+ev.distance*ratio+'deg)');
// });

// hammertime.on('swipedown', function(ev) {
// 	console.log(ev);
// });
			
		
//     // overlay = document.getElementById('cn-overlay');

// 	//open and close menu when the button is clicked
// 	var open = false;
// 	button.addEventListener('click', handler, false);
// 	wrapper.addEventListener('click', cnhandle, false);

// 	function cnhandle(e){
// 		e.stopPropagation();
// 	}

// 	function handler(e){
// 		if (!e) var e = window.event;
// 	 	e.stopPropagation();//so that it doesn't trigger click event on document

// 	  	if(!open){
// 	    	openNav();
// 	  	}
// 	 	else{
// 	    	closeNav();
// 	  	}
// 	}
// 	function openNav(){
// 		open = true;
// 	    button.innerHTML = "-";
// 	    // classie.add(overlay, 'on-overlay');
// 	    classie.add(wrapper, 'opened-nav');
// 	}
// 	function closeNav(){
// 		open = false;
// 		button.innerHTML = "+";
// 		// classie.remove(overlay, 'on-overlay');
// 		classie.remove(wrapper, 'opened-nav');
// 	}
// 	document.addEventListener('click', closeNav);

// })();


$(document).ready(function(){

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false; 
	});
    // hamburger
	var click = 1;

	$("#show-me-menu").on("click", clickHamb);

	function clickHamb() {
	    if ( click == 1 ) {
	        $(this).addClass('is-active');
	        $('.mobile-nav').slideToggle(300);
	        click = 2;
	    } else {
			$(this).removeClass('is-active');
			$('.mobile-nav').hide();
	        click = 1;
	    }
	}
	
	//region select
	$('.header__region-select a ').click(function(){
		var c_val = $(this).data('region');
		$(this).closest('.header__regions').find('.header__current-region').html(c_val + "<i class='ico ico-caret'></i>");
		$(this).parent('.header__regions').toggleClass('active');
	});

	// dropdown UI
	$('.ui-dropdown').on('click', function(){
		$(this).toggleClass('active');
	});
	$('.ui-dropdown__select a').click(function(){
		var c_val = $(this).data('value');
		$(this).closest('.ui-dropdown').find('input').val(c_val);
		$(this).parent('.ui-dropdown').toggleClass('active');
	});

});
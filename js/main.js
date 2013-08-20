
$(document).ready(function() {

	$('[data-toggle="modal"]').click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		//var modal_id = $(this).attr('data-target');
		$.get(url, function(data) {
		  $(data).modal();
		});
	});

 


	 $("#fixed-bar")
	    .css({position:'fixed',bottom:'0px'})
	    .hide();


	$(window).scroll(function () {
	    if ($(this).scrollTop() > 400) {
	      $('#fixed-bar').fadeIn(200);
	    } else {
	      $('#fixed-bar').fadeOut(200);
	    }
	  });    

 
});
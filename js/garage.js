$(document).ready(function(){
	$(document).click(function(e){
		garage.click_controller(e);
	});

	$("#pin").focus();
	// clear input when typing begins
	$("#pin").keypress(function(){
		$(this).val($(this).val().replace("PIN",""));
	});
	
	if ($("#pin").length == 0)
		garage.status();
});
$.ajaxSetup({
	// this is necessary because the freaking iPhone caches ajax requests... 
	// seriously, who does that?
	headers: { "cache-control": "no-cache" }
});

var garage = {	
	// click handler for the page
	click_controller : function(e)
	{
		var $this = $(e.target);

		switch( $this.attr('id') )
		{
			case 'submit' :
				$("#login").submit();
				break;
			case 'open' : 
				// open door
				garage.open();
				break;
			case 'close' :
				// close door
				garage.close();
				break;
			case 'status' :
				// get status
				garage.status();
				break;
			default:
				// do nothing
				break;
		}
	},
	open : function(){
		$("#loading-text").html("LOADING");
		$("#loading").show();

		garage.checkAndOpen();
	},
	close : function(){
		$("#loading-text").html("LOADING");
		$("#loading").show();

		garage.checkThenClose();
	},
	checkAndOpen : function(callback){
		// call to get status
		var postdata = {};

		postdata.status = true;
		postdata.quickstatus = true;

		$("#loading-text").html("LOADING");
		$("#loading").show();
		
		$.post('ajax/garage.php', postdata, function(data){
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				if (data.status == "up")
				{
					$("#loading").hide();
					$("#message").show().html("ALREADY UP").delay(5000).fadeOut();
				}
				else
					garage.initiateOpen();
			}
		},'json');
	},
	checkThenClose : function(){
		// call to get status
		var postdata = {};

		postdata.status = true;
		postdata.quickstatus = true;

		$("#loading-text").html("LOADING");
		$("#loading").show();
		
		$.post('ajax/garage.php', postdata, function(data){
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				if (data.status == "down")
				{
					$("#loading").hide();
					$("#message").show().html("ALREADY DOWN").delay(5000).fadeOut();
				}
				else
					garage.initiateClose();
			}
		},'json');
	},
	status : function(){
		// call to get status
		var postdata = {};

		postdata.status = true;
		postdata.quickstatus = true;

		$("#loading-text").html("LOADING");
		$("#loading").show();
		
		$.post('ajax/garage.php', postdata, function(data){
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				$("#message").show(function(){
					$("#loading").hide();
					$("#message").html("IT'S " + data.status).delay(5000).fadeOut();
				});
			}
		},'json');
	},
	initiateClose : function(){
		var postdata = {};

		postdata.close = true;


		$.post('ajax/garage.php', postdata, function(data){
			// do stuff
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				$("#loading-text").html("CLOSING...");
				var postdata2 = {};

				postdata2.status = true;
				
				$.post('ajax/garage.php', postdata2, function(data){
					$("#loading").hide();
					if (data.error)
						$("#message").show().html(error);
					else
					{
						$("#message").show().html("IT'S " + data.status).delay(5000).fadeOut();
					}
				},'json');
			}
		},'json');
	},
	initiateOpen : function	(){
		var postdata = {};

		postdata.open = true;

		$.post('ajax/garage.php', postdata, function(data){
			// do stuff
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				$("#loading-text").html("OPENING...");
				var postdata2 = {};

				postdata2.status = true;
				
				$.post('ajax/garage.php', postdata2, function(data){
					$("#loading").hide();
					if (data.error)
						$("#message").show().html(error);
					else
					{
						$("#message").show().html("IT'S " + data.status).delay(5000).fadeOut();
					}
				},'json');
			}
		},'json');
	}
}

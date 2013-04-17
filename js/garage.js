$(document).ready(function(){
	$(document).click(function(e){
		garage.click_controller(e);
	});

	$("#pin").focus();
	$("#pin").focus(function(){
		$("#pin").setCursorPosition(0);
	});
	$("#pin").keypress(function(){
		$(this).val($(this).val().replace("PIN",""));
	});
	
	if ($("#pin").length == 0)
		garage.status();
});
$.ajaxSetup({
  headers: { "cache-control": "no-cache" }
});
//postcount = Math.floor(Math.random()*99999);
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
				// calls function to open door
				garage.open();
				break;
			case 'close' :
				// calls function to close door
				garage.close();
				break;
			case 'status' :
				// calls function to get status
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

		garage.checkAndClose();
	},
	checkAndOpen : function(){
		// call to get status
		var postdata = {};
		// hack to prevent mobileSafari's POST caching
		//postdata.postcount = postcount;
		//postcount++;

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
					garage.actuallyOpen();
			}
		},'json');
	},
	checkAndClose : function(){
		// call to get status
		var postdata = {};
		// hack to prevent mobileSafari's POST caching
		//postdata.postcount = postcount;
		//postcount++;

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
					garage.actuallyClose();
			}
		},'json');
	},
	status : function(){
		// call to get status
		var postdata = {};
		// hack to prevent mobileSafari's POST caching
		//postdata.postcount = postcount;
		//postcount++;

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
	actuallyClose : function(){
		var postdata = {};
		// hack to prevent mobileSafari's POST caching
		//postdata.postcount = postcount;
		//postcount++;

		postdata.close = true;


		$.post('ajax/garage.php', postdata, function(data){
			// do stuff
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				$("#loading-text").html("CLOSING...");
				var postdata2 = {};
				// hack to prevent mobileSafari's POST caching
				//postdata2.postcount = postcount;
				//postcount++;

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
	actuallyOpen : function	(){
		var postdata = {};
		// hack to prevent mobileSafari's POST caching
		//postdata.postcount = postcount;
		//postcount++;

		postdata.open = true;


		$.post('ajax/garage.php', postdata, function(data){
			// do stuff
			if (data.error == true)
				$("#message").show().html(data.error);
			else
			{
				$("#loading-text").html("OPENING...");
				var postdata2 = {};
				// hack to prevent mobileSafari's POST caching
				//postdata2.postcount = postcount;
				//postcount++;

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

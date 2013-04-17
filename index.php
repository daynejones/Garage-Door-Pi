<?
session_start(); 
if ($_POST['password'])
{
	if ($_POST['password'] == "1234")
	{
		$_SESSION['loggedin'] = true;
	}
	else
	{
		$pinMessage = "OOPS";
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name = "viewport" width="480" height="1136" content = "user-scalable = no">
<title>Garage Door</title>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/garage.js"></script>
<script type="text/javascript" src="js/cursor.js"></script>
<link rel="stylesheet" type="text/css" href="css/garage.css?23">
<link rel="apple-touch-icon-precomposed" href="favicon.ico"/>
<link rel="apple-touch-startup-image" href="splash.png?223" /> 
</head>
<body>
	<? if ($_SESSION['loggedin'] == true) : ?>
	<div class="wrapper">
		<div id="container">
			<a id="open">OPEN</a>
			<a id="close">CLOSE</a>
			<a id="status">STATUS</a>
			<div id="message">
			</div>
		</div>
	</div>
	<div id="loading"><div id="loading-text">LOADING</div></div>
	<? else : ?>
	<div class="wrapper">
		<div id="container">
			<form method="POST" id="login" action="/">
				<input type="tel" id="pin" name="password" maxlength="4" value="<?=$pinMessage ? $pinMessage : "PIN"?>" /><br />
				<a id="submit">GO</a>
			</form>
		</div>
	</div>
	<? endif; ?>
</body>
</html>
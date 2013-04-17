<?php
$response = array();
$response['error'] == false;
if ($_POST)
{
	if ($_POST['open'] == true)
	{
		// run the activate script and make sure we don't get an error
		$return = `bash /var/www/garagedoor/activate_garagedoor.sh`;
		if ($return != "success")
			$response['error'] = true;
	}
	if ($_POST['close'] == true)
	{
		// run the activate script and make sure we don't get an error
		$return = `bash /var/www/garagedoor/activate_garagedoor.sh`;

		if ($return != "success")
			$response['error'] = true;
	}
	elseif ($_POST['status'] == true)
	{
		
		if ($_POST['quickstatus'] == true)
			$response['status'] = getStatus();
		else
			$response['status'] = getStatus(true);
	}
}
else
	$response['error'] = true;

echo json_encode($response);

/**
 * getStatus runs the 'read' scripts and even does some double checking to make sure
 * it reads the status properly
 * @param  boolean  $wait        set $wait to true if you would like the function to
 * sleep before evaluating again. This is useful when you want to give the garage door
 * some time to close before asking its status again.
 * @param  integer $middleCount this is kind of a hacky way to recursively run
 * getStatus if the function returns 'in the middle'. We want to run it again
 * to make sure we a. didn't get a false reading and b. allowed enough time for
 * the garage to oper or close completely
 * @return string               we return 'down', 'up', or 'in the middle'
 */
function getStatus($wait = null, $middleCount = 0){
	// gpio 0 reads all 1's when the garage door is down, mixed when its up
	// gpio 1 reads all 1's when the garage door is up, mixed when its down
	// both read a mixture of 0's and 1's when it is in the middle

	if ($wait !== null)
		sleep(12);
	else
		sleep(1);

	// make sure the pins are set to read
	`bash /var/www/garagedoor/0_on.sh`;
	`bash /var/www/garagedoor/1_on.sh`;

	// this variable keeps track of how many times a 0 is reported on the gpio 0 pin
	// this has to be done because sometimes, the report will be false 1 out of 10
	// times. this is a safe way to make sure we don't just take one reading and trust it
	$gpioZeroZeroCount = 0;
	// this variable keeps track of how many times a 1 is reported on the gpio 0 pin
	$gpioZeroOneCount = 0;

	// this is the loop to read the pin 10 times and add to our counters
	for ($i=0; $i < 10; $i++) { 
		$return = `bash /var/www/garagedoor/0_status.sh`;
		if ($return == 0) {
			$gpioZeroZeroCount++;
		} elseif ($return == 1) {
			$gpioZeroOneCount++;
		}
	}

	// this variable keeps track of how many times a 0 is reported on the gpio 1 pin
	$gpioOneZeroCount = 0;
	// this variable keeps track of how many times a 1 is reported on the gpio 1 pin
	$gpioOneOneCount = 0;

	// this is the loop to read the pin 10 times and add to our counters
	for ($i=0; $i < 10; $i++) { 
		$return = `bash /var/www/garagedoor/1_status.sh`;
		if ($return == 0) {
			$gpioOneZeroCount++;
		} elseif ($return == 1) {
			$gpioOneOneCount++;
		}
	}

	// if gpio 0 returns a 1 at least 9 out of 10 times, then we know the door is down
	if ($gpioZeroOneCount >= 9)
		return "down"; 
	// if gpio 1 returns a 1 at least 9 out of 10 times, then we know the door is up
	elseif ($gpioOneOneCount >= 9) 
		return "up";
	// if neither pin returned consistent results at least 9 out of 10 times, the door is in the middle
	else
		return "in the middle";
}

?>




<?php
$response = array();

if ($_POST)
{
	if ($_POST['open'] == true)
	{
		$return = `bash /var/www/garagedoor/activate_garagedoor.sh`;

		if ($return = "success")
		{
			$response['error'] = false;
		}
		else
		{
			$response['error'] = true;
		}
	}
	if ($_POST['close'] == true)
	{
		$return = `bash /var/www/garagedoor/activate_garagedoor.sh`;

		if ($return = "success")
		{
			$response['error'] = false;
		}
		else
		{
			$response['error'] = true;
		}
	}
	elseif ($_POST['status'] == true)
	{
		// returns up, down, or middle
		$response['error'] == false;

		if ($_POST['quickstatus'] == true)
			$response['status'] = getStatus();
		else
			$response['status'] = getStatus(true);
	}
}
else
{
	$response['error'] = true;
}

echo json_encode($response);

function getStatus($wait = null, $middleCount = 0){
	// returns 'up', 'down', or 'in the middle'

	// 0 reads all 1's when the garage door is down, mixed when its up
	// 1 reads all 1's when the garage door is up, mixed when its down
	// each read a mixture of 0's and 1's when it is in the middle

	if ($wait !== null)
		sleep(12);
	else
		sleep(1);

	// make sure the pins are set to read
	`bash /var/www/garagedoor/0_on.sh`;
	`bash /var/www/garagedoor/1_on.sh`;

	$z = 0;
	$zeroZeroCount = 0;
	$zeroOneCount = 0;

	for ($i=0; $i < 10; $i++) { 
		$return = `bash /var/www/garagedoor/0_status.sh`;
		//sleep(.5);
		if ($return == 0) {
			$zeroZeroCount++;
		} elseif ($return == 1) {
			$zeroOneCount++;
		}
	}

	$oneZeroCount = 0;
	$oneOneCount = 0;

	for ($i=0; $i < 10; $i++) { 
		$return = `bash /var/www/garagedoor/1_status.sh`;
		//sleep(.5);
		if ($return == 0) {
			$oneZeroCount++;
		} elseif ($return == 1) {
			$oneOneCount++;
		}
	}

	// test to see if its down
	if ($zeroOneCount >= 9)
	{
		return "down"; 
	}
	// test to see if its up
	elseif ($oneOneCount >= 9) 
	{
		return "up";
	}
	else // stuck in the middle
	{
		return "in the middle";
	}

}

?>




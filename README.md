Garage-Door-Pi
==============

A mobile(and desktop friendly) web app that will open your garage door, provided you have set up the raspberry pi properly.

Steps for reproducing my setup:
1. Setup a raspberry pi computer with Apache, PHP, and the wiringPi library.
2. Pull Garage Door Pi and put it wherever you like.
3. Setup a relay that initiates your garage door when powered.
4. Connect whatever gpio port you wish to use to power the relay. In the 'activate_garagedoor.sh' script, I used gpio 7.
5. Setup magnetic reed switches; one that is powered when the door is closed and one that is powered when the door is open.
6. Connect the switches to gpio 0 and gpio 1 so that when we read the ports, we know whether the door is up or down.

These steps aren't extremely detailed so you will need to either know what you are doing or be prepared to learn a lot.

To do:
1. Make it actually secure instead of a simple password
2. Put the garage door stuff into a class (Ruby?) so it is more readable and compact
3. Invent a low cost spacecraft

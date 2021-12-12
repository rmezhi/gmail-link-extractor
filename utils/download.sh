#!/bin/bash

#filename=./clean.txt

while read line || [[ -n "$line" ]]; do
	echo downloading $line
	#echo $line | tr -d  '\r\n' | xargs curl
	wget $line
	sleep .1
done < $1 

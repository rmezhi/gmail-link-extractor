
#!/bin/bash

filename=./raw

while read line || [[ -n "$line" ]]; do
	echo scanning $line
    # if contains com/m/p unique marker and does NOT contain ?
    if [[ "$line" == *"com/m/p"*  ]] &&  [[ "$line" != *"?"*  ]] ; then
       # remote new lines
       a=`echo $line | tr -d  '\r\n'`
       echo $a?d=t >> clean_dl_2
       #echo $line >> clean_2
    fi
done < $1







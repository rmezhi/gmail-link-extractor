
#!/bin/bash

#filename=./raw

while read line || [[ -n "$line" ]]; do
	echo scanning $line
    echo "${line///p/"/new"}" >> clean_new
    
done < $1 







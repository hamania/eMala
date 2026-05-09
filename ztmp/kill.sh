pkill -f "openclaw"
#not BSD, sys V : ps -ef | grep "openclaw" | grep -v grep
ps aux | grep openclaw | grep -v grep

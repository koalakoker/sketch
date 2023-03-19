#!/bin/sh
PATH=$PATH:/volume1/@appstore/Node.js_v8/usr/local/lib/node_modules/forever/bin

forever start --workingDir /volume1/server/sketch --sourceDir /volume1/server/sketch -l /volume1/server/sketch/logs/log.txt -a -o /volume1/server/sketch/logs/output.txt .

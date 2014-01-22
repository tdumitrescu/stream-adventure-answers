var ws = require('websocket-stream');

ws('ws://localhost:8000').write("hello\n").end();

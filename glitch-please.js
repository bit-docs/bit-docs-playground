const http = require('http');
const reload = require('reload');
const express = require('express');
const cheerio = require('cheerio');
const chokidar = require('chokidar');
const exec = require('child_process').exec;
const interceptor = require('express-interceptor');

let WAITING = false;
let RUNNING = false;
let START = new Date();

// Runs a command and keeps track of when it finishes.
const newCmd = (cmd, cb) => {
  RUNNING = true;
  return exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`${error}`);
      return;
    }
    console.log(`${stdout}`);
    console.log(`${stderr}`);
    RUNNING = false;
    cb();
  });
};

// Waits until changes stop coming in for one second.
const waitForPause = callback => {
	const check = () => {
    const now = new Date();
		if(RUNNING || now - START < 1000){
			setTimeout(check, 20);
		} else {
			callback();
		}
	};
	check();
};

// Creates a static file server that can reload clients when a build completes.
// Watches files for changes and kicks off a build when there is a pause in changes.
module.exports = function(watchPlease, runPlease, staticPlease) {
  const watcher = chokidar.watch(watchPlease);
  watcher.on('ready', () => {
    // Wait until the initial scan is done, then start regenerating
    // whenever a file changes.
    watcher.on('all', () => {
      START = new Date();
      if (!WAITING) {
        WAITING = true;
        waitForPause(() => {
          console.log('BEGIN GENERATING SITE');
          WAITING = false;
          newCmd(runPlease, () => {
            console.log('DONE GENERATING SITE');
            reloadServer.reload();
          });
        });
      }
    });
  });

  const scriptInterceptor = interceptor((req, res) => ({
    // Only HTML responses will be intercepted 
    isInterceptable() {
      return /text\/html/.test(res.get('Content-Type'));
    },

    // Appends a script tag at the end of the response body 
    intercept(body, send) {
      const $document = cheerio.load(body);
      $document('body').append('<script src="/reload/reload-client.js"></script>');
      $document('body').append(`
        <script>
          var article = document.getElementsByTagName('ARTICLE')[0];
          var h1 = document.createElement('H1');
          var t1 = document.createTextNode('docObject');
          h1.appendChild(t1);
          var pre = document.createElement('PRE');
          pre.className = 'prettyprint lang-json';
          var t2 = document.createTextNode(JSON.stringify(docObject, null, '  '));
          pre.appendChild(t2);
          article.appendChild(h1);
          article.appendChild(pre);
        </script>
      `);
      send($document.html());
    }
  }));

  // Creates the static file server capable of reloading clients.
  const app = express();
  app.set('port', process.env.PORT || 3000)
  app.use('/reload', express.static(`${__dirname}/node_modules/reload/lib`));
  app.use(scriptInterceptor);
  app.use(express.static(staticPlease));
  const server = http.createServer(app);
  const reloadServer = reload(server, app);
  server.listen(app.get('port'), () => {
    console.log(`Web server listening on port ${app.get('port')}`);
  });
};

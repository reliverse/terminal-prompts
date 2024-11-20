import fs from "fs";

// @ts-nocheck

var term = require("terminal-kit").terminal;
term.cyan("Choose a file:\n");

var items = fs.readdirSync(process.cwd());

term.gridMenu(items, function (error, response) {
  term("\n").eraseLineAfter.green(
    "#%s selected: %s (%s,%s)\n",
    response.selectedIndex,
    response.selectedText,
    response.x,
    response.y,
  );
  process.exit();
});

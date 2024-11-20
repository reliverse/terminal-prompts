// @ts-nocheck

import Element from "./Element";
import BaseMenu from "./BaseMenu";
import ColumnMenuMulti from "./ColumnMenuMulti";
import Button from "./Button";

// @ts-nocheck
// Inherit from ColumnMenuMulti for common methods

function SelectListMulti(options) {
  // Clone options if necessary
  options = !options ? {} : options.internal ? options : Object.create(options);
  options.internal = true;

  if (!options.master || typeof options.master !== "object") {
    options.master = Object.assign({}, this.defaultOptions.master);
  } else {
    options.master = Object.assign(
      {},
      this.defaultOptions.master,
      options.master,
    );
  }

  if (options.content) {
    options.master.content = options.content;
  }

  if (!options.separator || typeof options.separator !== "object") {
    options.separator = Object.assign({}, this.defaultOptions.separator);
  } else {
    options.separator = Object.assign(
      {},
      this.defaultOptions.separator,
      options.separator,
    );
  }

  ColumnMenuMulti.call(this, options);

  this.showMenu = false;
  this.zIndexRef = this.zIndex; // Back-up for zIndex

  this.initPage();
  this.toggle(this.showMenu, options.noDraw);

  this.onClickOut = this.onClickOut.bind(this);

  this.on("clickOut", this.onClickOut);

  // Only draw if we are not a superclass of the object
  if (this.elementType === "SelectListMulti" && !options.noDraw) {
    this.draw();
  }
}

Element.inherit(SelectListMulti, ColumnMenuMulti);

SelectListMulti.prototype.defaultOptions = {
  buttonBlurAttr: { bgColor: "gray", color: "white", bold: true },
  buttonFocusAttr: { bgColor: "white", color: "black", bold: true },
  buttonDisabledAttr: {
    bgColor: "gray",
    color: "white",
    bold: true,
    dim: true,
  },
  buttonSubmittedAttr: { bgColor: "gray", color: "brightWhite", bold: true },
  turnedOnBlurAttr: { bgColor: "cyan" },
  turnedOnFocusAttr: { bgColor: "brightCyan", color: "gray", bold: true },
  turnedOffBlurAttr: { bgColor: "gray", dim: true },
  turnedOffFocusAttr: { bgColor: "white", color: "black", bold: true },

  master: {
    content: "select-list-multi",
    symbol: "▼",
    internalRole: "toggle",
  },
  separator: {
    content: "-",
    contentRepeat: true,
    internalRole: "separator",
  },
};

SelectListMulti.prototype.toggle = function (showMenu = null, noDraw = false) {
  var i, iMax;

  if (showMenu === null) {
    this.showMenu = !this.showMenu;
  } else {
    this.showMenu = !!showMenu;
  }

  for (i = 1, iMax = this.buttons.length; i < iMax; i++) {
    this.buttons[i].hidden = !this.showMenu;
  }

  // Adjust outputHeight, to avoid the list to be clickable when reduced
  this.outputHeight = this.showMenu ? this.pageHeight : 1;

  if (this.showMenu) {
    this.topZ();
  } else {
    this.restoreZ();
  }

  // Return now if noDraw is set, bypassing both drawing and focus
  if (noDraw) {
    return;
  }

  this.document.giveFocusTo(this.buttons[0]);

  this.outerDraw();
};

SelectListMulti.prototype.onButtonSubmit = function (
  buttonValue,
  action,
  button,
) {
  switch (button.internalRole) {
    case "previousPage":
      this.previousPage();
      break;
    case "nextPage":
      this.nextPage();
      break;
    case "toggle":
      this.toggle();

      // Submit when reducing
      if (!this.showMenu) {
        this.emit("submit", this.value, action, this, button);
      }
      break;
    default:
      this.emit("submit", this.value, action, this, button);
  }
};

SelectListMulti.prototype.onClickOut = function () {
  if (this.showMenu) {
    this.toggle(false);
    // We also submit when the menu is closed on click out
    this.emit("submit", this.value, undefined, this);
  }
};

SelectListMulti.prototype.getValue = function () {
  return this.value;
};

export default SelectListMulti;

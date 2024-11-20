import Element from "./Element.js";

// @ts-nocheck
const builtinBarChars = require("../spChars").bar;

function Bar(options) {
  // Clone options if necessary
  options = !options ? {} : options.internal ? options : Object.create(options);
  options.internal = true;

  Element.call(this, options);

  this.minValue = +options.minValue || 0;
  this.maxValue = options.maxValue !== undefined ? +options.maxValue || 0 : 1;
  this.value = +options.value || 0;

  if (this.value < this.minValue) {
    this.value = this.minValue;
  } else if (this.value > this.maxValue) {
    this.value = this.maxValue;
  }

  this.borderAttr = options.borderAttr || { bold: true };
  this.bodyAttr = options.bodyAttr || { color: "blue" };
  this.barChars = builtinBarChars.classic;

  if (typeof options.barChars === "object") {
    this.barChars = options.barChars;
  } else if (
    typeof options.barChars === "string" &&
    builtinBarChars[options.barChars]
  ) {
    this.barChars = builtinBarChars[options.barChars];
  }

  this.overTextFullAttr = options.overTextFullAttr || { bgColor: "blue" };
  this.overTextEmptyAttr = options.overTextEmptyAttr || { bgColor: "default" };

  // Only draw if we are not a superclass of the object
  if (this.elementType === "Bar" && !options.noDraw) {
    this.draw();
  }
}

Element.inherit(Bar);

Bar.prototype.preDrawSelf = function () {
  var index,
    x,
    fullCells,
    emptyCells,
    partialCellRate,
    fullContent,
    fullContentWidth = 0,
    emptyContent,
    emptyContentWidth = 0,
    noPartialCell = false,
    partialCell = null,
    innerSize = this.outputWidth - 2,
    rate = (this.value - this.minValue) / (this.maxValue - this.minValue);

  if (!rate || rate < 0) {
    rate = 0;
  } else if (rate > 1) {
    rate = 1;
  }

  fullCells = Math.floor(rate * innerSize);
  partialCellRate = rate * innerSize - fullCells;

  if (this.content) {
    if (partialCellRate < 0.5) {
      fullContent = Element.truncateContent(
        this.content,
        fullCells,
        this.contentHasMarkup,
      );
      fullContentWidth = Element.getLastTruncateWidth();
      if (fullContentWidth < this.contentWidth) {
        noPartialCell = true;
      }
    } else {
      fullContent = Element.truncateContent(
        this.content,
        fullCells + 1,
        this.contentHasMarkup,
      );
      fullContentWidth = Element.getLastTruncateWidth();

      if (
        fullContentWidth < this.contentWidth ||
        fullContentWidth === fullCells + 1
      ) {
        noPartialCell = true;
        fullCells++;
      }
    }
  }

  if (!noPartialCell && fullCells < innerSize) {
    if (this.barChars.body.length <= 2) {
      // There is no chars for partial cells
      if (partialCellRate >= 0.5) {
        fullCells++;
      }
    } else if (this.barChars.body.length === 3) {
      partialCell = this.barChars.body[1];
    } else if (this.barChars.body.length === 4) {
      partialCell = this.barChars.body[partialCellRate < 0.5 ? 1 : 2];
    } else {
      index = Math.floor(
        1.5 + partialCellRate * (this.barChars.body.length - 3),
      );
      partialCell = this.barChars.body[index];
    }
  }

  emptyCells = innerSize - fullCells - (partialCell ? 1 : 0);

  if (this.content && fullContentWidth < this.contentWidth) {
    emptyContent = Element.truncateContent(
      this.content.slice(fullContent.length),
      emptyCells,
      this.contentHasMarkup,
    );
    emptyContentWidth = Element.getLastTruncateWidth();
  }

  // Rendering...

  x = this.outputX;
  this.outputDst.put(
    {
      x: x++,
      y: this.outputY,
      attr: this.borderAttr,
      markup: true,
    },
    this.barChars.border[0],
  );

  if (fullContentWidth) {
    this.outputDst.put(
      {
        x: x,
        y: this.outputY,
        attr: this.overTextFullAttr,
        markup: true,
      },
      fullContent,
    );
    x += fullContentWidth;
  }

  if (fullCells - fullContentWidth > 0) {
    this.outputDst.put(
      {
        x: x,
        y: this.outputY,
        attr: this.bodyAttr,
        markup: true,
      },
      this.barChars.body[0].repeat(fullCells - fullContentWidth),
    );
    x += fullCells - fullContentWidth;
  }

  if (partialCell) {
    this.outputDst.put(
      {
        x: x++,
        y: this.outputY,
        attr: this.bodyAttr,
        markup: true,
      },
      partialCell,
    );
  }

  if (emptyContentWidth) {
    this.outputDst.put(
      {
        x: x,
        y: this.outputY,
        attr: this.overTextEmptyAttr,
        markup: true,
      },
      emptyContent,
    );
    x += emptyContentWidth;
  }

  if (emptyCells - emptyContentWidth > 0) {
    this.outputDst.put(
      {
        x: x,
        y: this.outputY,
        attr: this.bodyAttr,
        markup: true,
      },
      this.barChars.body[this.barChars.body.length - 1].repeat(
        emptyCells - emptyContentWidth,
      ),
    );
    x += emptyCells - emptyContentWidth;
  }

  this.outputDst.put(
    {
      x: x,
      y: this.outputY,
      attr: this.borderAttr,
      markup: true,
    },
    this.barChars.border[1],
  );
};

Bar.prototype.getValue = function () {
  return this.value;
};

Bar.prototype.setValue = function (value, internalAndNoDraw) {
  this.value = +value || 0;

  if (this.value < this.minValue) {
    this.value = this.minValue;
  } else if (this.value > this.maxValue) {
    this.value = this.maxValue;
  }

  if (!internalAndNoDraw) {
    this.draw();
  }
};

export default Bar;

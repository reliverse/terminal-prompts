import tree from "tree-kit";
import xterm from "./xterm.js";

// @ts-nocheck
const esc = tree.extend(null, Object.create(xterm.esc), {
  // Not supported...
  setClipboardLL: { na: true },
  requestClipboard: { na: true },

  // Cursor styles not supported
  blockCursor: { on: "", na: true },
  blinkingBlockCursor: { on: "", na: true },
  underlineCursor: { on: "", na: true },
  blinkingUnderlineCursor: { on: "", na: true },
  beamCursor: { on: "", na: true },
  blinkingBeamCursor: { on: "", na: true },

  // Not capable, fallback to mouseButton
  mouseDrag: { on: "\x1b[?1000h", off: "\x1b[?1000l", fb: true },
  mouseMotion: { on: "\x1b[?1000h", off: "\x1b[?1000l", fb: true },

  requestColor: { on: "%D", na: true }, // not capable
});

/* Key Mapping */

const keymap = tree.extend(null, Object.create(xterm.keymap), {
  F1: "\x1b[11~",
  F2: "\x1b[12~",
  F3: "\x1b[13~",
  F4: "\x1b[14~",

  //SHIFT_F1: '\x1b[25~' ,	// no difference with F11
  //SHIFT_F2: '\x1b[26~' ,	// no difference with F12
  SHIFT_F3: "\x1b[25~",
  SHIFT_F4: "\x1b[26~",
  SHIFT_F5: "\x1b[28~",
  SHIFT_F6: "\x1b[29~",
  SHIFT_F7: "\x1b[31~",
  SHIFT_F8: "\x1b[32~",
  SHIFT_F9: "\x1b[33~",
  SHIFT_F10: "\x1b[34~",
  SHIFT_F11: "\x1b[23$",
  SHIFT_F12: "\x1b[24$",

  CTRL_F1: "\x1b[11^",
  CTRL_F2: "\x1b[12^",
  CTRL_F3: "\x1b[13^",
  CTRL_F4: "\x1b[14^",
  CTRL_F5: "\x1b[15^",
  CTRL_F6: "\x1b[17^",
  CTRL_F7: "\x1b[18^",
  CTRL_F8: "\x1b[19^",
  CTRL_F9: "\x1b[20^",
  CTRL_F10: "\x1b[21^",
  CTRL_F11: "\x1b[23^",
  CTRL_F12: "\x1b[24^",

  //CTRL_SHIFT_F1: '\x1b[11^' ,	// no difference with CTRL_F11
  //CTRL_SHIFT_F2: '\x1b[12^' ,	// no difference with CTRL_F12
  CTRL_SHIFT_F3: "\x1b[25^",
  CTRL_SHIFT_F4: "\x1b[26^",
  CTRL_SHIFT_F5: "\x1b[28^",
  CTRL_SHIFT_F6: "\x1b[29^",
  CTRL_SHIFT_F7: "\x1b[31^",
  CTRL_SHIFT_F8: "\x1b[32^",
  CTRL_SHIFT_F9: "\x1b[33^",
  CTRL_SHIFT_F10: "\x1b[34^",
  CTRL_SHIFT_F11: "\x1b[23@",
  CTRL_SHIFT_F12: "\x1b[24@",
});

const handler = Object.create(xterm.handler);

export default {
      esc: esc,
      keymap: keymap,
      handler: handler,
      support: {
        deltaEscapeSequence: true,
        "256colors": false,
        "24bitsColors": false, // DEPRECATED
        trueColor: false,
      },
      colorRegister: require("../colorScheme/xterm.json"),
    };

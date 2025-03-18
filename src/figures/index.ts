// process.env dot-notation access prints:
// Property 'TERM' comes from an index signature, so it must be accessed with ['TERM'].ts(4111)
/* eslint dot-notation: ["off"] */
import process from "node:process";

function isUnicodeSupported() {
  if (process.platform !== "win32") {
    return process.env.TERM !== "linux"; // Linux console (kernel)
  }

  return (
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    Boolean(process.env.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
    process.env.ConEmuTask === "{cmd::Cmder}" || // ConEmu and cmder
    process.env.TERM_PROGRAM === "Terminus-Sublime" ||
    process.env.TERM_PROGRAM === "vscode" ||
    process.env.TERM === "xterm-256color" ||
    process.env.TERM === "alacritty" ||
    process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm"
  );
}

// Ported from figures
const common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "█",
  squareDarkShade: "▓",
  squareMediumShade: "▒",
  squareLightShade: "░",
  squareTop: "▀",
  squareBottom: "▄",
  squareLeft: "▌",
  squareRight: "▐",
  squareCenter: "■",
  bullet: "●",
  dot: "․",
  ellipsis: "…",
  pointerSmall: "›",
  triangleUp: "▲",
  triangleUpSmall: "▴",
  triangleDown: "▼",
  triangleDownSmall: "▾",
  triangleLeftSmall: "◂",
  triangleRightSmall: "▸",
  home: "⌂",
  heart: "♥",
  musicNote: "♪",
  musicNoteBeamed: "♫",
  arrowUp: "↑",
  arrowDown: "↓",
  arrowLeft: "←",
  arrowRight: "→",
  arrowLeftRight: "↔",
  arrowUpDown: "↕",
  almostEqual: "≈",
  notEqual: "≠",
  lessOrEqual: "≤",
  greaterOrEqual: "≥",
  identical: "≡",
  infinity: "∞",
  subscriptZero: "₀",
  subscriptOne: "₁",
  subscriptTwo: "₂",
  subscriptThree: "₃",
  subscriptFour: "₄",
  subscriptFive: "₅",
  subscriptSix: "₆",
  subscriptSeven: "₇",
  subscriptEight: "₈",
  subscriptNine: "₉",
  oneHalf: "½",
  oneThird: "⅓",
  oneQuarter: "¼",
  oneFifth: "⅕",
  oneSixth: "⅙",
  oneEighth: "⅛",
  twoThirds: "⅔",
  twoFifths: "⅖",
  threeQuarters: "¾",
  threeFifths: "⅗",
  threeEighths: "⅜",
  fourFifths: "⅘",
  fiveSixths: "⅚",
  fiveEighths: "⅝",
  sevenEighths: "⅞",
  line: "─",
  lineBold: "━",
  lineDouble: "═",
  lineDashed0: "┄",
  lineDashed1: "┅",
  lineDashed2: "┈",
  lineDashed3: "┉",
  lineDashed4: "╌",
  lineDashed5: "╍",
  lineDashed6: "╴",
  lineDashed7: "╶",
  lineDashed8: "╸",
  lineDashed9: "╺",
  lineDashed10: "╼",
  lineDashed11: "╾",
  lineDashed12: "−",
  lineDashed13: "–",
  lineDashed14: "‐",
  lineDashed15: "⁃",
  lineVertical: "│",
  lineVerticalBold: "┃",
  lineVerticalDouble: "║",
  lineVerticalDashed0: "┆",
  lineVerticalDashed1: "┇",
  lineVerticalDashed2: "┊",
  lineVerticalDashed3: "┋",
  lineVerticalDashed4: "╎",
  lineVerticalDashed5: "╏",
  lineVerticalDashed6: "╵",
  lineVerticalDashed7: "╷",
  lineVerticalDashed8: "╹",
  lineVerticalDashed9: "╻",
  lineVerticalDashed10: "╽",
  lineVerticalDashed11: "╿",
  lineDownLeft: "┐",
  lineDownLeftArc: "╮",
  lineDownBoldLeftBold: "┓",
  lineDownBoldLeft: "┒",
  lineDownLeftBold: "┑",
  lineDownDoubleLeftDouble: "╗",
  lineDownDoubleLeft: "╖",
  lineDownLeftDouble: "╕",
  lineDownRight: "┌",
  lineDownRightArc: "╭",
  lineDownBoldRightBold: "┏",
  lineDownBoldRight: "┎",
  lineDownRightBold: "┍",
  lineDownDoubleRightDouble: "╔",
  lineDownDoubleRight: "╓",
  lineDownRightDouble: "╒",
  lineUpLeft: "┘",
  lineUpLeftArc: "╯",
  lineUpBoldLeftBold: "┛",
  lineUpBoldLeft: "┚",
  lineUpLeftBold: "┙",
  lineUpDoubleLeftDouble: "╝",
  lineUpDoubleLeft: "╜",
  lineUpLeftDouble: "╛",
  lineUpRight: "└",
  lineUpRightArc: "╰",
  lineUpBoldRightBold: "┗",
  lineUpBoldRight: "┖",
  lineUpRightBold: "┕",
  lineUpDoubleRightDouble: "╚",
  lineUpDoubleRight: "╙",
  lineUpRightDouble: "╘",
  lineUpDownLeft: "┤",
  lineUpBoldDownBoldLeftBold: "┫",
  lineUpBoldDownBoldLeft: "┨",
  lineUpDownLeftBold: "┥",
  lineUpBoldDownLeftBold: "┩",
  lineUpDownBoldLeftBold: "┪",
  lineUpDownBoldLeft: "┧",
  lineUpBoldDownLeft: "┦",
  lineUpDoubleDownDoubleLeftDouble: "╣",
  lineUpDoubleDownDoubleLeft: "╢",
  lineUpDownLeftDouble: "╡",
  lineUpDownRight: "├",
  lineUpBoldDownBoldRightBold: "┣",
  lineUpBoldDownBoldRight: "┠",
  lineUpDownRightBold: "┝",
  lineUpBoldDownRightBold: "┡",
  lineUpDownBoldRightBold: "┢",
  lineUpDownBoldRight: "┟",
  lineUpBoldDownRight: "┞",
  lineUpDoubleDownDoubleRightDouble: "╠",
  lineUpDoubleDownDoubleRight: "╟",
  lineUpDownRightDouble: "╞",
  lineDownLeftRight: "┬",
  lineDownBoldLeftBoldRightBold: "┳",
  lineDownLeftBoldRightBold: "┯",
  lineDownBoldLeftRight: "┰",
  lineDownBoldLeftBoldRight: "┱",
  lineDownBoldLeftRightBold: "┲",
  lineDownLeftRightBold: "┮",
  lineDownLeftBoldRight: "┭",
  lineDownDoubleLeftDoubleRightDouble: "╦",
  lineDownDoubleLeftRight: "╥",
  lineDownLeftDoubleRightDouble: "╤",
  lineUpLeftRight: "┴",
  lineUpBoldLeftBoldRightBold: "┻",
  lineUpLeftBoldRightBold: "┷",
  lineUpBoldLeftRight: "┸",
  lineUpBoldLeftBoldRight: "┹",
  lineUpBoldLeftRightBold: "┺",
  lineUpLeftRightBold: "┶",
  lineUpLeftBoldRight: "┵",
  lineUpDoubleLeftDoubleRightDouble: "╩",
  lineUpDoubleLeftRight: "╨",
  lineUpLeftDoubleRightDouble: "╧",
  lineUpDownLeftRight: "┼",
  lineUpBoldDownBoldLeftBoldRightBold: "╋",
  lineUpDownBoldLeftBoldRightBold: "╈",
  lineUpBoldDownLeftBoldRightBold: "╇",
  lineUpBoldDownBoldLeftRightBold: "╊",
  lineUpBoldDownBoldLeftBoldRight: "╉",
  lineUpBoldDownLeftRight: "╀",
  lineUpDownBoldLeftRight: "╁",
  lineUpDownLeftBoldRight: "┽",
  lineUpDownLeftRightBold: "┾",
  lineUpBoldDownBoldLeftRight: "╂",
  lineUpDownLeftBoldRightBold: "┿",
  lineUpBoldDownLeftBoldRight: "╃",
  lineUpBoldDownLeftRightBold: "╄",
  lineUpDownBoldLeftBoldRight: "╅",
  lineUpDownBoldLeftRightBold: "╆",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
  lineUpDoubleDownDoubleLeftRight: "╫",
  lineUpDownLeftDoubleRightDouble: "╪",
  lineCross: "╳",
  lineBackslash: "╲",
  lineSlash: "╱",
};

const specialMainSymbols = {
  tick: "✔",
  info: "ℹ",
  warning: "⚠",
  cross: "✘",
  squareSmall: "◻",
  squareSmallFilled: "◼",
  circle: "◯",
  circleFilled: "◉",
  circleDotted: "◌",
  circleDouble: "◎",
  circleCircle: "ⓞ",
  circleCross: "ⓧ",
  circlePipe: "Ⓘ",
  radioOn: "◉",
  radioOff: "◯",
  checkboxOn: "☒",
  checkboxOff: "☐",
  checkboxCircleOn: "ⓧ",
  checkboxCircleOff: "Ⓘ",
  pointer: "❯",
  triangleUpOutline: "△",
  triangleLeft: "◀",
  triangleRight: "▶",
  lozenge: "◆",
  lozengeOutline: "◇",
  hamburger: "☰",
  smiley: "㋡",
  mustache: "෴",
  star: "★",
  play: "▶",
  nodejs: "⬢",
  oneSeventh: "⅐",
  oneNinth: "⅑",
  oneTenth: "⅒",
};

const specialFallbackSymbols = {
  tick: "√",
  info: "i",
  warning: "‼",
  cross: "×",
  squareSmall: "□",
  squareSmallFilled: "■",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(○)",
  circleCross: "(×)",
  circlePipe: "(│)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[×]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(×)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "∆",
  triangleLeft: "◄",
  triangleRight: "►",
  lozenge: "♦",
  lozengeOutline: "◊",
  hamburger: "≡",
  smiley: "☺",
  mustache: "┌─┐",
  star: "✶",
  play: "►",
  nodejs: "♦",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10",
};

export const mainSymbols = { ...common, ...specialMainSymbols };
export const fallbackSymbols: Record<string, string> = {
  ...common,
  ...specialFallbackSymbols,
};

const shouldUseMain = isUnicodeSupported();
const figures = shouldUseMain ? mainSymbols : fallbackSymbols;
export default figures;

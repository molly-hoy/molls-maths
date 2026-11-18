/* ==========================================================================
   SymbolPad: a box of maths symbol buttons under an answer box
   --------------------------------------------------------------------------
   Clicking a button types that symbol into the answer box at the cursor
   (the flashing line), so students don't have to hunt for √, ², π or −
   on their keyboard. It's shown when the student clicks "Symbols".

   Which buttons appear depends on the kind of answer, so only symbols the
   marking can actually read are offered:
     numeric    → − . / ( ) √ π ^
     fraction   → − / and a space (for mixed numbers like 1 1/2)
     percentage → − . %
     expression → x² x³ ^ ( ) √ π × ÷ / − and the letters x y

   Each button is { show, insert, label, cursor }:
     show   what is written on the button
     insert the text that goes into the answer box
     label  what a screen reader says
     cursor (optional) where the cursor ends up, counted back from the end
            of the inserted text: √() with cursor 1 leaves it inside the
            brackets, ready to type the number
   ========================================================================== */
import { useState } from "react";
import styles from "./SymbolPad.module.css";

const B = (show, insert, label, cursor = 0) => ({ show, insert, label, cursor });

const MINUS = B("−", "−", "minus");
const POINT = B(".", ".", "decimal point");
const SLASH = B("a/b", "/", "fraction (divide)");
const OPEN = B("(", "(", "open bracket");
const CLOSE = B(")", ")", "close bracket");
const ROOT = B("√", "√()", "square root", 1);
const PI = B("π", "π", "pi");
const POWER = B("xⁿ", "^", "to the power of");
const SQUARE = B("x²", "²", "squared");
const CUBE = B("x³", "³", "cubed");
const TIMES = B("×", "×", "times");
const DIVIDE = B("÷", "÷", "divide");
const PLUS = B("+", "+", "plus");

const PADS = {
  numeric: [MINUS, POINT, SLASH, OPEN, CLOSE, ROOT, PI, POWER],
  fraction: [MINUS, SLASH, B("␣", " ", "space, for a mixed number like 1 1/2")],
  percentage: [MINUS, POINT, B("%", "%", "percent")],
  expression: [SQUARE, CUBE, POWER, ROOT, PI, OPEN, CLOSE, PLUS, MINUS, TIMES, DIVIDE, SLASH, B("x", "x", "x"), B("y", "y", "y")],
};

export function hasSymbolPad(type) {
  return Boolean(PADS[type]);
}

/* inputRef: the answer box. value/onChange: its text, as in AnswerInput. */
export default function SymbolPad({ type, inputRef, value, onChange, id }) {
  const [open, setOpen] = useState(false);
  const buttons = PADS[type];
  if (!buttons) return null;

  // Put the text in at the cursor, replacing anything highlighted
  const insert = (button) => {
    const box = inputRef.current;
    const text = value ?? "";
    const start = box?.selectionStart ?? text.length;
    const end = box?.selectionEnd ?? text.length;
    const next = text.slice(0, start) + button.insert + text.slice(end);
    onChange(next);
    // After React updates the box, move the cursor to the right place
    const caret = start + button.insert.length - button.cursor;
    requestAnimationFrame(() => {
      if (!box) return;
      box.focus();
      box.setSelectionRange(caret, caret);
    });
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`btn btn-quiet btn-small ${styles.toggle}`}
        aria-expanded={open}
        aria-controls={`${id}-symbols`}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true" className={styles.toggleIcon}>√x</span> {open ? "Hide symbols" : "Symbols"}
      </button>
      {open && (
        <div id={`${id}-symbols`} className={styles.pad} role="group" aria-label="Maths symbols">
          {buttons.map((b) => (
            <button
              key={b.label}
              type="button"
              className={styles.key}
              aria-label={`Insert ${b.label}`}
              title={b.label}
              // Stop the button stealing the cursor position from the answer box
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insert(b)}
            >
              {b.show}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

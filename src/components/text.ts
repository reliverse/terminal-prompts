import type { TSchema, Static } from "@sinclair/typebox";

import { Value } from "@sinclair/typebox/value";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import type { PromptOptions, State } from "~/types";

import { colorize } from "~/utils/colorize";
import { symbol } from "~/utils/states";
import { applyVariant } from "~/utils/variant";

export async function textPrompt<T extends TSchema>(
  options: PromptOptions<T>,
): Promise<Static<T>> {
  const {
    title,
    hint,
    validate,
    default: defaultValue,
    schema,
    titleColor,
    titleTypography,
    message,
    msgColor,
    msgTypography,
    titleVariant,
    msgVariant,
    defaultColor,
    defaultTypography,
    state: initialState = "initial",
  } = options;

  let state: State = initialState;
  let answer: string = defaultValue || "";
  let errorMessage = "";

  const rl = readline.createInterface({ input, output });

  function renderPrompt() {
    const figure = symbol(state);
    const coloredTitle = colorize(title, titleColor, titleTypography);
    const promptText = `${figure} ${applyVariant([coloredTitle], titleVariant)}`;

    console.clear();
    console.log(promptText);
    if (hint) {
      console.log(`(${hint})`);
    }
    if (answer) {
      console.log(`Answer: ${answer}`);
    }
    if (state === "error") {
      console.log(`Error: ${errorMessage}`);
    }
  }

  // Initial render
  renderPrompt();

  rl.on("line", async (input) => {
    const key = input.trim();

    if (key === "") {
      return;
    } // Skip empty lines

    if (key === "enter") {
      // Perform validation
      let isValid = true;
      let error = "";

      if (schema) {
        isValid = Value.Check(schema, answer);
        if (!isValid) {
          const errors = [...Value.Errors(schema, answer)];
          error = errors[0]?.message || "Invalid input.";
        }
      }

      if (validate && isValid) {
        const validation = await validate(answer);
        if (validation !== true) {
          isValid = false;
          error =
            typeof validation === "string" ? validation : "Invalid input.";
        }
      }

      if (isValid) {
        state = "submit";
        rl.close();
      } else {
        state = "error";
        errorMessage = error;
        renderPrompt();
      }
    } else if (key === "backspace") {
      answer = answer.slice(0, -1);
      renderPrompt();
    } else {
      answer += key;
      renderPrompt();
    }
  });

  return new Promise<Static<T>>((resolve) => {
    rl.on("close", () => {
      resolve(answer as Static<T>);
    });
  });
}

import type { TSchema, Static } from "@sinclair/typebox";

import { Value } from "@sinclair/typebox/value";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import type { PromptOptions, PromptState, State } from "~/types";

import { colorize } from "~/utils/colorize";
import { symbol } from "~/utils/symbols";
import { applyVariant } from "~/utils/variant";

export async function textPrompt<T extends TSchema>(
  options: PromptOptions<T>,
  currentState: PromptState = {
    id: "",
    state: "initial",
    symbol: symbol("S_MIDDLE", "initial"),
    value: undefined,
  },
): Promise<Static<T>> {
  const {
    title,
    hint,
    validate,
    default: defaultValue = "",
    schema,
    titleColor,
    titleTypography,
    message,
    msgColor,
    msgTypography,
    titleVariant,
    msgVariant,
    state = "initial",
  } = options;

  const rl = readline.createInterface({ input, output });

  const updateState = (newState: State) => {
    currentState.state = newState;
    currentState.symbol = symbol("S_MIDDLE", newState);
  };

  updateState(state);

  const promptText = [
    applyVariant([colorize(title, titleColor, titleTypography)], titleVariant),
    message
      ? applyVariant([colorize(message, msgColor, msgTypography)], msgVariant)
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const question = `${currentState.symbol} ${promptText}${hint ? ` (${hint})` : ""}${
    defaultValue ? ` [${defaultValue}]` : ""
  }: `;

  const validateAnswer = async (answer: string): Promise<string | true> => {
    if (schema && !Value.Check(schema, answer)) {
      return [...Value.Errors(schema, answer)][0]?.message || "Invalid input.";
    }
    if (validate) {
      const validation = await validate(answer);
      return validation === true ? true : validation || "Invalid input.";
    }
    return true;
  };

  while (true) {
    const answer = (await rl.question(question)) || defaultValue;

    if (!answer) continue;

    const validation = await validateAnswer(answer);
    if (validation === true) {
      currentState.value = answer;
      rl.close();
      return answer as Static<T>;
    } else {
      updateState("error");
      console.log(`${currentState.symbol} ${validation}`);
    }
  }
}

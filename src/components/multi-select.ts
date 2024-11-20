import type { PromptOptions } from "~/components/prompt.js";

import Prompt from "~/components/prompt.js";

type MultiSelectOptions<T extends { value: any }> = {
  options: T[];
  initialValues?: T["value"][];
  required?: boolean;
  cursorAt?: T["value"];
} & PromptOptions<MultiSelectPrompt<T>>;
export default class MultiSelectPrompt<
  T extends { value: any },
> extends Prompt {
  options: T[];
  cursor = 0;

  private get _value() {
    return this.options[this.cursor].value;
  }

  private toggleAll() {
    const allSelected = this.value.length === this.options.length;
    this.value = allSelected ? [] : this.options.map((v) => v.value);
  }

  private toggleValue() {
    const selected = this.value.includes(this._value);
    this.value = selected
      ? this.value.filter((value: T["value"]) => value !== this._value)
      : [...this.value, this._value];
  }

  constructor(opts: MultiSelectOptions<T>) {
    super(opts, false);

    this.options = opts.options;
    this.value = [...(opts.initialValues ?? [])];
    this.cursor = Math.max(
      this.options.findIndex(({ value }) => value === opts.cursorAt),
      0,
    );
    this.on("key", (char) => {
      if (char === "a") {
        this.toggleAll();
      }
    });

    this.on("cursor", (key) => {
      switch (key) {
        case "left":
        case "up":
          this.cursor =
            this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
          break;
        case "down":
        case "right":
          this.cursor =
            this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
          break;
        case "space":
          this.toggleValue();
          break;
      }
    });
  }
}

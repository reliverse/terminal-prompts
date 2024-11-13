import type { TSchema } from "@sinclair/typebox";

import type { PromptTypeDeprecated } from "~/types/dev";
import type {
  ChoiceOptions,
  ColorName,
  TypographyName,
  Variant,
} from "~/types/prod";

export type StateDeprecated =
  | "initial"
  | "active"
  | "completed"
  | "cancel"
  | "submit"
  | "error";

export type PromptOptionsWithState<T extends TSchema = any> = {
  type: PromptTypeDeprecated;
  id: string;
  title: string;
  stateCompletedTitle?: string;
  titleColor?: ColorName;
  titleTypography?: TypographyName;
  titleVariant?: Variant;
  message?: string;
  msgColor?: ColorName;
  msgTypography?: TypographyName;
  msgVariant?: Variant;
  hint?: string;
  validate?: (value: any) => boolean | string | Promise<boolean | string>;
  default?: any;
  defaultColor?: ColorName;
  defaultTypography?: TypographyName;
  choices?: ChoiceOptions[];
  schema?: T;
  variantOptions?: {
    box?: {
      limit?: number;
    };
  };
  repeatBarAfterStart?: number;
  action?: () => Promise<void>;
  state?: StateDeprecated;
};

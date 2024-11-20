import type { InquirerReadline } from "../type/inquirer.js";

import { withPointer, effectScheduler } from "./hook-engine.js";

export function useEffect(
  cb: (rl: InquirerReadline) => void | (() => void),
  depArray: readonly unknown[],
): void {
  withPointer((pointer) => {
    const oldDeps = pointer.get();
    const hasChanged =
      !Array.isArray(oldDeps) ||
      depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));

    if (hasChanged) {
      effectScheduler.queue(cb);
    }
    pointer.set(depArray);
  });
}

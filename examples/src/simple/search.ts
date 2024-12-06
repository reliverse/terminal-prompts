import relinka from "@reliverse/relinka";
import { promises as fs } from "node:fs";
import path from "node:path";
import * as url from "node:url";

import { search } from "~/components/prompts/index.js";

async function fileExists(filepath: string) {
  return fs.access(filepath).then(
    () => true,
    () => false,
  );
}

async function isDirectory(path: string) {
  if (await fileExists(path)) {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  }

  return false;
}

const root = path.dirname(
  path.join(url.fileURLToPath(import.meta.url), "../../.."),
);

const demo = async () => {
  let answer;

  // Demo: Search results from an API
  answer = await search({
    message: "Select an npm package",

    // @ts-expect-error - TODO: fix ts
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    source: async (input = "relinka", { signal }) => {
      const response = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(input)}&size=20`,
        { signal },
      );
      const data = (await response.json()) as {
        objects: readonly { package: { name: string; description: string } }[];
      };

      return data.objects.map((pkg) => ({
        name: pkg.package.name,
        value: pkg.package.name,
        description: pkg.package.description,
      }));
    },
  });
  relinka.log("Answer:", answer);

  // Demo: Using the search prompt as an autocomplete tool.
  answer = await search({
    message: "Select a file",

    // @ts-expect-error - TODO: fix ts
    source: async (term = "") => {
      let dirPath = path.join(root, term);
      while (!(await isDirectory(dirPath)) && dirPath !== root) {
        dirPath = path.dirname(dirPath);
      }

      const files = await fs.readdir(dirPath, { withFileTypes: true });
      return files
        .sort((a, b) => {
          if (a.isDirectory() === b.isDirectory()) {
            return a.name.localeCompare(b.name);
          }

          // Sort dir first
          return a.isDirectory() ? -1 : 1;
        })
        .map((file) => ({
          name:
            path.relative(root, path.join(dirPath, file.name)) +
            (file.isDirectory() ? "/" : ""),
          value: path.join(file.parentPath, file.name),
        }))
        .filter(({ value }) => value.includes(term));
    },
    validate: async (filePath: string) => {
      if (!(await fileExists(filePath)) || (await isDirectory(filePath))) {
        return "You must select a file";
      }
      return true;
    },
  });
  relinka.log("Answer:", answer);
};

if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    await demo();
  }
}

export default demo;

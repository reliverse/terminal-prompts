import type { TreeItem } from "~/components/modules/helpers/tree";

import { relinka, createRelinka } from "~/components/modules";
import { formatTree } from "~/components/modules/helpers/tree";
import { errorHandler } from "~/utils/errors";

import { reporterDemo } from "./reliverse/experiments/utils";

async function detailedExample() {
  // reporter
  relinka.box("=== reporter ===");

  const reporterType = await relinka.prompt("Pick a reporter type.", {
    type: "select",
    options: [
      { label: "basic", value: "basic" },
      { label: "fancy", value: "fancy" },
      { label: "nothing", value: "nothing" },
    ] as const,
    initial: "nothing",
  });

  if (reporterType === "basic") {
    reporterDemo({
      fancy: false,
    });
  } else if (reporterType === "fancy") {
    reporterDemo({
      fancy: true,
    });
  }

  // box
  relinka.box("=== box ===");

  relinka.box(`I am the default banner`);

  relinka.box({
    title: "Box with options",
    message: `I am a banner with different options`,
    style: {
      padding: 1,
      borderColor: "magenta",
      borderStyle: "double-single-rounded",
    },
  });

  relinka.box({
    title: "Update available for `relinka`",
    message: `\`v1.0.2\` → \`v2.0.0\`\n\nRun \`npm install -g relinka\` to update`,
    style: {
      padding: 2,
      borderColor: "yellow",
      borderStyle: "rounded",
    },
  });

  // prompt
  relinka.box("=== prompt ===");

  const name = await relinka.prompt("What is your name?", {
    placeholder: "Not sure",
    initial: "java",
  });

  const confirmed = await relinka.prompt("Do you want to continue?", {
    type: "confirm",
  });

  const projectType = await relinka.prompt("Pick a project type.", {
    type: "select",
    options: [
      "JavaScript",
      "TypeScript",
      { label: "CoffeeScript", value: "CoffeeScript", hint: "oh no" },
    ],
    initial: "TypeScript",
  });

  const tools = await relinka.prompt("Select additional tools.", {
    type: "multiselect",
    required: false,
    options: [
      { value: "eslint", label: "ESLint", hint: "recommended" },
      { value: "prettier", label: "Prettier" },
      { value: "gh-action", label: "GitHub Action" },
    ],
    initial: ["eslint", "prettier"],
  });

  relinka.start("Creating project...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  relinka.success("Project created!");

  // json
  relinka.box("=== json ===");

  const jsonRelinka = createRelinka({
    reporters: [
      {
        log: (logObj) => {
          console.log(JSON.stringify(logObj));
        },
      },
    ],
  });

  jsonRelinka.log("foo bar");

  // mock
  relinka.box("=== mock ===");

  function mockFn(type) {
    if (type === "info") {
      return function (this: { log: (msg: string) => void }) {
        this.log("(mocked fn with info tag)");
      };
    }
  }

  relinka.info("before");
  relinka.mockTypes((type) => {
    if (type === "info") {
      return () => relinka.log("(mocked fn with info tag)");
    }
  });

  relinka.mockTypes(mockFn);

  const tagged = relinka.withTag("newTag");

  relinka.log("log is not mocked!");

  relinka.info("Dont see me");
  tagged.info("Dont see me too");

  // no-width
  relinka.box("=== no-width ===");

  const noWidthRelinka = createRelinka({
    formatOptions: { columns: 0 },
  });
  noWidthRelinka.info("Foobar");
  const scoped = noWidthRelinka.withTag("test: no-width");
  scoped.success("Foobar");

  // with-width
  relinka.box("=== with-width ===");

  const withWidthRelinka = createRelinka({
    formatOptions: { columns: 10 },
  });
  withWidthRelinka.info("Foobar");
  const scopedWithWidth = withWidthRelinka.withTag("test: with-width");
  scopedWithWidth.success("Foobar");

  // pause
  relinka.box("=== pause ===");

  const c1 = relinka.withTag("foo");
  const c2 = relinka.withTag("bar");

  relinka.log("before pause");

  // @ts-expect-error TODO: fix ts
  c2.pause();

  c1.log("C1 is ready");
  c2.log("C2 is ready");

  setTimeout(() => {
    // @ts-expect-error TODO: fix ts
    relinka.resume();
    relinka.log("Yo!");
  }, 1000);

  // raw
  relinka.box("=== raw ===");

  relinka.log('relinka.log({ message: "hello" })');
  // Prints "hello"
  relinka.log({ message: "hello" });

  relinka.log('relinka.log.raw({ message: "hello" })');
  // Prints "{ message: 'hello' }"
  relinka.log.raw({ message: "hello" });

  // sample
  relinka.box("=== sample ===");

  relinka.warn("A new version of relinka is available: 3.0.1");
  relinka.error(new Error("This is an example error. Everything is fine!"));
  relinka.info("Using relinka 3.0.0");
  relinka.start("Building project...");
  relinka.success("Project built!");
  await relinka.prompt("Deploy to the production?", {
    type: "confirm",
  });

  // spam
  relinka.box("=== spam ===");

  function waitFor(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function spam({ count, delay }) {
    for (let i = 0; i < count; i++) {
      await waitFor(delay);
      relinka.log(`Spam (Count: ${count} Delay: ${delay} ms)`);
    }
  }

  (async () => {
    await spam({ count: 2, delay: 10 });
    await spam({ count: 20, delay: 10 });
    await spam({ count: 20, delay: 0 });
    await spam({ count: 80, delay: 10 });
  })();

  // special
  relinka.box("=== special ===");

  relinka.error({
    message: "Foobar",
  });

  relinka.log({
    AAA: "BBB",
  });

  // relinka.log(relinka)

  relinka.log("%d", 12);

  relinka.error({ type: "CSSError", message: "Use scss" });

  relinka.error(undefined, null, false, true, Number.NaN);

  relinka.log("We can `monospace` keyword using grave accent character!");

  relinka.log(
    "We can also _underline_ words but not_this or this should_not_be_underlined!",
  );

  // Nonstandard error
  const { message, stack } = new Error("Custom Error!");
  relinka.error({ message, stack });

  // Circular object
  const a = { foo: 1, bar: undefined as any };
  a.bar = a;
  relinka.log(a);

  // Multiline
  relinka.log("`Hello` the `JS`\n`World` and `Beyond`!");

  // spinner
  relinka.box("=== spinner ===");

  relinka.start("Creating project...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  relinka.success("Project created!");

  // tree
  relinka.box("=== tree ===");

  function treeDemo() {
    const keywords = [
      "console",
      "logger",
      "reporter",
      "elegant",
      "cli",
      "universal",
      "unified",
      "prompt",
      "clack",
      "format",
      "error",
      "stacktrace",
    ];

    relinka.log(formatTree(keywords));

    relinka.log(
      formatTree(keywords, {
        color: "cyan",
        prefix: "  |  ",
      }),
    );

    relinka.log(
      formatTree(
        [
          {
            text: "relinka",
            color: "green",
          },
          {
            text: "logger",
          },
        ].map(
          (item) =>
            ({
              text: ` ${item.text}`,
              color: item.color,
            }) as TreeItem,
        ),
        {
          color: "gray",
        },
      ),
    );

    // Deep tree
    relinka.log(
      formatTree([
        {
          text: "format",
          color: "red",
        },
        {
          text: "relinka",
          color: "yellow",
          children: [
            {
              text: "logger",
              color: "green",
              children: [
                {
                  text: "reporter",
                  color: "cyan",
                },
                {
                  text: "test",
                  color: "magenta",
                  children: ["nice tree"],
                },
              ],
            },
            {
              text: "reporter",
              color: "bold",
            },
            "test",
          ],
        },
      ]),
    );
  }

  treeDemo();

  // wrap-all
  relinka.box("=== wrap-all ===");

  function fooWrapAll() {
    console.info("console foo");
    process.stderr.write("called from stderr\n");
  }

  relinka.wrapAll();
  fooWrapAll();
  relinka.restoreAll();
  fooWrapAll();

  // wrap-console

  function fooWrapConsole() {
    console.info("foo");
    console.warn("foo warn");
  }

  function _trace() {
    console.trace("foobar");
  }
  function trace() {
    _trace();
  }

  fooWrapConsole();
  relinka.wrapConsole();
  fooWrapConsole();
  trace();
  relinka.restoreConsole();
  fooWrapConsole();
  trace();

  // wrap-std
  relinka.box("=== wrap-std ===");

  function fooWrapStd() {
    console.info("console foo");
    process.stdout.write("called from stdout foo\n");
    process.stderr.write("called from stderr foo\n");
  }

  relinka.wrapStd();
  fooWrapStd();
  relinka.restoreStd();
  fooWrapStd();
}

await detailedExample().catch((error) => errorHandler(error));

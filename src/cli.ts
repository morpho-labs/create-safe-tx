#!/usr/bin/env node
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import dotenv from "dotenv";

import { createSafeTx } from "./scripts";

dotenv.config();

const optionDefinitions = [
  {
    name: "help",
    alias: "h",
    type: Boolean,
    description: "Display this usage guide.",
  },
  {
    name: "provider",
    type: String,
    description: "The JSON RPC endpoint URL to use as RPC provider.",
    typeLabel: "<url>",
    defaultOption: true,
    defaultValue: process.env.FOUNDRY_ETH_RPC_URL || process.env.RPC_URL,
  },
];

const options = commandLineArgs(optionDefinitions) as {
  help: boolean;
  provider: string;
};

const help = commandLineUsage([
  {
    header: "Create Safe Tx",
    content:
      "📜 Useful script to build complex Gnosis Safe transactions involving Gnosis Multisend and/or Zodiac modifiers",
  },
  {
    header: "Options",
    optionList: optionDefinitions,
  },
  {
    content: "Project home: {underline https://github.com/morpho-labs/create-safe-tx}",
  },
]);

if (options.help) console.log(help);
else createSafeTx(options.provider);

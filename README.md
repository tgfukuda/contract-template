# Contract Template with foundry and hardhat

This repository contains basic tools and setup for contract development like

- Ethereum dev toolkit: [foundry](https://book.getfoundry.sh/) and [hardhat](https://hardhat.org/).
- Linter: [eslint](https://eslint.org/) for ts and [solhint](https://github.com/protofire/solhint).
- Formatter: [prettier](https://prettier.io/)

Read the official docs for more details.

There're predefined [npm scripts](./package.json) for convenience.

## Requirements

foundry is neccessary.
Follow the [official setup guide](https://book.getfoundry.sh/getting-started/installation)

## Ethereum dev tools

We can use foundry and hardhat by need, but this template assumes

- solidity dependencies are resolved by foundry's manner.
- remappings.txt used for remappings. DO NOT set them with another way. See [hardhat.config.ts](./hardhat.config.ts).

### Install

```bash
$ git submodule update --init --recursive # retrieve solidity deps
$ npm install # install ts deps
```

## Linter

eslint and solhint are awsome dev tools to avoid silly mistakes.

This template doesn't include [slither](https://github.com/crytic/slither),
but it's also a wonderful static analyzer.
You can install it by yourself.

## Formatter

prettier is basically a code formatter for js,
but it's also able to format solidity with [plugin](https://github.com/prettier-solidity/prettier-plugin-solidity).

## Useful Resources

- https://github.com/foundry-rs/hardhat-foundry-template
- https://medium.com/mixbytes/a-practical-guide-to-smart-contract-security-tools-part-2-slither-6a7158d4bfe8
- https://github.com/OpenZeppelin/openzeppelin-contracts
- https://github.com/argentlabs/argent-contracts

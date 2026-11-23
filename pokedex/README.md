# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Functions
- Card recognition and scanning: Upload your card image directly from your files, the name of the file must have the structure "name - set" for more accuracy in the search with the API or just the name of the pokemon but if the API don't response in time maybe it matches the pokemon but not the set.

- Personal Inventory: Automatically stores card metadata including rarity, type and estimated price.
  the deck collection and organization: tag and assign registered cards to custom decks or collections

- Trading and Valuation: extracts real time  market pricing in USD directly from TCGplayer via the Pokemon TCG API
Trade status: toggle individual status for the trading dispo. (unavailable or available)
Transaction history: log and personal tracking of your purchases and sales against your current inventory or externals (you write the name of the card, amount of sale/buy in USD and if you just buy or sell a card. The date is auto.)

- Authentication & Internationalization:
  - Google SSO, you can login with your google acc
  - Custom multilingual support: (en/es) BUilt-in translation engine powered by react context (contextLanguage) without relying on external translation API 

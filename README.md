# Currency Convertor

A small React + TypeScript app (Vite) that converts amounts between currencies using publicly available exchange rates.

This repository contains a minimal, single-page currency converter built with modern tooling and a focus on clarity and small surface area for learning.

## Functionality & behavior

- Convert an amount from one currency to another by selecting source and target currencies and entering an amount.
- Live exchange rates are fetched from the `@fawazahmed0/currency-api` JSON files served via the jsDelivr CDN (no API key required).
- The app shows loading state while rates are fetched and displays an error message if the network request fails.
- When the base currency changes, the hook clears previous rates and refetches for the new base currency.

## Key files and components

- `src/hooks/useCurrency.ts`: Custom hook that fetches exchange rates for a given base currency and exposes `{ rates, isLoading, error }`.
- `src/components/formElements/CurrencyCombobox.tsx`: UI for selecting a currency.
- `src/components/formElements/InputBox.tsx`: Input element for entering amounts.
- `src/components/home/Home.tsx`: Main conversion UI (wires the comboboxes and input together).
- `src/main.tsx` and `src/routers/router.tsx`: App bootstrap and routing.

## Technologies

- React 19 + TypeScript
- Vite (dev server + build)
- Tailwind CSS for styling
- React Router for basic routing
- Native `fetch` used inside a custom hook to retrieve JSON rates from the CDN

## Project structure (high level)

```
src/
  components/        # UI pieces (Layout, Header, Footer, Home, form elements)
  hooks/             # `useCurrency` custom hook
  assets/            # images and static assets
  main.tsx           # app entry
  routers/router.tsx # routing
```

## How it fetches exchange rates

The hook requests a JSON file for the requested base currency, for example:

```
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{BASE}.json
```

Replace `{BASE}` with a currency code (e.g. `usd`, `eur`). The returned JSON contains mappings from currency code to exchange rate.

If you want to change the data source, edit `src/hooks/useCurrency.ts`.

## Local development

Requirements: Node.js (current LTS recommended) and `npm`.

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Available npm scripts (from `package.json`): `dev`, `build`, `preview`, `lint`.

## Notes & customization

- No API key is required because the app consumes the public JSON files via jsDelivr. For production apps, consider using a stable paid API or caching layer.
- The hook uses an `AbortController` to cancel in-flight requests when the component unmounts or the base currency changes.

## Contribution

Contributions are welcome. Open an issue or submit a pull request with clear intent and tests where appropriate.



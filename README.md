# Stock / Index App

This project contains both a vanilla JavaScript version and a React version of the Stock/Index data fetching application.

## Versions

### Original (Vanilla JavaScript)
- **File:** `index.html`
- Open directly in a browser to use
- No build process required

### React Version
- **Entry:** `index-react.html`
- Uses React with Vite for modern development

## React Version Setup

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Features

- Switch between Stock and Index modes
- Fetch data from Colab or Hugging Face backends
- View backend output or extract tables in frontend view
- Date picker for historical data
- Multiple request types for comprehensive data analysis

## Backend Configuration

- **Colab:** Enter your Gradio backend URL
- **HF:** Uses the default `eshan6704/backend` endpoint

## Usage

1. Select mode (Stock or Index)
2. Enter symbol (e.g., ITC for stocks, NIFTY 50 for indices)
3. Choose request type from dropdown
4. Select date
5. Choose backend source (Colab/HF)
6. Click Fetch to retrieve data
7. Toggle between Backend and Frontend views

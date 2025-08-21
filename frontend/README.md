# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# EcoTrack Frontend

## Setup

1. Place `index.html` in the project root (`ecotrack-frontend/`).
2. Install dependencies: `npm install`
3. Create `.env` with `REACT_APP_API_URL=http://your-backend-url`
4. Run: `npm run dev`
5. Build: `npm run build`
6. Preview: `npm run preview`

## Features

- Responsive UI with Tailwind CSS.
- Navbar for navigation (Home, Dashboard, Chatbot, Login).
- Homepage with intro and CTAs.
- Mock API for demo; update `utils/api.js` for real backend.
- Voice queries require microphone permission.

## Debugging

- If blank screen, check console (F12) for errors.
- Ensure `index.html` is in root with `<div id="root">`.
- Verify `tailwind.css` is imported in `main.jsx`.
- Run `npm install` if dependencies are missing.
- Clear Vite cache: `rm -rf node_modules/.vite`.
- Check `SavingsLineChart.jsx` and `CarbonPieChart.jsx` for Chart.js errors.

For backend integration, update `utils/api.js` to remove mocks.

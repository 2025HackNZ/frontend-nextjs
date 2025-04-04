/** @type {import('tailwindcss').Config} */
/**
 * @see {@link https://tailwindcss.com/docs/customizing-colors#naming-your-colors}
 * Observation. We use css variables instead instead of hard coding the
 * values so that we can have multiple themes.
 */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        // body: "rgb(var(--color-body) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        // highlight: "rgb(var(--color-highlight) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        // accent: "rgb(var(--color-accent) / <alpha-value>)",
        // danger: "rgb(var(--color-danger) / <alpha-value>)",
        // success: "rgb(var(--color-success) / <alpha-value>)",
        // info: "rgb(var(--color-info) / <alpha-value>)",
        // warning: "rgb(var(--color-warning) / <alpha-value>)",
        // disabled: "rgb(var(--color-disabled) / <alpha-value>)",
        // backdrop: "rgb(var(--color-backdrop) / 0.85)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

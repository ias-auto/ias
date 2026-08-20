module.exports = {
  content: ['./src/**/*.jsx'],
  safelist: [
    { pattern: /(bg|text|border)-(blue|amber|emerald|red|slate)-(50|100|200|300|400|500|600|700|800|900)/ },
  ],
  theme: { extend: {} },
  plugins: [],
};

export default {
  name: "ChemWise",
  baseAPIUrl: import.meta.env.DEV
    ? "http://localhost:3000/"
    : "https://chemwise-backend.vercel.app/",
};

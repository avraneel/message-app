import app from "./app.js";

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${process.env.PORT}...`);
});

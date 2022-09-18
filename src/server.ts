import app from "./app";

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
});
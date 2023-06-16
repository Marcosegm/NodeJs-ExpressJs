const express = require("express")
const cors = require("cors")
const routerApi = require("./routes")
const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/error.handler")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ["http://localhost:3000/"]
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("No permitido"))
    }
  }
}
app.use(cors(options))

app.get('/api',(req, res) => {
  res.send("Hola mi server en express")
})

app.get('/api/nueva-ruta',(req, res) => {
  res.send("Hola soy un endPoint")
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

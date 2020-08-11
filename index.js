import express from 'express';

const app = express()
app.listen(3000, () => {
  console.log("serv on 3k")
})

import root_cmd from './roots/cmd/index'
root_cmd(app);
import root_mongo from './roots/mongo/index'
root_mongo(app);


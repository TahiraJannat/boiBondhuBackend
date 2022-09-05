const express = require("express");
const router = express.Router();

const apiHomeMessage = ` <div>
   Available Endpoints(GET)
  
   <a href="api/rglData"><li>rgl data</li> </a>
   <a href="api/user"><li>All User</li></a>
   <a href="api/user/id/1"><li>User By Id</li></a>
   <a href="api/user/name/Name1"><li>User By Name</li></a>
  
  </div>`;

/* GET home page. */
router.get("/", (req, res, next) => {
  //   res.json({ message: "ok" });
  res.send(apiHomeMessage);
});

module.exports = router;

// app.get("/", (req, res) => {
//   res.send(apiHomeMessage);
// });

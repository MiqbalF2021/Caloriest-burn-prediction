const History = require("../Models/History");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userHistory = (req, res) => {
    const token = req.cookies.token
    if (!token) {
      return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
       return res.json({ status: false })
      } else {
        const history = await History.findById(data.id)
        if (history) return res.json({ status: true, calori: history.caloriesBurn, date: history.date, duration: history.duration, exercise: history.exercise})
        else return res.json({ status: false })
      }
    })
  }
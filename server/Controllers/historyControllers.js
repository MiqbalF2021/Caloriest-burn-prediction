const History = require("../Models/History");

// Fungsi untuk menyimpan riwayat aktivitas
const saveHistory = async (req, res) => {
  const { userId, caloriesBurn, duration, exercise } = req.body;

  try {
    const newHistory = new History({
      userId,
      caloriesBurn,
      duration,
      exercise,
      date: new Date() // Simpan tanggal dan waktu saat ini
    });

    await newHistory.save();

    res.status(201).json({ 
        message: "History saved successfully", 
        data: newHistory // Mengembalikan data yang baru disimpan
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save history" });
    }
};

const getHistory = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const history = await History.find({ userId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};


module.exports = {
  saveHistory,
  getHistory,
};

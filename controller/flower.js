const db = require("../config/db");

exports.getAllFlowers = (req, res) => {
  db.query("SELECT * FROM flowers", (error, result, fields) => {
    if (error) {
      console.log("Error retrieving flowers: ", error);
      return res.status(500).json({ error: "Internam Server Error" });
    }
    res.json(result);
    // console.log(fields)
  });
};

exports.createFlower = (req, res) => {
  const { name, color, price } = req.body;
  db.query(
    "INSERT INTO flowers(name,color,price) values (?,?,?)",
    [name, color, price],
    (error, result) => {
      if (error) {
        console.log("Error creating flower: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(result);
      res.json({
        message: "Flower created successfully",
        flowerId: result.insertId,
      });
    }
  );
};

exports.getFlowerById = (req, res) => {
  const flowerId = req.params.id;
  db.query(
    "SELECT * FROM flowers WHERE id = ?",
    [flowerId],
    (error, result) => {
      if (error) {
        console.log("Error retrieving flower: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Flower not found" });
      }
      res.json(result[0]);
    }
  );
};

exports.updateFlowerById = (req, res) => {
  const flowerId = req.params.id;
  const { name, color, price } = req.body;
  db.query(
    "UPDATE flowers SET name = ?, color = ?, price = ? where id = ?",
    [name, color, price, flowerId],
    (error) => {
      if (error) {
        console.log("Error update flower: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ massage: "Flower update succssfull" });
    }
  );
};

exports.deleteFlower = (req, res) => {
  const flowerId = req.params.id;
  db.query("DELETE FROM flowers WHERE id = ?", [flowerId], (error) => {
    if (error) {
      console.log("Error deleting flower: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ massage: "Flower delete succssfull" });
  });
};

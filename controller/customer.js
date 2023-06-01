const db = require("../config/db");

exports.getAllCustomers = (req, res) => {
  db.query("SELECT * FROM customers;", (error, result, fields) => {
    if (error) {
      console.log("Error retrieving customers: ", error);
      return res.status(500).json({ error: "Internam Server Error" });
    }
    res.json(result);
  });
};

exports.getCustomerById = (req, res) => {
  const customerId = req.params.id;
  db.query(
    "SELECT * FROM customers WHERE id = ?;",
    [customerId],
    (error, result) => {
      if (error) {
        console.log("Error retrieving customers: ", error);
        return res.status(500).json({ error: "Internam Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(result[0]);
    }
  );
};

exports.postCustomer = (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO customers(name,email) VALUES(?,?)",
    [name, email],
    (error, result) => {
      if (error) {
        console.log("Error retrieving customers: ", error);
        return res.status(500).json({ error: "Internam Server Error" });
      }
      console.log(result);
      res.json({
        message: "Customer created successfully",
        customerId: result.insertId,
      });
    }
  );
};

exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const { name, email } = req.body;
  db.query(
    "UPDATE customers SET name = ?, email = ? WHERE id = ?",
    [name, email, customerId],
    (error) => {
      if (error) {
        console.log("Error retrieving customers: ", error);
        return res.status(500).json({ error: "Internam Server Error" });
      }
      res.json({ massage: "customer update succssfull" });
    }
  );
};

exports.deleteCustomer = (req,res) => {
    const customerId = req.params.id;
    db.query(
        "DELETE FROM customers WHERE id = ?",
        [customerId],
        (error) => {
            if(error){
                console.log("Error retrieving customers: ", error);
                return res.status(500).json({ error: "Internam Server Error" });
            }
            res.json({ massage: "Customer delete succssfull" });
        }
    )
}
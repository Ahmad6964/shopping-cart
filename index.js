const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

var app = express();
const bodyparser = require("body-parser");
const { request } = require("express");
app.use(bodyparser.json());
app.use(cors());
// Localhost 3000

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db1",
});
const a = (err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
};
mysqlConnection.connect(a);


// CART CRUD ------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// post in cart
app.post("/cart", (req, res) => {
  const data = {
    user_id: req.body.user_id,
    pro_id: req.body.pro_id,
    pro_qty: req.body.pro_qty,
    status: req.body.status,

  };
  mysqlConnection.query(
    `INSERT INTO cart (user_id,pro_id,pro_qty,status) VALUES (${data.user_id},${data.pro_id},${data.pro_qty},${data.status})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// insert into cart By user id
app.post("/cart/user/:user_id", (req, res) => {
  const data = {
    pro_id: req.body.pro_id,
    pro_qty: req.body.pro_qty,
    status: req.body.status,

  };
  mysqlConnection.query(
    `INSERT INTO cart (user_id,pro_id,pro_qty,status) VALUES (${req.params.user_id},${data.pro_id},${data.pro_qty},${data.status})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});


// Get All cart

app.get("/cart", (req, res) => {
  mysqlConnection.query('SELECT * FROM cart',(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('succeed')}    
          else
          console.log(err);
      })
    })



  // Get cart Data of dpacific user id
app.get('/cart/user/:id',(req,res)=>{  
  mysqlConnection.query( `SELECT * FROM cart WHERE user_id = ${req.params.id}`,(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('succeed')}    
          else
          console.log(err);
      })

})

  // Get cart Data of Spacific cart id
app.get('/cart/:id',(req,res)=>{  
  mysqlConnection.query( `SELECT * FROM cart WHERE cart_id = ${req.params.id}`,(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('succeed')}    
          else
          console.log(err);
      })

})

// Delete cart data by user id
app.delete('/cart/user/:id',(req,res)=>{  
  mysqlConnection.query( `DELETE  FROM cart WHERE user_id = ${req.params.id}`,(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('succeed')}    
          else
          console.log(err);
      })

})

// Delate cart data by cart id

app.delete('/cart/:id',(req,res)=>{  
  mysqlConnection.query( `DELETE  FROM cart WHERE cart_id = ${req.params.id}`,(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('succeed')}    
          else
          console.log(err);
      })

})

// put data by user id

app.put("/cart/:id", (req, res) => {
  const data = {
    pro_id: req.body.pro_id,
    pro_qty: req.body.pro_qty,
    status: req.body.status,

  };
  mysqlConnection.query(
    `UPDATE cart SET pro_id=${data.pro_id},pro_qty=${data.pro_qty},status=${data.status} WHERE cart_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});
 

// Orders CRUD ------------------------------>

// Get All Order

    app.get("/orders", (req, res) => {

    
      mysqlConnection.query(`SELECT * FROM orders`,(err, rows, fields)=>{
          if(!err)
          {res.send(rows);
              console.log('succeed')}    
              else
              console.log(err);
          })
        });


 // Get order  data by specific order_id

 app.get('/orders/:id',(req,res)=>{  
  mysqlConnection.query( `SELECT * FROM orders WHERE order_id = ${req.params.id}`,(err, rows, fields)=>{
      if(!err)
      {res.send(rows);
          console.log('succeed')}    
          else
          console.log(err);
      })

})

// put product by order_id

app.put("/orders/order/:id", (req, res) => {

  console.log(req.body.user_id,req.body.order_status,req.body. order_address,req.body. order_amount,)
  const data = {
    user_id: req.body.user_id,
    order_status: req.body.order_status,
    order_address: req.body. order_address,
    order_amount: req.body. order_amount,

  };
  mysqlConnection.query(
    `UPDATE orders SET user_id=${data.user_id},order_status=${data.order_status},order_address="${data.order_address}",order_amount=${data.order_amount} WHERE order_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});


// insert into orders By user id
app.post("/orders", (req, res) => {
  const data = {
    user_id: req.body.user_id,
    order_status: req.body.order_status,
    order_address: req.body.order_address,
    order_amount: req.body.order_amount,

  };
  mysqlConnection.query(
    `INSERT INTO orders ( user_id, order_status,order_address, order_amount) VALUES (${data.user_id},${data.order_status},"${data.order_address}",${data. order_amount})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});
 



























app.listen(4000, console.log("Express server is running at port no: 4000"));

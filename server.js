const express = require('express')
const bodyparser = require('body-parser')
const app = express()
var cors = require('cors')

const mysql = require('mysql')

const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database:'expensetracker'
    }
)


con.connect((err)=>{
    if(err) throw err
    console.log("Database Connected.....!!!!")
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}
))
app.use(cors())

app.get('/getList',(req,res)=>{
    console.log("In get request")
    let sql = "select * from expenseinfo"
    let query = con.query(sql,(err, result)=>{
        if(err) throw err
        console.log(result)
        res.send(result)
    })
})

app.get('/sumcount',(req,res)=>{
   
    let sql = "select count(amount) as count, sum(amount) as sum from expenseinfo;"
    let query = con.query(sql,(err, result)=>{
        if(err) throw err
        console.log(result)
        res.send(result)
    })
})

app.post('/saveExpense',(req,res)=>{
    let category = req.body.category
    let title = req.body.title
    let amount =req.body.amount.toString()

    let sql = `insert into expenseinfo(title, category, amount) values("${title}", "${category}","${amount}")`
    let query = con.query(sql,(err, result)=>{
        if(err) throw err
        res.send(result)
    })
})

// var sql = "create table expenseinfo(id int AUTO_INCREMENT PRIMARY KEY, title varchar(200), category varchar(200), amount varchar(20))"
// con.query(sql, (err, result)=>{
//     if(err) throw err
//     console.log("Table Created")
// })

app.listen(5000,()=>{
    console.log("Server started on port 5000......")
})
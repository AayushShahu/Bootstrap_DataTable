
import mysql from 'mysql';
import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';


const app = express();

app.use(express.static(path.join(__dirname, 'node_modules/datatables.net/js/')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname, 'node_modules/datatables/media/')));

app.use(bodyparser.urlencoded({extended:false}));

app.get('/',(req, res) => {
   res.sendFile( __dirname + "/" + "./ResponsiveTableBootstrap.html" );
})

app.get('/process_get' ,(req,res) =>{
	var con = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "aayush@123",
		database: "mentor_assignment"
  });

  

	con.connect((err) =>{
		if (err) throw err;
		console.log("Connected");
	});
		con.query("SELECT * FROM details",(err, result, fields) => {
			if (err) throw err;
			res.send(result);
		});
});

app.post('/process_post' ,(req,res) =>{
  var con1 = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "aayush@123",
    database: "mentor_assignment"
  });
  

	con1.connect((err) => {
		if (err) throw err;
		console.log("Connected");
	});

		var q="insert into details(name,place,animal,thing)values('"+req.body.name+"','"+req.body.place+"','"+req.body.animal+"','"+req.body.thing+"')";
		con1.query(q,(err, result, fields) => {
			if (err) throw err;
			console.log(result);
			res.redirect("/");
		});

	});

app.get('/delete/:id' ,(req,res) =>{
	var con2 = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "aayush@123",
		database: "mentor_assignment"
  });


	con2.connect((err) =>{
		if (err) throw err;
		console.log("Connected");
	});
	var q="delete from details where id="+req.params.id;
		con2.query(q,(err, result) => {
			if (err) throw err;
			console.log(result);
			res.redirect("/");
		});

});




app.listen(8080, function(){
  console.log("Server Started at 8080");
});


// export default Express_dataTable;

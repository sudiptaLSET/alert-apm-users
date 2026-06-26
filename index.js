import express from 'express';
import "dotenv/config";
import alertRouter from './routes/alert.js';

const app = express();
const PORT = process.env.PORT;

const userList = [
    { name: "Rahul Shaw", number: "8420176164",email:"rahulshaw@lifesciencetrust.com" , days:3},
    { name: "Sudipta", number: "7044789194",email:"sudipta@lifesciencetrust.com", days:5 },
];

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('server is running');
});

app.get('/getUser',(req,res)=>{
  console.log("OKOK")
  res.status(200).json(userList)
})

app.use('/alert', alertRouter);

app.listen(PORT || 8000, () => {
  console.log(`Server listening on port ${PORT}`);
});



import express from 'express';
import { createClient } from 'redis';

const client = createClient()
const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

client.connect().then(()=>{
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}).catch((err)=>{
    console.log(err);
})

app.post('/submit',async(req, res)=>{
    const {problemId, userId, code } = req.body;
    console.log(problemId, userId, code);
    //also save to db
    try {
        await client.rPush("problemSubmission",JSON.stringify({problemId, userId, code }));
        res.status(200).json({message:"Submission successful"});
        
    } catch (error) {
        res.status(400).json({message:"Submission error"});
        
    }
})
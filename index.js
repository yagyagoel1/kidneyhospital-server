const express =  require("express");
const app = express();
const data =[{
    name : "Yagya",
    kidney : [
        {healthy:false}
    ]
}];
app.use(express.json());
app.get("/", function (req, res) {
    const xyzKidneys = data[0].kidney;
    const numberOfKidneys = xyzKidneys.length;
    let healthycount  = 0;
    for(let i =0;i<xyzKidneys.length;i++)
    {
        if(xyzKidneys[i].healthy==true)
        healthycount +=1;
    }
    
    const noOfUnhealthyKidneys = numberOfKidneys - healthycount;
  
    res.json({
      numberOfKidneys,
      noOfUnhealthyKidneys,
      healthycount
    });
});
  

app.post("/",function(req,res)
{
    const ishealthy = req.body.ishealthy;
    data[0].kidney.push({
        healthy :ishealthy
    })
    res.json({
        respone : "received"
    })
})
app.put("/", (req, res) => {
  console.log("PUT request received"); // Add this line for logging

  // Mark all kidneys as healthy
  data[0].kidney.forEach((kidney) => {
    kidney.healthy = true;
  });

  res.json({
    response: "All kidneys marked as healthy"
  });
});
app.delete("/",(req,res)=>{
    let atleastoneunhealthy=false;
    for(let i=0;i<data[0].kidney.length;i++)
    {
        if(data[0].kidney[i].healthy==false)
        {
            atleastoneunhealthy =true;
            data[0].kidney.splice(i,1);
            i--;//change in the size of array
        }
    }
    if(atleastoneunhealthy)
    res.json({
    msg :"all unhealthy kidney removed"});

    else
    
    res.status(411).json({
        msg : "wrong input no unhealthy kidney"
    });
});

app.listen(3000,()=>{console.log("server is listening on port 3000")
});
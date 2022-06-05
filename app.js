const Exp=require('express')
const  Mng=require('mongoose')
const bdyp=require('body-parser')

var app=Exp()
app.use(bdyp.urlencoded({extended:true}))
app.use(bdyp.json())
Mng.connect("mongodb+srv://mzc_mca:qwerty.1@cluster0.weiqp.mongodb.net/receipeDB",{UseNewUrlParser:true})
var mdel=Mng.model("receipetb",new Mng.Schema(
      {
            title:String,
            ctgry:String,
            desc:String,
            shnme:String


      }
))
app.use((req, res, next) => { 
      res.setHeader("Access-Control-Allow-Origin", "*");  
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
      next(); });
 app.post("/api/add",(req,res)=>{
            var data=req.body
            const schemcall=new mdel(data)
            schemcall.save((error,data)=>{
                  if(error)
                  {
                        res.send({"data":error})
                  }
                  else{
                        res.send({"data":data})
                  }
            })
            })   
            app.get("/api/view",(req,res)=>{
                  mdel.find((error,data)=>{
                        if(error)
                        {      
                              res.send({"error":error})
                        }
                        else{
                              res.send(data)
                        }
                  })
            }) 
            app.post("/api/delete",(req,res)=>{
                  var ddata=req.body
                  mdel.findByIdAndDelete(ddata,(error,data)=>{
                       
                         if(error)
                         {      
                               res.send({"data":error})
                         }
                         else{
                                  res.send(data)
                        }
                  })
            })  
            app.post("/api/search",(req,res)=>{
                  var gdata=req.body
                  mdel.find(gdata,(error,data)=>{
                        if(error)
                        {      
                              res.send({"error":error})
                        }
                        else{
                              res.send(data)
                        }
                  })
            })        
   app.listen(4001,()=>{
                  console.log('running')
            })
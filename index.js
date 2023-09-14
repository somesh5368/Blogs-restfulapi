const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
 const methodOverride = require("method-override");



app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

let blogs = [
    {
        id: uuidv4(),
        name: "Elon Musk",
        caption: "Money and brain.",
        link: "https://static1.businessinsider.com/image/56046a5bdd0895c2028b461e-1689-1267/rtx1b282.jpg"
    },
    {   
        id: uuidv4(),
        name: "Ratan Tata",
        caption: "Great Human Being",
        link: "https://th.bing.com/th/id/R.4b38e6053b05ff3a008da3108df0de21?rik=pVvoYvR6JvFpZA&riu=http%3a%2f%2fcdn.thestorypedia.com%2fimages%2f2016%2f08%2f1471416609_tata_0.jpg%3fv%3d107&ehk=7KMLM4d9etbIcKkPYNS50Rtuc0nDV7JVUvY975h7QfU%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        id: uuidv4(),
        name: "Shradha",
        caption:"Favourite Teacher",
        link: "https://media.licdn.com/dms/image/D4D22AQGiZBPJ6O9Pog/feedshare-shrink_800/0/1685723775758?e=1697068800&v=beta&t=GxubhJoOLP2bssKc0FoIFOBqhHyRFiD6t8sknqAcZ3A"
    }
];


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`The listening port : ${port}`);
});


app.get("/blogs",(req,res)=>{
    console.log("this is running");
    res.render("index.ejs",{blogs})
})

app.get("/blogs/new",(req,res)=>{

    res.render("new.ejs")
})

app.post("/blogs",(req,res)=>{
    let {link,caption,name}=(req.body)
    let id = uuidv4();
    blogs.push({link,caption,name,id});
    res.redirect("blogs");
    console.log(blogs)
})

app.get("/blogs/:id",(req,res)=>{
    let {id}= req.params;
   let blog = blogs.find((p)=> id===p.id);
    console.log(blog);
    res.render("show.ejs",{blog})
})

app.get("/blogs/:id/edit",(req,res)=>{
    let {id}= req.params;
    let blog = blogs.find((p)=> id===p.id);
    res.render("edit.ejs",{blog})
});

app.patch("/blogs/:id",(req,res)=>{
    let {id}= req.params;
    let newContent = req.body.caption;
    let blog = blogs.find((p)=> id===p.id);
    blog.caption = newContent;
    console.log(blog);
    res.redirect("/blogs")
});

app.delete("/blogs/:id",(req,res)=>{
    let {id}= req.params;
    blogs = blogs.filter((p)=> id!==p.id);
    res.redirect("/blogs");

})
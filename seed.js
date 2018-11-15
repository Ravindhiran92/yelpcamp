var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment   =require("./models/comment");
var data=[
      {
      name:"chillngg",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNnIpuJjwqH9VXPkBVQ79VyzNdvbDfZ3cHsvEF3srHap0BKM9Yw",
      description:"Thatzz an awesome"
      },

    {
      name:"Dudeeee",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgp7lXYXWLH2k6zy7uODrnOPTHc7kbB2Vt00rAyUlLyNnKpU0VTg",
      description:"Thatzz an clear view"
    },
       {
      name:"Pokemon",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTse4cOSBW9LevrhH9pbey1g4EEk5zErgYOjkfuWYp0Cfmf6JW0",
      description:"Pikaaa pikaaa"
      }
];
function seedDB(){
      Campground.remove({},function(err){
      if(err){
            console.log(err);
            
      }
            console.log("removed");
                // for add
data.forEach(function(seed){
      Campground.create(seed,function(err,campground){
            if(err){
                  console.log(err);
            }else{
                  console.log("added the campgrounds");
                  // comment
                  Comment.create(
                        {
                        text:"Had agraet dayy",
                        author:"Sunil"
                  },function(err,comment){
                        if(err){
                              console.log(err);
                        }else{
                              campground.comments.push(comment);
                              campground.save(comment);
                              console.log("created the comments");
                        }
                  });
            }
      });
});
      
});


      
}

module.exports=seedDB;
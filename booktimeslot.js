const userId = document.getElementById('userId');
const time1 = document.getElementById('parkstart');
const time2 = document.getElementById('parkend');

const book= document.getElementById('Book');
const database = firebase.database();

const rootRef = database.ref('park')

//checking time 
time1.addEventListener("click",blurred);

function blurred(){
   var id=time1.value;
    var ref = firebase.database().ref('park');
ref.once('value',function(snapshot) {
snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(id === childData.book_start)
        {
            alert("Booking cannot be made for this arrival hour! Please change time");
            reset();
            
        }  
        else{
            document.getElementById("parkstart").style.backgroundColor = "#90EE90";
        }
    })   
}); //refonce
};


time2.addEventListener("click",endingtime);

function endingtime(){
   var id=time2.value;
    var ref = firebase.database().ref('park');
ref.once('value',function(snapshot) {
snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(id === childData.book_start)
        {
            alert("Booking cannot be made for this departure hour! Please change time");
            reset();
            
        }  
        else{
            document.getElementById("parkend").style.backgroundColor = "#90EE90";
        }
    })   
}); //refonce
};



//Reset button to clear form fields
function reset(){
    document.getElementById("bform").reset();
   // document.getElementById("parkstart").reset();
    //style.backgroundColor = "#d6c28a";
}




//Book button 
book.addEventListener('click', (e)=>{
e.preventDefault();
var t1=time1.value
var t2=time2.value
if(t1===t2)
{
    alert("Arrival and departure time cannot be the same! Please change time");
    reset();
}
else if(t1>t2)
{
alert("starting time cannot be less than end");
reset();
}
else{
const autoId=rootRef.push().key
database.ref('/park/'+userId.value).set({
//for token generation----->rootRef.child(autoId).set({
book_start:time1.value,
book_end:time2.value
});
}
});




book.onclick=function validateform() {
  var x = document.forms["bform"]["userId"].value;
  var y = document.forms["bform"]["parkstart"].value;
  var z = document.forms["bform"]["parkend"].value;
  if (x == "") {
    alert("User Id must be filled out");
    return false;
  }
  if (y=="")
  {
  alert("Parking hrs must be filled out");
  return false;
  }
  if (z=="")
  {
  alert("Departing hrs must be filled out");
  return false;
  }

else{
//

var b=document.getElementById('userId').value,url='https://mark2site.web.app/myq.html?userId='+encodeURIComponent(b);
document.location.href= url;
}
};




//query based call for the data
rootRef.orderByKey().on('value',snapshot =>{
    console.log(snapshot.val());
    
});
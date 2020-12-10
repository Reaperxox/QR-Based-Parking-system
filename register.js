const userId=document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const mobile= document.getElementById('mob');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
const genqrBtn = document.getElementById('genqrBtn');
const pass=document.getElementById('repwd');
const database = firebase.database();
document.getElementById("hid").style.visibility="hidden"
const rootRef = database.ref('users')

//checking for unique username
userId.addEventListener("blur",blurred);
function blurred(){
   var id=userId.value;
    var ref = firebase.database().ref("users");
ref.once('value',function(snapshot) {
snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        if(id === key)
        {
            alert("This username already exists! Please change");
            reset();
            return true;
        }  
        else{
            document.getElementById("userId").style.backgroundColor = "#90EE90";
        }
    })   
});
};
//confirming passwords
pass.addEventListener("blur",check);
function check(){
	hid=document.getElementById("hid");
	if(document.getElementById("pwd").value === pass.value)
	{
		hid.style.visibility="visible";
		hid.style.color="green";
	}
    else
	{
            hid.innerHTML= "Passwords do not match!";
			hid.style.visibility="visible";
			hid.style.color="red";
			hid.focus();
    }   
};
//Reset button to clear form fields
function reset(){
    document.getElementById("register").reset();
    document.getElementById("userId").style.backgroundColor = "#d6c28a";
}
// Add button with auto id generation
addBtn.addEventListener('click', (e)=>{
e.preventDefault();
//const autoId=rootRef.push().key
database.ref('/users/'+userId.value).set({
    //for token generation----->rootRef.child(autoId).set({
   first_name: firstName.value,
   last_name: lastName.value,
    age:age.value,
	mobile:mob.value,
	passwrd :pass.value
});
alert("User Added!");
window.location.assign("./index.html");
});
/*Add update button
updateBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const newData={
        age:age.value,
        first_name:firstName.value,
        last_name: lastName.value
    };
   const updates={};
    updates['/users/'+userId.value]=newData;
    updates['/super-users/'+userId.value]=newData;
    database.ref().update(updates);
});
// remove button code
removeBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    rootRef.child(userId.value).remove()
    .then(()=>{
        window.alert('user removed from database');
    })
    .catch(err =>{
        console.error(error);
        
    });
});
*/
//query based call for the data
rootRef.orderByKey().on('value',snpashot =>{
    console.log(snpashot.val());
    
});
/*genqrBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    varr= new QRCode(document.getElementById("qrcode"));
    varr.makeCode(userId);
        
    });*/


const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');


const database = firebase.database();

const rootRef = database.ref('users')
// Add button with auto id generation
addBtn.addEventListener('click', (e)=>{
e.preventDefault();
const autoId=rootRef.push().key
database.ref('/users/'+userId.value).set({
    //for token generation----->rootRef.child(autoId).set({
   first_name: firstName.value,
   last_name: lastName.value,
    age:age.value
});
});

addBtn.onclick=function(){
location.href= "newpage.html"
;
};
//Add update button
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

//query based call for the data
rootRef.orderByKey().on('value',snpashot =>{
    console.log(snpashot.val());
    
})

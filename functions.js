
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Usuario : " + email_id;
      if(email_id != 'superadmin@gmail.com'){
        var btnRegisterUser = document.getElementById("btnregisteradmin");
        btnRegisterUser.style.display = 'none';
      }

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});



function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = "Revise los campos";
    var errorMessage = "Revise los campos";
    window.alert("Error : " + errorMessage);

    // ...
  });

}

function showform(){
  document.getElementById("registerform").style.display = "block";
  document.getElementById("btnregisteradmin").style.display = "none";

 }

function cancelregister(){
  document.getElementById("registerform").style.display = "none";
  document.getElementById("btnregisteradmin").style.display = "block";

 }

function logout(){
  firebase.auth().signOut();
  location.reload();
}



var datab  = firebase.database().ref('Users/Admin/');

function UserRegister(){
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
  document.getElementById('form').reset();
  cancelregister();
  logout();
  alert('Usuario Registrado');
}).catch(function (error){
    var errorcode = error.code;
    var errormsg = error.message;
});
}


var searchBar =  document.getElementById('searchBar');
var searchBtn =  document.getElementById('btnSearch');
var type =  document.getElementById('typeSelected');
var tbody = document.getElementById('tbody1');

function SearchTable(TypeData){
    
  var filter = searchBar.value.toUpperCase();
  var tr = tbody.getElementsByTagName("tr");
  var found;

  for(let i = 0 ; i<tr.length;i++){
    var td = tr[i].getElementsByClassName(TypeData);
    for(let j = 0 ; j<td.length;j++){
      if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1){
        found = true;
      }
    }
    if(found){
      tr[i].style.display="";
      found=false;
    }
    else{
      tr[i].style.display="none";
    }
  }
}

searchBtn.onclick = function(){
  if(searchBar.value==""){
    SearchTable("nameField");
  }
  else if (type.value==1){
    SearchTable("nameField");
  }
  else if (type.value==2){
    SearchTable("dniField");
  }
}



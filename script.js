// Changing the style of scroll bar
// window.onscroll = function() {myFunction()};
		
// function myFunction() {
// 	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
// 	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
// 	var scrolled = (winScroll / height) * 100;
// 	document.getElementById("myBar").style.width = scrolled + "%"; 
// }

function scrollAppear() {
  var introText = document.querySelector('.side-text');
  var sideImage = document.querySelector('.sideImage');
  var introPosition = introText.getBoundingClientRect().top;
  var imagePosition = sideImage.getBoundingClientRect().top;
  
  var screenPosition = window.innerHeight / 1.2;

  if(introPosition < screenPosition) {
    introText.classList.add('side-text-appear');
  }
  if(imagePosition < screenPosition) {
    sideImage.classList.add('sideImage-appear');
  }
}

window.addEventListener('scroll', scrollAppear);

// For switching between navigation menus in mobile mode
var i = 2;
function switchTAB() {
	var x = document.getElementById("list-switch");
	if(i%2 == 0) {
		document.getElementById("list-switch").style= "display: grid; height: 50vh; margin-left: 5%;";
		document.getElementById("search-switch").style= "display: block; margin-left: 5%;";
	}else {
		document.getElementById("list-switch").style= "display: none;";
		document.getElementById("search-switch").style= "display: none;";
	}
	i++;
}



// For LOGIN and REGISTER
// var x = document.getElementById("login");
// var y = document.getElementById("register");
// var z = document.getElementById("btn");
// var a = document.getElementById("log");
// var b = document.getElementById("reg");
// var w = document.getElementById("other");

// function registerUser() {
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   fetch('http://localhost:3000/api/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       password: password
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//     alert('Înregistrare reușită!');
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//     alert('Eroare la înregistrare!');
//   });
// }

// function loginUser() {
//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Success:', data);
//     alert('Autentificare reușită!');
//     // Salvarea tokenului în localStorage sau sesiune pentru utilizare ulterioară
//     localStorage.setItem('userToken', data.token);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//     alert('Eroare la autentificare!');
//   });
// }

// function switchToRegister() {
//   // Muta formularul de login in stanga, afara din vedere
//   x.style.transform = "translateX(-100%)";
//   // Aduce formularul de register in centrul vizibil
//   y.style.transform = "translateX(-50%)";
//   z.style.transform = "translateX(100%)"; // Ajustează dacă este necesar pentru butonul de switch
//   w.style.visibility = "hidden"; // Ascunde elementele care nu sunt necesare în acest context
//   b.style.color = "#fff"; // Highlight pentru tab-ul activ
//   a.style.color = "#000"; // Lowlight pentru tab-ul inactiv
// }

// function switchToLogin() {
//   // Resetare stiluri pentru formularul de login pentru a fi în centrul paginii
//   x.style.transform = "translateX(0%)";
//   // Muta formularul de register in dreapta, afara din vedere
//   y.style.transform = "translateX(100%)";
//   z.style.transform = "translateX(0%)"; // Reset butonul de switch
//   w.style.visibility = "visible"; // Arată elementele care sunt necesare
//   a.style.color = "#fff"; // Highlight pentru tab-ul activ
//   b.style.color = "#000"; // Lowlight pentru tab-ul inactiv
// }

// For LOGIN
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var a = document.getElementById("log");
var b = document.getElementById("reg");
var w = document.getElementById("other");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
  w.style.visibility = "hidden";
  b.style.color = "#fff";
  a.style.color = "#000";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
  w.style.visibility = "visible";
  a.style.color = "#fff";
  b.style.color = "#000";
}

// CheckBox Function
function goFurther(){
  if (document.getElementById("chkAgree").checked == true) {
    document.getElementById('btnSubmit').style = 'background: linear-gradient(to right, #FA4B37, #DF2771);';
  }
  else{
    document.getElementById('btnSubmit').style = 'background: lightgray;';
  }
}

function google() {
  window.open("https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue&csig=AF-SEnbZHbi77CbAiuHE%3A1585466693&flowName=GlifWebSignIn&flowEntry=AddSession", "_blank");
}

// QUIZ Page
function quizt(frame) {
  document.getElementById('f1').style='display: none;';
  document.getElementById('f2').style='display: none;';
  document.getElementById('f3').style='display: none;';
  document.getElementById('f4').style='display: none;';
  document.getElementById('f5').style='display: none;';
  document.getElementById('f6').style='display: none;';
  document.getElementById('f7').style='display: none;';
  document.getElementById('f8').style='display: none;';
  document.getElementById('f9').style='display: none;';
  document.getElementById('f10').style='display: none;';
  document.getElementById('f11').style='display: none;';
  if(frame == 1) document.getElementById('f1').style = 'display: block';
  else if(frame == 2) document.getElementById('f2').style = 'display: block';
  else if(frame == 3) document.getElementById('f3').style = 'display: block';
  else if(frame == 4) document.getElementById('f4').style = 'display: block';
  else if(frame == 5) document.getElementById('f5').style = 'display: block';
  else if(frame == 6) document.getElementById('f6').style = 'display: block';
  else if(frame == 7) document.getElementById('f7').style = 'display: block';
  else if(frame == 8) document.getElementById('f8').style = 'display: block';
  else if(frame == 9) document.getElementById('f9').style = 'display: block';
  else if(frame == 10) document.getElementById('f10').style = 'display: block';
  else if(frame == 11) document.getElementById('f11').style = 'display: block'; 
  else alert('error');
}

function startquiz() {
  document.getElementById('title').style = 'display: none;'; 

  document.getElementById('panel').style = 'display: inline-flex;'; 
  document.getElementById('left').style = 'display: block;'; 
  document.getElementById('right').style = 'display: block;'; 
}
function searchdisplay() {
  document.getElementById('searchpanel').style.display="block";
}

function display(n) {
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var img3 = document.getElementById('img3');
  var img4 = document.getElementById('img4');
  var s1 = document.getElementById('s1');
  var s2 = document.getElementById('s2');
  var s3 = document.getElementById('s3');
  var s4 = document.getElementById('s4');

  img1.style = 'display: none;';
  img2.style = 'display: none;';
  img3.style = 'display: none;';
  img4.style = 'display: none;';
  s1.style = 'background: #DF2771; color: #FFF;';
  s2.style = 'background: #DF2771; color: #FFF;';
  s3.style = 'background: #DF2771; color: #FFF;';
  s4.style = 'background: #DF2771; color: #FFF;';

  if(n==1) {
    img1.style = 'display: block;';
    s1.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if(n==2) {
    img2.style = 'display: block;';
    s2.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if(n==3) {
    img3.style = 'display: block;';
    s3.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if(n==4) {
    img4.style = 'display: block;';
    s4.style = 'background: #E5E8EF; color: #DF2771;';
  } 
}


function sideMenu(side) {
  var menu = document.getElementById('side-menu');
  if(side==0) {
    menu.style = 'transform: translateX(0vh); position:fixed;';
  }
  else {
    menu.style = 'transform: translateX(-100%);';
  }
  side++;
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function fetchQuiz(subject) {
  fetch(`/api/quiz/${subject}`)
    .then(response => response.json())
    .then(data => {
      console.log('Quiz:', data);
      // Aici poți actualiza DOM-ul cu datele primite pentru a afișa quiz-ul
    })
    .catch(error => console.error('Eroare la preluarea quiz-ului:', error));
}
document.getElementById('togglePassword').addEventListener('click', function (e) {
  const password = document.getElementById('password');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.innerHTML = type === 'password' ? '&#x1F441;' : '&#x1F441;';
});



// Apelarea funcției pentru a încărca un quiz, de exemplu:
/*fetchQuiz('C++');
function loadQuiz(subject) {
  fetch(`/api/${subject}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Nu s-a putut încărca quiz-ul.');
      }
      return response.json();
    })
    .then(quiz => {
      // Procesează datele quiz-ului
      console.log(quiz);
      // Aici poți actualiza DOM-ul cu întrebările din quiz
    })
    .catch(error => {
      console.error('Eroare:', error);
    });
}
*/
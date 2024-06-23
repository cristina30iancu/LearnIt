// Changing the style of scroll bar
// window.onscroll = function() {myFunction()};

// function myFunction() {
// 	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
// 	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
// 	var scrolled = (winScroll / height) * 100;
// 	document.getElementById("myBar").style.width = scrolled + "%"; 
// }
function fetchQuiz(subject) {
  fetch(`/api/quiz/${subject}`)
    .then(response => response.json())
    .then(data => {
      console.log('Quiz:', data);
      // Aici poți actualiza DOM-ul cu datele primite pentru a afișa quiz-ul
    })
    .catch(error => console.error('Eroare la preluarea quiz-ului:', error));
}

// QUIZ Page
function quizt(frame) {
  document.getElementById('f1').style = 'display: none;';
  document.getElementById('f2').style = 'display: none;';
  document.getElementById('f3').style = 'display: none;';
  document.getElementById('f4').style = 'display: none;';
  document.getElementById('f5').style = 'display: none;';
  document.getElementById('f6').style = 'display: none;';
  document.getElementById('f7').style = 'display: none;';
  document.getElementById('f8').style = 'display: none;';
  document.getElementById('f9').style = 'display: none;';
  document.getElementById('f10').style = 'display: none;';
  document.getElementById('f11').style = 'display: none;';
  if (frame == 1) document.getElementById('f1').style = 'display: block';
  else if (frame == 2) document.getElementById('f2').style = 'display: block';
  else if (frame == 3) document.getElementById('f3').style = 'display: block';
  else if (frame == 4) document.getElementById('f4').style = 'display: block';
  else if (frame == 5) document.getElementById('f5').style = 'display: block';
  else if (frame == 6) document.getElementById('f6').style = 'display: block';
  else if (frame == 7) document.getElementById('f7').style = 'display: block';
  else if (frame == 8) document.getElementById('f8').style = 'display: block';
  else if (frame == 9) document.getElementById('f9').style = 'display: block';
  else if (frame == 10) document.getElementById('f10').style = 'display: block';
  else if (frame == 11) document.getElementById('f11').style = 'display: block';
  else alert('error');
}

function startquiz() {
  document.getElementById('title').style = 'display: none;';

  document.getElementById('panel').style = 'display: inline-flex;';
  document.getElementById('left').style = 'display: block;';
  document.getElementById('right').style = 'display: block;';
}
function searchdisplay() {
  document.getElementById('searchpanel').style.display = "block";
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

  if (n == 1) {
    img1.style = 'display: block;';
    s1.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if (n == 2) {
    img2.style = 'display: block;';
    s2.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if (n == 3) {
    img3.style = 'display: block;';
    s3.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if (n == 4) {
    img4.style = 'display: block;';
    s4.style = 'background: #E5E8EF; color: #DF2771;';
  }
}


function sideMenu(side) {
  var menu = document.getElementById('side-menu');
  if (side == 0) {
    menu.style = 'transform: translateX(0vh); position:fixed;';
  }
  else {
    menu.style = 'transform: translateX(-100%);';
  }
  side++;
}

document.addEventListener("DOMContentLoaded", function () {
  const csubmit =   document.getElementById('csubmit');
  if(csubmit)
  document.getElementById('csubmit').addEventListener('click', submitFeedback);

  function submitFeedback() {
      const form = document.getElementById('feedbackForm');
      const formData = new FormData(form);
  
      const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          details: formData.get('details')
      };
  
      fetch('http://localhost:3000/api/feedback', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('userToken')
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Feedback saved:', data);
          displayFeedback(data);
      })
      .catch(error => console.error('Error submitting feedback:', error));
  }
  
  function displayFeedback(feedback) {
    console.log('to show', feedback)
      const feedbackList = document.getElementById('feedbackList');
      const feedbackItem = document.createElement('div');
      feedbackItem.className = 'feedback-item';
      feedbackItem.innerHTML = `
          <strong>${feedback.name}</strong><br>
          ${feedback.email}<br>
          ${feedback.details}
      `;
      feedbackList.appendChild(feedbackItem);
  }
  
  
  function loadFeedbacks() {
    console.log('aci')
      fetch('http://localhost:3000/api/feedback', {
          headers: {
              'Authorization': localStorage.getItem('userToken')
          }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
          data.forEach(feedback => displayFeedback(feedback));
      })
      .catch(error => console.error('Error loading feedbacks:', error));
  }
  loadFeedbacks()

  document.getElementById("get-started").setAttribute("href", "login.html")
  const token = localStorage.getItem('userToken');
  if (token) {
    const response =
      fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(res => res.json())
        .then(data => document.getElementById("get-started").setAttribute("href", "profile.html"))
  }
  const logoutBtn = document.getElementById("logout")
  if (localStorage.getItem('userToken')) {
    logoutBtn.style.visibility = "visible";
    logoutBtn.onclick = () => {
      localStorage.removeItem("userToken");
      window.location.href = "login.html"
    }
  } else {
    logoutBtn.style.visibility = "hidden";
  }

  function scrollAppear() {
    var introText = document.querySelector('.side-text');
    var sideImage = document.querySelector('.sideImage');
    var introPosition = introText.getBoundingClientRect().top;
    var imagePosition = sideImage.getBoundingClientRect().top;

    var screenPosition = window.innerHeight / 1.2;

    if (introPosition < screenPosition) {
      introText.classList.add('side-text-appear');
    }
    if (imagePosition < screenPosition) {
      sideImage.classList.add('sideImage-appear');
    }
  }

  window.addEventListener('scroll', scrollAppear);

  // For switching between navigation menus in mobile mode
  var i = 2;
  function switchTAB() {
    var x = document.getElementById("list-switch");
    if (i % 2 == 0) {
      document.getElementById("list-switch").style = "display: grid; height: 50vh; margin-left: 5%;";
      document.getElementById("search-switch").style = "display: block; margin-left: 5%;";
    } else {
      document.getElementById("list-switch").style = "display: none;";
      document.getElementById("search-switch").style = "display: none;";
    }
    i++;
  }
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
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

  async function getUser() {
    const token = localStorage.getItem('userToken');
    if (token) {
      const response = await
        fetch('http://localhost:3000/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })

      const data = await response.json()
      if (response.ok) {
        console.log('Success:', data);
      } else console.log(data.msg)
    }
  }

  getUser();
})
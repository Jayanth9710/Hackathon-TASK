// async function getUsers() {
//     const data = await fetch(
//       "https://api.github.com/users/octocat/repos", 
//       {
//       method: "GET"
//       }
//       );
//   console.log(data);
//    const users = await data.json();
//    loadUsers(users);
//   }
//   getUsers();
const logo = document.createElement("div");
logo.className = "logo";
logo.innerHTML = `
<img class="github-logo" src="github.png"></img>
<h1 class="heading">Github API Repos Application <h1>
<input placeholder="Enter Github User Name" class="name"></input>
    <button class="btn btn-primary" type="submit" onclick="requestUserrepo()">Find your Github Repos</button>
    <button class="reset type="submit" onclick="refreshList()">Reset Username</button>
    <div class="pagination"></div>
`
  document.body.append(logo);
  
  
  function loadUsers(data) {
    const userList = document.createElement("div");
    userList.className = "user-list";
    data.forEach((data) => { 
      const userContainer = document.createElement("div");
      userContainer.className = "user-container";
  
      userContainer.innerHTML = `
      <img class="user-image" src=${data.owner.avatar_url}></img>
      <div class="repo-details">
      <a href=${data.html_url} target="_blank">Repository Link</a>
      <h3 class="repo-name">Repository Name: ${data.name}<h3>
      <p class="country-details">Fork-Count: ${data.forks_count} <br> Star-Gazers-Count: ${data.stargazers_count} <br>  </p>
      
      </div>`;
     
  
      userList.append(userContainer);
    
   });
    document.body.append(userList);
    
  }
  

  async function requestUserrepo(username){
  username = document.querySelector(".name").value;

      const response = await fetch(
          `https://api.github.com/users/${username}/repos`,{
              method: "GET"
          }
      );

      console.log(response);
      const users = await response.json();
      
  const Pages = Math.ceil(users.length / 10);
  
  const pagination = document.querySelector(".pagination");
  
  for (let i = 1; i <= Pages; i++) {
    const page = document.createElement("button");
    page.innerText = i;

    page.onclick = function () {
  
      const pageUsers = users.filter(
        (user, index) => index >= (i - 1) * 10 && index < i * 10
      );
      document.querySelector(".user-list").remove();
      loadUsers(pageUsers);
    };
    pagination.append(page);
  }

  const firstTenUsers = users.filter((user, index) => index < 10);
      loadUsers(users);
  }
 

  function refreshList() {
    document.querySelector(".user-list").remove();
    formreset();
    requestUserrepo();
  }

  function formreset() {
    document.querySelector(".name").value='';
    document.querySelector(".pagination").remove();
  }
const getEle = (className) => {
  return document.querySelector(className);
};
let skipForFirstTime = 0;
const eleMain = getEle(".main-content");
const usrName = getEle("#username");
const passWrd = getEle("#password");
const loginBtn = getEle(".btn-login");
let currentClass = eleMain.classList[0];

const isTouchLogin = {
  usrName: false,
  passWrd: false,
};
const textWarnLogin = {
  usrName: "init",
  passWrd: "init",
};


const usrNameWrn = usrName.nextElementSibling;
const passWrn = passWrd.nextElementSibling;


const checkUsername = (value) => {
  isTouchLogin.usrName = true;
  if (value == "") {
    textWarnLogin.usrName = "Do not empty!";
    usrNameWrn.style.display = "block";
  } else {
    textWarnLogin.usrName = "";
    usrNameWrn.style.display = "none";
  }
};

const checkPassword = (value) => {
  isTouchLogin.passWrd = true;
  passWrn.style.display = "block";
  if (value == "") {
    textWarnLogin.passWrd = "Do not let password empty!";
  } else if (!(value.length <= 8 && value.length > 0)) {
    textWarnLogin.passWrd = "Max charater is 8!";
  } else {
    textWarnLogin.passWrd = "";
    passWrn.style.display = "none";
  }
};



const setAllError = () => {
  textWarnLogin.usrName = "Do not empty!";
  textWarnLogin.passWrd = "Do not let password empty!";
  usrNameWrn.style.display = "block";
  passWrn.style.display = "block";
  usrNameWrn.innerHTML = textWarnLogin.usrName;
  passWrn.innerHTML = textWarnLogin.passWrd;
};


const getLoginData = (e) => {
  const currentEleName = e.srcElement.name;

  if (currentEleName == "username") {
    isTouchLogin.usrName = true;
    const name = usrName.value;
    checkUsername(name);
    usrNameWrn.innerHTML = textWarnLogin.usrName;
  }else{
    isTouchLogin.passWrd = true;
    const pass = passWrd.value;
    checkPassword(pass);
    passWrn.innerHTML = textWarnLogin.passWrd;
  }


};

const setAllTouchTrue = ()=>{
    
}



usrName.oninput = getLoginData;
passWrd.oninput = getLoginData;



loginBtn.onclick = () => {
  let isAllTrueTouch = Object.values(isTouchLogin).every((item) => {
    return item;
  });
  let isAllTrueMess = Object.values(textWarnLogin).every((item)=>{
    return item == "";
  })
  console.log(isAllTrueTouch,isAllTrueMess);
  if (!isAllTrueTouch) {
    setAllError();
    alert("You have to fill in the form!!");
  }else if(!isAllTrueMess && skipForFirstTime != 0){
    alert("Invalid field is exits!!");
  }
  else{
    alert("Success!!!");
    //send data with API here:

  }
  skipForFirstTime++;
};

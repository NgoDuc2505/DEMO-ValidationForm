
const getEle = (className) => {
  return document.querySelector(className);
};
const regisFieldsList = [
  "gmail",
  "tenSinhVien",
  "maSinhVien",
  "diaChiMAC",
  "matKhau",
];
const mappingToEle = regisFieldsList.map((item) => {
  return getEle(`#${item}`);
});
const siblingWrnEleMapping = mappingToEle.map((item) => {
  return item.nextElementSibling;
});
console.log(mappingToEle);
const isTouchRegis = {
  gmail: false,
  tenSinhVien: false,
  maSinhVien: false,
  matKhau: false,
  diaChiMAC: false,
};
const textWarnRegis = {
  gmail: "init",
  tenSinhVien: "init",
  maSinhVien: "init",
  matKhau: "init",
  diaChiMAC: "init",
};

const checkGmail = (value) => {
  isTouchRegis.gmail = true;
  if (value == "") {
    textWarnRegis.gmail = "Do not let empty gmail!";
    siblingWrnEleMapping[0].style.display = "block";
  } else {
    textWarnRegis.gmail = "";
    siblingWrnEleMapping[0].style.display = "none";
  }
};

const checkNotEmpty = (value, eleName, indexEle) => {
  isTouchRegis[eleName] = true;
  let isvalid = true;
  if (value == "") {
    textWarnRegis[eleName] = `Do not let empty ${eleName}`;
    siblingWrnEleMapping[indexEle].style.display = "block";
    isvalid = false;
  } else {
    textWarnRegis[eleName] = "";
    siblingWrnEleMapping[indexEle].style.display = "none";
  }
  return isvalid;
};

const checkPass = (value,max) => {
  isTouchRegis.passWrd = true;
  siblingWrnEleMapping[4].style.display = "block";
  if (!(value.length <= max && value.length > 0)) {
    textWarnRegis.matKhau = "Max charater is 8!";
  } else {
    textWarnRegis.matKhau = "";
    siblingWrnEleMapping[4].style.display = "none";
  }
};

const getRegisData = (e) => {
  const currentEleName = e.srcElement.name;
  console.log(currentEleName);
  const indexFind = regisFieldsList.findIndex((item) => {
    return item == currentEleName;
  });
  const valueData = mappingToEle[indexFind].value;
  const isValid = checkNotEmpty(valueData, currentEleName, indexFind);
  if (isValid && currentEleName == regisFieldsList[4]) {
    checkPass(valueData,8);
  }
  siblingWrnEleMapping[indexFind].innerHTML = textWarnRegis[currentEleName];
};

const setAllError = () => {
  regisFieldsList.forEach((item, index) => {
    textWarnRegis[item] = "Do not leave this field empty!";
    siblingWrnEleMapping[index].innerHTML = textWarnRegis[item];
    siblingWrnEleMapping[index].style.display = "block";
  });
};

const setError= (currentEleName,index)=>{
    textWarnRegis[currentEleName] = "Do not leave this field empty!";
    siblingWrnEleMapping[index].innerHTML = textWarnRegis[currentEleName];
    siblingWrnEleMapping[index].style.display = "block";
}

const setAllTouchTrue = ()=>{
    regisFieldsList.forEach((item) => {
       isTouchRegis[item] = true;
      });
}

mappingToEle.forEach((item) => {
  item.oninput = getRegisData;
  item.onblur = getRegisData;
});

document.querySelector(".btn-register").onclick = () => {
  let isAllTrueTouch = Object.values(isTouchRegis).every((item) => {
    return item;
  });
  let isAllTrueMess = Object.values(textWarnRegis).every((item) => {
    return item == "";
  });
  let isAllEqualInit = Object.values(textWarnRegis).every((item) => {
    return item == "init";
  });
  console.log(isAllTrueTouch, isAllTrueMess);
  console.log(isTouchRegis, textWarnRegis);
  if (!isAllTrueTouch && isAllEqualInit) {
    setAllTouchTrue();
    setAllError();
    alert("You have to fill in the form!!");
  } else {
    let isValidFieldCount = 0;
    regisFieldsList.forEach((item,index)=>{
        if(!isTouchRegis[item]){
            setError(item,index);
            isValidFieldCount++;
        }
    })
    if(isValidFieldCount == 0){
        regisFieldsList.forEach((item,index)=>{
            if(!(textWarnRegis[item] == "")){
                isValidFieldCount++;
            }
        })
        if(isValidFieldCount == 0){
            alert("success");
        }
    }
  }
};

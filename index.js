"use strict";

let globalUserQuestionSheet = {
  diet: "-placeholder-",
  foodSelectionMeat: "-placeholder-",
  foodSelectionVeg: "-placeholder-",
  gifts: "-placeholder-",
  travel: "-placeholder-",
  travelMethod: "-placeholder-",
  travelMiles: "-placeholder-",
  energy: "-placeholder-",
  energyTypes: "-placeholder-",
  totalCost: "-placeholder-"
};
let allUserData = [];
let totalSales = "";
window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("Hello World!");
  getRestDBData();
  document.querySelector("#start").addEventListener("click", () => {
    document.querySelector("#start").style.display = "none";
    expandPageElements();
  });
}
function getRestDBData() {
  fetch("https://contactme-6795.restdb.io/rest/purchaselist", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5df74bccbf46220df655db83",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      allUserData = data;
      let localCounter = 0;
      data.forEach(user => {
        localCounter = localCounter + user.totalCost;
      });

      let roundedTotal = Math.round(localCounter);
      console.log(roundedTotal);

      totalSales = `${roundedTotal}DKK,-`;
    });
}
function expandPageElements() {
  document.querySelector("#q1Headline").style.opacity = 100;
  console.log("OPEN");
  let questionArea = document.querySelector("#calcCO2");
  questionArea.classList.remove("regular");
  questionArea.classList.add("expanded");
  let infoArea = document.querySelector("#info");
  infoArea.classList.remove("infoRegular");
  infoArea.classList.add("infoExpanded");
  let collabHeadline = document.querySelector("#collabHeadline");
  collabHeadline.classList.remove("collabHeadlineRegular");
  collabHeadline.classList.add("collabHeadlineExpanded");
  let collaborators = document.querySelector("#collaborators");
  collaborators.classList.remove("collaboratorsRegular");
  collaborators.classList.add("collaboratorsExpanded");
  let footer = document.querySelector("footer");
  footer.classList.remove("footerRegular");
  footer.classList.add("footerExpanded");

  startCalc();
}

let slideCounter = 1;
function changeDirection(dir) {
  slideCounter = slideCounter + dir;
  console.log(slideCounter);

  let slider = document.querySelector("#questionSlider");
  switch (slideCounter) {
    case 1:
      slider.classList = "";
      slider.classList.add("slide1");
      console.log("DETTE ER SLIDE 1");
      break;
    case 2:
      slider.classList = "";
      slider.classList.add("slide2");
      console.log("DETTE ER SLIDE 2");
      break;
    case 3:
      slider.classList = "";
      slider.classList.add("slide3");
      console.log("DETTE ER SLIDE3");
      break;
    case 4:
      slider.classList = "";
      slider.classList.add("slide4");
      console.log("DETTE ER SLIDE 4");
  }
}
function startCalc() {
  let qBoxes = document.querySelectorAll(".ID1_1");
  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      qBoxes.forEach(box => {
        box.classList = "";
        box.classList.add("questionBox", "ID1_1");
      });

      questionHandler1(item);
    });
  });
  document.querySelector(".next1").addEventListener("click", () => {
    displayQuestion2(globalUserQuestionSheet.diet);
  });
}
function questionHandler1(item) {
  console.log(item);
  item.classList.add("ID1_1Selected");
  globalUserQuestionSheet.diet = item.dataset.type;
  console.log(globalUserQuestionSheet);
}
function displayQuestion2(food) {
  console.log("Q 2");
  document.querySelector("#questionID1_1").style.opacity = 0;
  setTimeout(() => {
    document.querySelector("#questionID1_1").style.display = "none";
    if (food == "vegetar" || food == "veganer") {
      document.querySelector("#questionID1_3").style.display = "block";
      setTimeout(() => {
        document.querySelector("#questionID1_3").style.opacity = 100;
        questionHandler3();
      }, 200);
    } else {
      document.querySelector("#questionID1_2").style.display = "block";
      setTimeout(() => {
        document.querySelector("#questionID1_2").style.opacity = 100;
        questionHandler2();
      }, 200);
    }
  }, 200);
}
function questionHandler2() {
  let qBoxes = document.querySelectorAll(".ID1_2");
  console.log(qBoxes);
  let foodArrayMeat = [];
  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("ID1_2Selected");
      foodArrayMeat = [];
      qBoxes.forEach(obj => {
        if (obj.classList.contains("ID1_2Selected") == true) {
          foodArrayMeat.push(obj.dataset.type);
          console.log(foodArrayMeat);
        }
      });
    });
  });
  document.querySelector(".next2").addEventListener("click", () => {
    globalUserQuestionSheet.foodSelectionMeat = foodArrayMeat;
    console.log(globalUserQuestionSheet);
    displayQuestion3();
  });
}
function displayQuestion3() {
  console.log("Q 3");
  document.querySelector("#questionID1_2").style.opacity = 0;
  setTimeout(() => {
    document.querySelector("#questionID1_2").style.display = "none";
    document.querySelector("#questionID1_3").style.display = "block";
    setTimeout(() => {
      document.querySelector("#questionID1_3").style.opacity = 100;
      questionHandler3();
    }, 200);
  }, 200);
}
function questionHandler3() {
  let qBoxes = document.querySelectorAll(".ID1_3");
  console.log(qBoxes);
  let foodArrayVeg = [];
  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("ID1_3Selected");
      foodArrayVeg = [];
      qBoxes.forEach(obj => {
        if (obj.classList.contains("ID1_3Selected") == true) {
          foodArrayVeg.push(obj.dataset.type);
          console.log(foodArrayVeg);
        }
      });
    });
  });
  document.querySelector(".next3").addEventListener("click", () => {
    globalUserQuestionSheet.foodSelectionVeg = foodArrayVeg;
    console.log(globalUserQuestionSheet);
    changeDirection(1);
    startQuestion2();
  });
}
function startQuestion2() {
  let qBoxes = document.querySelectorAll(".ID2_1");
  console.log(qBoxes);

  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("ID2_1Selected");
    });
  });
  document.querySelector(".next4").addEventListener("click", () => {
    questionHandler4(qBoxes);
  });
}
function questionHandler4(array) {
  let varr = [];
  array.forEach(item => {
    if (item.classList.contains("ID2_1Selected") == true) {
      varr.push(item.dataset.type);
    }
  });
  displayQuestion4(varr);
}
function displayQuestion4(varr) {
  console.log("Q 3");
  document.querySelector("#questionID2_1").style.opacity = 0;
  setTimeout(() => {
    document.querySelector("#questionID2_1").style.display = "none";
    chooseGiftType(varr);
    document.querySelector("#questionID2_2").style.display = "block";
    setTimeout(() => {
      document.querySelector("#questionID2_2").style.opacity = 100;
    }, 200);
  }, 200);
}
function chooseGiftType(array) {
  let qBoxes = document.querySelectorAll(".ID2_2");
  qBoxes.forEach(item => {
    array.forEach(varr => {
      if (item.dataset.type == varr) {
        item.style.display = "block";
      }
    });
  });
  questionHandler5();
}
function questionHandler5() {
  let giftArray = [];
  let inputTargets = document.querySelectorAll(".valueInput");

  globalUserQuestionSheet.gifts = giftArray;
  console.log(globalUserQuestionSheet);
  document.querySelector(".next5").addEventListener("click", () => {
    inputTargets.forEach(input => {
      if (input.value != "") {
        let inputID = `${input.id}:${input.value}`;
        giftArray.push(inputID);
      }
    });
    startQuestion3();
    changeDirection(1);
  });
}
function startQuestion3() {
  console.log(globalUserQuestionSheet);
  let qBoxes = document.querySelectorAll(".ID3_1");
  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("ID3_1Selected");
    });
  });
  document.querySelector(".next6").addEventListener("click", () => {
    questionHandler6(qBoxes);
  });
}
function questionHandler6(arr) {
  let selected = document.querySelector(".ID3_1Selected").dataset.type;
  if (selected == "julHjemme") {
    globalUserQuestionSheet.travel = selected;
    changeDirection(1);
    startQuestion4();
  } else {
    globalUserQuestionSheet.travel = selected;
    displayQuestion5();
  }
}
function displayQuestion5() {
  console.log("Q 5");
  document.querySelector("#questionID3_1").style.opacity = 0;
  setTimeout(() => {
    document.querySelector("#questionID3_1").style.display = "none";
    questionHandler7();

    document.querySelector("#questionID3_2").style.display = "block";
    setTimeout(() => {
      document.querySelector("#questionID3_2").style.opacity = 100;
    }, 200);
  }, 200);
}
function questionHandler7() {
  let qBoxes = document.querySelectorAll(".ID3_2");
  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      qBoxes.forEach(obj => {
        obj.classList = "";
        obj.classList.add("ID3_2", "questionBox");
      });
      item.classList.toggle("ID3_2Selected");
    });
  });
  document.querySelector(".next7").addEventListener("click", () => {
    globalUserQuestionSheet.travelMethod = document.querySelector(
      ".ID3_2Selected"
    ).dataset.type;
    globalUserQuestionSheet.travelMiles = document.querySelector(
      "#miles"
    ).value;
    console.log(globalUserQuestionSheet);
    changeDirection(1);
    startQuestion4();
  });
}
function startQuestion4() {
  let qBoxes = document.querySelectorAll(".ID4_1");
  qBoxes.forEach(item => {
    item.addEventListener("click", () => {
      qBoxes.forEach(obj => {
        obj.classList = "";
        obj.classList.add("ID4_1", "questionBox");
      });
      item.classList.toggle("ID4_1Selected");
    });
  });
  document.querySelector(".next8").addEventListener("click", () => {
    globalUserQuestionSheet.energy = document.querySelector(
      ".ID4_1Selected"
    ).dataset.type;
    displayQuestion6(document.querySelector(".ID4_1Selected").dataset.type);
  });
}
function displayQuestion6(varr) {
  console.log(varr);
  console.log("Q 6");
  document.querySelector("#questionID4_1").style.opacity = 0;
  setTimeout(() => {
    document.querySelector("#questionID4_1").style.display = "none";
    if (varr == "el") {
      questionHandler8();
      document.querySelector("#questionID4_2").style.display = "block";
      setTimeout(() => {
        document.querySelector("#questionID4_2").style.opacity = 100;
      }, 200);
    } else {
      questionHandler9();
      document.querySelector("#questionID4_3").style.display = "block";
      setTimeout(() => {
        document.querySelector("#questionID4_3").style.opacity = 100;
      }, 200);
    }
  }, 200);
}
function questionHandler8() {
  document.querySelector(".next9").addEventListener("click", () => {
    let powerSelection = {
      ovn: document.querySelector("#ovn").value,
      led: document.querySelector("#led").value,
      lamp: document.querySelector("#lamp").value,
      radiator: document.querySelector("#radiator").value
    };
    globalUserQuestionSheet.energyTypes = powerSelection;
    displayEndCard();
  });
}
function questionHandler9() {
  document.querySelector(".next10").addEventListener("click", () => {
    let powerSelection = {
      ovnF: document.querySelector("#ovnF").value,
      ledF: document.querySelector("#radiatorF").value
    };
    globalUserQuestionSheet.energyTypes = powerSelection;
    displayEndCard();
  });
}

function displayEndCard() {
  console.log(globalUserQuestionSheet);
  document.querySelector("#questionID4").style.opacity = 0;
  document.querySelector("#questionID4").style.pointerEvents = "none";
  document.querySelector("#endCard").classList.remove("up");
  document.querySelector("#endCard").classList.add("down");

  let gaver = document.querySelectorAll(".present");
  gaver.forEach(item => {
    item.addEventListener("click", () => {
      gaver.forEach(item => {
        item.classList = "present";
      });
      item.classList.add("presentSelected");
    });
  });

  calcTotal();
  document.querySelector("#buy").addEventListener("click", () => {
    displayPurchase(document.querySelector(".presentSelected").id);
  });
}
function displayPurchase(ID) {
  document.querySelector("#endCard").style.opacity = 0;
  document.querySelector("#endCard").style.pointerEvents = "none";
  document.querySelector("#payment").classList.remove("paymentUp");
  document.querySelector("#payment").classList.add("paymentDown");

  document
    .querySelector("#mc-embedded-subscribe")
    .addEventListener("click", () => {
      sendToRestDB();
      displayThanks();
    });
}
function displayThanks() {
  document.querySelector("#thankYou").classList.remove("thankYouUp");
  document.querySelector("#thankYou").classList.add("thankYouDown");
  document.querySelector("#thankYou").style.opacity = "100";
}
function calcTotal() {
  let totalCO2 = 0;
  if (globalUserQuestionSheet.foodSelectionMeat != "-placeholder-") {
    globalUserQuestionSheet.foodSelectionMeat.forEach(food => {
      if (food == "flaeskesteg") {
        totalCO2 = totalCO2 + 34;
      }
      if (food == "gaas") {
        totalCO2 = totalCO2 + 24;
      }
      if (food == "medister") {
        totalCO2 = totalCO2 + 16;
      }
      if (food == "frikadeller") {
        totalCO2 = totalCO2 + 42;
      }
      if (food == "leverpostej") {
        totalCO2 = totalCO2 + 11;
      }
      if (food == "sild") {
        totalCO2 = totalCO2 + 3;
      }
    });
  }
  console.log(totalCO2);
  if (globalUserQuestionSheet.foodSelectionVeg != "-placeholder-") {
    globalUserQuestionSheet.foodSelectionVeg.forEach(food => {
      if (food == "kaal") {
        totalCO2 = totalCO2 + 7;
      }
      if (food == "kartofler") {
        totalCO2 = totalCO2 + 2;
      }
      if (food == "rKaal") {
        totalCO2 = totalCO2 + 2;
      }
      if (food == "nutPaste") {
        totalCO2 = totalCO2 + 3;
      }
      if (food == "piske") {
        totalCO2 = totalCO2 + 9;
      }
    });
  }
  console.log(totalCO2);
  globalUserQuestionSheet.gifts.forEach(gift => {
    console.log(gift);
    let localText = gift.split(":");
    if (localText[0] == "telefon") {
      totalCO2 = totalCO2 + localText[1] * 50;
    }
    if (localText[0] == "TV") {
      totalCO2 = totalCO2 + localText[1] * 300;
    }
    if (localText[0] == "hvidvare") {
      totalCO2 = totalCO2 + localText[1] * 326;
    }
    if (localText[0] == "console") {
      totalCO2 = totalCO2 + localText[1] * 300;
    }
    if (localText[0] == "lToej") {
      totalCO2 = totalCO2 + localText[1] * 5;
    }
    if (localText[0] == "sToej") {
      totalCO2 = totalCO2 + localText[1] * 7;
    }
    if (localText[0] == "fGift") {
      totalCO2 = totalCO2 + localText[1] * 1.0002;
    }
    if (localText[0] == "dGift") {
      totalCO2 = totalCO2 + localText[1] * 1;
    }
    if (localText[0] == "sub") {
      totalCO2 = totalCO2 + localText[1] * 1;
    }
    if (localText[0] == "recycle") {
      totalCO2 = totalCO2 + localText[1] * 1;
    }
    if (localText[0] == "discount") {
      totalCO2 = totalCO2 + localText[1] * 21.24;
    }
    if (localText[0] == "designer") {
      totalCO2 = totalCO2 + localText[1] * 13.9;
    }
  });
  console.log(totalCO2);
  if (globalUserQuestionSheet.energy == "el") {
    if (globalUserQuestionSheet.energyTypes.ovn != "-placeholder-") {
      let ovnValue = parseInt(globalUserQuestionSheet.energyTypes.ovn);
      totalCO2 = totalCO2 + ovnValue * 1.333;
      console.log(totalCO2);
    }
    if (globalUserQuestionSheet.energyTypes.led != "-placeholder-") {
      let ledValue = parseInt(globalUserQuestionSheet.energyTypes.led);
      totalCO2 = totalCO2 + ledValue * 1.333;
      console.log(totalCO2);
    }

    if (globalUserQuestionSheet.energyTypes.lamp != "-placeholder-") {
      let lampValue = parseInt(globalUserQuestionSheet.energyTypes.lamp);
      totalCO2 = totalCO2 + lampValue * 1.333;
      console.log(totalCO2);
    }
    if (globalUserQuestionSheet.energyTypes.radiator != "-placeholder-") {
      let radiatorValue = parseInt(
        globalUserQuestionSheet.energyTypes.radiator
      );
      totalCO2 = totalCO2 + radiatorValue * 1.333;
      console.log(totalCO2);
    }
  }
  if (globalUserQuestionSheet.energy == "varme") {
    if (globalUserQuestionSheet.energyTypes.ovnF != "-placeholder-") {
      let ovnFValue = parseInt(globalUserQuestionSheet.energyTypes.ovnF);
      totalCO2 = totalCO2 + ovnFValue * 1.333;
      console.log(totalCO2);
    }
    if (globalUserQuestionSheet.energyTypes.radiatorF != "-placeholder-") {
      let radiatorFValue = parseInt(globalUserQuestionSheet.energyTypes.ledF);
      totalCO2 = totalCO2 + radiatorFValue * 1.333;
      console.log(totalCO2);
    }
  }

  console.log(totalCO2);
  if (globalUserQuestionSheet.travelMethod == "fly") {
    let flyValue = parseInt(globalUserQuestionSheet.travelMiles);
    totalCO2 = totalCO2 + flyValue * 12350;
  }
  if (globalUserQuestionSheet.travelMethod == "tog") {
    let togValue = parseInt(globalUserQuestionSheet.travelMiles);
    totalCO2 = totalCO2 + togValue * 1.44;
  }
  if (globalUserQuestionSheet.travelMethod == "bil") {
    let bilValue = parseInt(globalUserQuestionSheet.travelMiles);
    totalCO2 = totalCO2 + bilValue * 1.17353;
  }

  globalUserQuestionSheet.totalCost = totalCO2 * 0.75;
  let roundedTotal = Math.round(globalUserQuestionSheet.totalCost);
  let roundedCO2 = Math.round(totalCO2);
  document.querySelector("#resultat1").textContent = roundedTotal;
  document.querySelector("#kgCO2").textContent = roundedCO2;

  console.log(totalCO2);
}
function sendToRestDB() {
  const postData = JSON.stringify(globalUserQuestionSheet);
  fetch("https://contactme-6795.restdb.io/rest/purchaselist", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5df74bccbf46220df655db83",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

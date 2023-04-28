import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const inputFieldEl = document.getElementById("input-field");
const btn = document.getElementById("add-button");
const shplistElement = document.getElementById("shopping-list");

const appSetting = {
  // the key name must be same as the key name in firebase i.e `databaseURL`
  databaseURL:
    "https://playground-b4fc8-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shopingListInDb = ref(database, "MalligaiChaman");

btn.addEventListener("click", function () {
  const data = inputFieldEl.value;
  //pushing data to firebase
  if(data === "") return alert("Please enter a value");
  else
  push(shopingListInDb, data);

  // input.value=""; refactored code as function
  clearInputFieldEl();
  // refactored code as function
  // appendItemToShoppingList(data);
});

onValue(shopingListInDb, function (snapshot) {
  if(snapshot.exists()){
    const snap = Object.entries(snapshot.val());
    clearShpListEl();
    for (let i = 0; i < snap.length; i++) {
      let currentItem = snap[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
  
      appendItemToShoppingList(currentItem);
    }
  }
  else{
    shplistElement.innerHTML="No items in the list... Yet"
  }
});



function clearShpListEl() {
  shplistElement.innerHTML = "";
}
function clearInputFieldEl() {
  inputFieldEl.value = "";
}
function appendItemToShoppingList(item) {
  let itemId = item[0];
  let itemValue = item[1];
  let newLi = document.createElement("li");
  newLi.innerHTML = itemValue;
  newLi.addEventListener("dblclick", function () {
    let excatLocationOfItemInDb = ref(database, `MalligaiChaman/${itemId}`);
    // Uncaught TypeError: Cannot convert undefined or null to object at Function.entries (<anonymous>)
    //when we delete the last item in the refence is also deleted so we need to check if the item is present or not
    //check on onvalue because it is called when the value is changed
    remove(excatLocationOfItemInDb);
  });
  shplistElement.appendChild(newLi);
}

//security rules in firebase

//this denotes the time in epoch format
//it is read and write by anyone within the time limit

// {
//     "rules": {
//       ".read": "now < 1683829800000",  // 2023-5-12
//       ".write": "now < 1683829800000",  // 2023-5-12
//     }
//   }

//this is read and write by anyone at any time

// {
//     "rules": {
//       ".read": "true",
//       ".write": "true",
//     }
//   }

//this is read by anyone and write by only authenticated users

// {
//     "rules": {
//       ".read": "true",
//       ".write": "false",
//     }
//   }

//json
const gokul = {
  name: "gokul",
  age: 21,
  address: {
    city: "chennai",
    state: "tamilnadu",
  },
};
// console.log(gokul.name);

// to convert json to arrays
let scrimbaUsers = {
  "00": "sindre@scrimba.com",
  "01": "per@scrimba.com",
  "02": "frode@scrimba.com",
};

// Challenge: Create a let variable called 'scrimbaUsersEmails' and use one of Object methods to set it equal to an array with the values
let scrimbaUsersEmails = Object.values(scrimbaUsers);

// Challenge: Create a let variable called 'scrimbaUsersIDs' and use one of Object methods to set it equal to an array with the keys
let scrimbaUsersIDs = Object.keys(scrimbaUsers);

// Challenge: Create a let variable called 'scrimbaUsersEntries' and use one of Object methods to set it equal to an array with the both the keys and values
let scrimbaUsersEntries = Object.entries(scrimbaUsers);

// console.log(scrimbaUsersEmails)
// console.log(scrimbaUsersEntries)
// console.log(scrimbaUsersIDs)

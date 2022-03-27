"use strict";
/* 
const options = { method: 'GET', headers: { Accept: 'application/json' } };

fetch('https://phishstats.info:2096/api/', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err)); */

// fetch(
//   'https://phishstats.info:2096/api/phishing?_where=(countrycode,eq,United States'
// )
//   .then(res => {
//     console.log(res);
//     return res.json();
//   })
//   .then(data => console.log(data))
//   .catch(console.error(err));

const topic = document.querySelector(".topic");
const codeSearch = document.querySelector(".searchQuery");
const experience = document.querySelector(".experience");
const toStage2 = document.querySelector(".movefwd-img");
const contentGrid = document.querySelector(".content-grid");
const topic2 = document.querySelector(".topic-2");
const entropy = document.querySelector(".entropy");
let countryCode;

///////////////////////////////////////////////////
/* Handling Phishing Attacks */

const renderTable = function (data) {
  const html = `
  <table>
    <tr>
      <td colspan = "4" class="inform">Phishing stats from ${
        data[0].countryname
      } </td>
    </tr>
    <tr>
      <th>City</th>
      <th>ISP</th>
      <th>Host</th>
      <th>IP</th>
    </tr>
    ${addTableRow(data, 0)}
    ${addTableRow(data, 1)}
    ${addTableRow(data, 2)}
    ${addTableRow(data, 3)}
    ${addTableRow(data, 4)}
    ${addTableRow(data, 5)}
    ${addTableRow(data, 6)}
  </table>
  `;

  experience.insertAdjacentHTML("beforeend", html);
};

const addTableRow = function (data, num) {
  let curData = data[num];
  const html = `
  <tr>
    <td>${curData.city || "?"}</td>
    <td class = "isp">${curData.isp}</td>
    <td>${curData.host}</td>
    <td>${curData.ip}</td>
  </tr>`;
  return html;
};

console.log(codeSearch);
codeSearch.addEventListener("keypress", (event) => {
  if (event.key == "Enter" && codeSearch.value.length == 2)
    countryCode =
      codeSearch.value &&
      fetch(
        `https://phishstats.info:2096/api/phishing?_where=(countrycode,eq,${codeSearch.value})`
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          renderTable(data);
          codeSearch.value = "";
        })
        .catch((err) => console.error(err));
});

function changeCase() {
  contentGrid.classList.toggle("hide");
  topic2.classList.toggle("hide");
}

///////////////////////////////////////////////////
/* Handling Password Entropy */

/* entropy.addEventListener("keypress", (e) => {
  let flags = [];
  if (e.key == "Enter") {
    const pass = document.querySelector(".entropy").value;
    pass < 8 && flags.push("a");
    let matches = val.match(/\d+/g);
    (matches == null || !hasUpperCase(pass) || !hasLowerCase(pass)) &&
      flags.push(b);

    if ((flags.length = 0)) {
    }
  }
});
function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}

function hasLowerCase(str) {
  return /[a-z]/.test(str);
}
 */

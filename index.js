'use strict';
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

const codeSearch = document.querySelector('.searchQuery');
const experience = document.querySelector('.experience');
let countryCode;

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

  experience.insertAdjacentHTML('beforeend', html);
};

const addTableRow = function (data, num) {
  let curData = data[num];
  const html = `
  <tr>
    <td>${curData.city || '?'}</td>
    <td class = "isp">${curData.isp}</td>
    <td>${curData.host}</td>
    <td>${curData.ip}</td>
  </tr>`;
  return html;
};

console.log(codeSearch);
codeSearch.addEventListener('keypress', event => {
  if (event.key == 'Enter' && codeSearch.value.length == 2)
    countryCode =
      codeSearch.value &&
      fetch(
        `https://phishstats.info:2096/api/phishing?_where=(countrycode,eq,${codeSearch.value})`
      )
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          renderTable(data);
          codeSearch.value = '';
        })
        .catch(err => console.error(err));
});

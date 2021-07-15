let serverNameInput = document.getElementById('serverNameIn');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);
serverTbody.addEventListener('click', removeItem);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    let newDelete = document.createElement('button')
    newDelete.setAttribute('id', `${key}`);
    newTr.setAttribute('id', `tr${key}`);
    newDelete.innerHTML = 'Delete';

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    appendTd(newTr, curServer.serverName, `nam${key}`);
    appendTd(newTr, '$' + tipAverage.toFixed(2), `ern${key}`);
    newTr.append(newDelete);
    serverTbody.append(newTr);
  };
}

function removeItem(e) {
  let deletePick = `${e.target.id}`;
  const roundup = document.getElementById(`tr${e.target.id}`);
  roundup.remove();
  delete allServers[deletePick];
  updateServerTable()

};
describe("Servers test)", function () {
  beforeEach(function () {

    // Waiter Submission
    serverNameInput.value = 'Alice';
    submitServerInfo();
    serverNameInput.value = '';
    submitServerInfo();
    serverNameInput.value = 'Ron Jon';
    submitServerInfo();

    // First Pay Submission
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    submitPaymentInfo();

    // Empty Value Check
    billAmtInput.value = '';
    tipAmtInput.value = '';
    submitPaymentInfo();

    // Second Submission Check 
    billAmtInput.value = 100;
    tipAmtInput.value = 10;
    submitPaymentInfo();

  });


  it('waiter data', function () {
    expect(Object.keys(allServers).length).toEqual(2);

    let alice = document.getElementById('namserver1');
    expect(alice.innerText).toEqual('Alice');
    expect(document.getElementById('ernserver1').innerText).toEqual('$15.00');


    let ronJon = document.getElementById('namserver2');
    expect(ronJon.innerText).toEqual('Ron Jon');
    expect(document.getElementById('ernserver2').innerText).toEqual('$15.00');

  });


  it('check entries', function () {
    expect(Object.keys(allPayments).length).toEqual(2);

    expect(document.getElementById('billDom1').innerText).toEqual('$100');
    expect(document.getElementById('tipDom1').innerText).toEqual('$20');
    expect(document.getElementById('percentDom1').innerText).toEqual('20%');

    expect(document.getElementById('billDom2').innerText).toEqual('$100');
    expect(document.getElementById('tipDom2').innerText).toEqual('$10');
    expect(document.getElementById('percentDom2').innerText).toEqual('10%');
  });

  it('check totals', function () {
    expect(document.getElementById('bTot').innerText).toEqual('$200');
    expect(document.getElementById('tTot').innerText).toEqual('$30');
    expect(document.getElementById('avg').innerText).toEqual('15%');
  });


  afterEach(function () {
    // teardown logic
    allServers = {};
    serverTbody.innerHTML = '';
    serverId = 0;
    allPayments = {};
    paymentTbody.innerHTML = '';
    paymentId = 0;
  });


});



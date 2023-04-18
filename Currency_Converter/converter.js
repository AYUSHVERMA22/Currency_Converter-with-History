// define exchange rates
const exchangeRates = {
    USD: { EUR: 0.83, JPY: 110.22 },
    EUR: { USD: 1.20, JPY: 131.15 },
    JPY: { USD: 0.0091, EUR: 0.0076 }
  };
  
  // retrieve conversion history from local storage
  let conversionHistory = JSON.parse(localStorage.getItem("conversionHistory")) || [];
  
  // display conversion history
  const historyList = document.getElementById("history");
  for (let i = conversionHistory.length - 1; i >= 0; i--) {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${conversionHistory[i].amount} ${conversionHistory[i].fromCurrency} = ${conversionHistory[i].result} ${conversionHistory[i].toCurrency} (${conversionHistory[i].date})`;
    
    // add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      conversionHistory.splice(i, 1);
      localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory));
      historyList.removeChild(historyItem);
    };
    historyItem.appendChild(deleteButton);
    
    historyList.appendChild(historyItem);
  }
  
  // function to convert currency
  function convert() {
    const PrimaryCurrency = document.getElementById("PrimaryCurrency").value;
    const SecondryCurrency = document.getElementById("SecondryCurrency").value;
    const amount = document.getElementById("amount").value;
    const result = exchangeRates[PrimaryCurrency][SecondryCurrency] * amount;
    const date = new Date().toLocaleString();

    // display result
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `${amount} ${PrimaryCurrency} = ${result.toFixed(2)} ${SecondryCurrency}`;
  
    // add conversion to history
    conversionHistory.push({ PrimaryCurrency, SecondryCurrency, amount, result: result.toFixed(2), date });
    localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory));
  
     // display conversion history
     const historyItem = document.createElement("li");
     historyItem.textContent = `${amount} ${PrimaryCurrency} = ${result.toFixed(2)} ${SecondryCurrency} (${date})`;
     historyList.insertBefore(historyItem, historyList.firstChild);
  }

  const browser = document.querySelector(".browser");
  const browserVersion = document.querySelector(".browser-version");
  const os = document.querySelector(".os");

  browser.innerHTML =platform.name;
  browserVersion.innerHTML =platform.version;
  os.innerHTML =platform.os;
  
  // var currentDate= new Date();
  // var day = currentDate.getDate();
  // var month = currentDate.getMonth();
  // var year =currentDate.getFullYear();
  // var fullDate = day +"/" + month +"/" +year;
  // document.write("Date:" ,fullDate);

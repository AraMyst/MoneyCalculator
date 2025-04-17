<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Interactive Calculator</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .calculator {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 320px;
      overflow: hidden;
    }
    .display {
      background-color: #e0e7ff;
      color: #0d1b2a;
      font-size: 2em;
      text-align: right;
      padding: 20px;
      word-wrap: break-word;
      min-height: 60px;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1px;
      background-color: #cbd5e1;
    }
    .button {
      background-color: #f1f5f9;
      border: none;
      padding: 20px;
      font-size: 1.5em;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #e2e8f0;
    }
    .operator {
      background-color: #2196f3;
      color: #ffffff;
    }
    .operator:hover {
      background-color: #1976d2;
    }
    #equals {
      grid-column: span 4;
      background-color: #0d47a1;
      color: #ffffff;
    }
    #equals:hover {
      background-color: #1565c0;
    }
    .history {
      max-height: 150px;
      overflow-y: auto;
      background-color: #f9fafb;
      border-top: 1px solid #cbd5e1;
      padding: 10px;
      font-size: 0.9em;
      color: #1e293b;
    }
    .history p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <div class="display" id="display">0</div>
    <div class="buttons">
      <div class="button" data-value="7">7</div>
      <div class="button" data-value="8">8</div>
      <div class="button" data-value="9">9</div>
      <div class="button operator" data-value="/">/</div>
      <div class="button" data-value="4">4</div>
      <div class="button" data-value="5">5</div>
      <div class="button" data-value="6">6</div>
      <div class="button operator" data-value="*">*</div>
      <div class="button" data-value="1">1</div>
      <div class="button" data-value="2">2</div>
      <div class="button" data-value="3">3</div>
      <div class="button operator" data-value="-">-</div>
      <div class="button" data-value="0">0</div>
      <div class="button" data-value=".">.</div>
      <div class="button" id="clear">C</div>
      <div class="button operator" data-value="+">+</div>
      <div class="button" id="equals">=</div>
    </div>
    <div class="history" id="history"></div>
  </div>
  <script>
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const historyContainer = document.getElementById('history');
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let history = [];

    function updateDisplay(value) {
      display.textContent = value;
    }

    function updateHistory() {
      historyContainer.innerHTML = '';
      history.slice().reverse().forEach(item => {
        const p = document.createElement('p');
        p.textContent = item;
        historyContainer.appendChild(p);
      });
    }

    function compute(a, b, op) {
      const first = parseFloat(a);
      const second = parseFloat(b);
      let result = 0;
      switch (op) {
        case '+': result = first + second; break;
        case '-': result = first - second; break;
        case '*': result = first * second; break;
        case '/':
          if (second === 0) {
            alert("Division by zero is not allowed!");
            return first;
          }
          result = first / second;
          break;
      }
      return result;
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'clear') {
          currentInput = '';
          operator = null;
          previousInput = '';
          updateDisplay('0');
          return;
        }
        if (button.id === 'equals') {
          if (currentInput && previousInput && operator) {
            const equation = `${previousInput} ${operator} ${currentInput}`;
            const result = compute(previousInput, currentInput, operator);
            updateDisplay(result);
            history.push(`${equation} = ${result}`);
            updateHistory();
            previousInput = result;
            currentInput = '';
            operator = null;
          }
          return;
        }
        if (['+', '-', '*', '/'].includes(value)) {
          if (operator && currentInput === '') {
            operator = value;
          } else {
            if (!previousInput) {
              previousInput = currentInput || '0';
              currentInput = '';
            } else if (currentInput !== '') {
              const result = compute(previousInput, currentInput, operator);
              previousInput = result;
              currentInput = '';
              updateDisplay(result);
            }
            operator = value;
          }
        } else {
          currentInput += value;
          updateDisplay(currentInput);
        }
      });
    });
  </script>
</body>
</html>

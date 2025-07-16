    let display = document.getElementById('display');
    let input = '';

    function appendValue(val) {
      if (display.innerText === '0' && val !== '.') {
        input = val;
      } else {
        input += val;
      }
      display.innerText = input;
    }

    function appendOperator(op) {
      if (input === '') return;
      const lastChar = input.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        input = input.slice(0, -1) + op;
      } else {
        input += op;
      }
      display.innerText = input;
    }

    function clearDisplay() {
      input = '';
      display.innerText = '0';
    }

    function calculate() {
      try {
        const result = eval(input);
        display.innerText = result;
        input = result.toString();
      } catch (err) {
        display.innerText = 'Error';
        input = '';
      }
    }

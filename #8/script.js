(() => {
  const gameBoard = document.getElementById("main-section");
  const createGameBoard = () => {
    const board = [
      [57, 58, 59, 60, 61, 62, 63, 64],
      ["", "", "", "", "#", "", "#", ""],
      [56, 55, 54, 53, 52, 51, 50, 49],
      ["", "", "", "", "", "", "", "#"],
      [41, 42, 43, 44, 45, 46, 47, 48],
      ["", "", "", "", "", "", "", ""],
      [40, 39, 38, 37, 36, 35, 34, 33],
      ["", "", "", "", "", "", "#", ""],
      [25, 26, 27, 28, 29, 30, 31, 32],
      ["", "", "", "", "", "#", "", ""],
      [24, 23, 22, 21, 20, 19, 18, 17],
      ["", "#", "", "", "", "", "", ""],
      [9, 10, 11, 12, 13, 14, 15, 16],
      ["", "", "", "", "", "", "", "#"],
      [8, 7, 6, 5, 4, 3, 2, 1],
      ["", "", "#", "", "", "", "", ""],
    ];

    const table = document.createElement("table");
    for (let row of board) {
      const tableRow = document.createElement("tr");
      table.appendChild(tableRow);
      for (let cell of row) {
        const tableData = document.createElement("td");
        if (cell === "#") {
          tableData.innerText = "#";
          tableData.classList.add("hashtag");
        } else {
          tableData.innerText = cell;
        }

        tableRow.appendChild(tableData);
      }
    }

    gameBoard.appendChild(table);
  };

  createGameBoard();
})();

(() => {
  const numberInputs = document.getElementById("numberInputs");
  const button = document.getElementById("matriz-button");
  const matrixResult = document.getElementById("matrixResult");
  for (let i = 0; i < 20; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.name = "number" + i;
    numberInputs.appendChild(input);
  }

  const generateMatrix = () => {
    const formData = new FormData(document.getElementById("numberForm"));
    const numbers = [];
    for (let value of formData.values()) {
      numbers.push(Number(value));
    }
    if (numbers.length !== 20) {
      alert("Por favor, introduce exactamente 20 números.");
      return;
    }

    const matrix = document.createElement("table");
    matrix.border = 1;

    for (let i = 0; i < 5; i++) {
      const tableRow = document.createElement("tr");

      for (let j = 0; j < 4; j++) {
        const tableData = document.createElement("td");
        tableData.innerText = numbers[i * 4 + j];
        tableRow.appendChild(tableData);
      }

      matrix.appendChild(tableRow);
    }
    matrixResult.innerHTML = "";
    matrixResult.appendChild(matrix);
  };

  button.addEventListener("click", (e) => generateMatrix());
})();

(() => {
  const root = document.getElementById("root");
  const mainTitle = document.getElementById("main-title");
  const mainSection = document.getElementById("main-section");

  const buttonsRenders = document.querySelectorAll(".button-render");
  let actualExercice = null;

  const TYPE_BUTTONS = { PRIMARY: "btn-primary", SECONDARY: "btn-secondary" };
  const TYPE_INPUTS = { TEXT: "text", NUMBER: "number" };

  const buttonHandleClick = (exerciseNumber) => {
    actualExercice = exerciseNumber - 1;
    buttonsRenders.forEach((b) => {
      try {
        const buttonExercise = parseInt(b.getAttribute("data-exercise-number"));
        if (buttonExercise === actualExercice + 1) {
          b.classList.add("button-active");
        } else {
          b.classList.remove("button-active");
        }
      } catch (e) {
        alert("Por favor no modifique los botones.");
        location.reload();
      }
    });
    renderMain();
  };

  buttonsRenders.forEach((button) => {
    const exercieNumber = button.getAttribute("data-exercise-number");
    if (exercieNumber)
      button.addEventListener("click", (e) => buttonHandleClick(exercieNumber));
  });

  const renderMain = () => {
    mainSection.innerHTML = "";
    if (actualExercice !== null) {
      const form = renderForm({
        exercise: Object.entries(EXERCISES)[actualExercice][1],
      });

      mainSection.appendChild(form);
    }
  };

  const validateNumbersData = (numbers) => {
    try {
      const numbersConvertes = numbers.map((value, key) => {
        if (!value) {
          throw new Error(`Número ${++key} no ingresado`);
        }
        const number = parseInt(value);
        return number;
      });

      return numbersConvertes;
    } catch (e) {
      alert(e.message);
    }
  };

  const renderForm = ({ exercise }) => {
    const form = document.createElement("form");
    form.classList.add("form");

    mainTitle.innerText = exercise.TITLE;
    mainTitle.classList.add("form-title");

    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");

    const labels = Object.entries(exercise.FORMS.LABELS).map(([key, value]) => {
      const label = document.createElement("label");
      label.innerText = value.TEXT;

      const input = document.createElement("input");
      input.placeholder = value.INPUTS.PLACEHOLDER;
      input.name = value.INPUTS.NAME;
      input.type = value.INPUTS.TYPE;

      label.appendChild(input);
      formDiv.appendChild(label);
      return label;
    });

    const buttons = Object.entries(exercise.FORMS.BUTTONS).map(
      ([key, value]) => {
        const button = document.createElement("button");
        button.classList.add(value.TYPE);
        button.innerText = value.TEXT;
        button.addEventListener("click", value.FUNCTION);
        return button;
      }
    );

    const buttonDivContainer = document.createElement("div");
    buttonDivContainer.classList.add("buttons-container-div");
    buttons.forEach((value, key) => {
      buttonDivContainer.appendChild(value);
    });

    formDiv.appendChild(buttonDivContainer);

    form.appendChild(formDiv);

    return form;
  };

  const showNumbersBiggerToSmaller = ({ numbers }) => {
    const orderedNumbers = numbers.sort((a, b) => b - a);
    return orderedNumbers;
  };

  const EXERCISES = {
    WHILE_NOT_CERO_SQUARE: {
      TITLE: "Número y su cuadrado",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese un número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number",
            },
          },
        },
        BUTTONS: {
          ADD_SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Calcular",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number");
              if (!firstNumber) return;

              let [n1] = validateNumbersData([firstNumber]);
              if (!n1) return;
              else {
                alert(`Su número al cuadrado es ${n1 ** 2}`);
                if (n1 !== 0) {
                  while (n1 !== 0) {
                    const newNumber = prompt("Ingrese el número");
                    if (!newNumber) break;
                    [n1] = validateNumbersData([newNumber]);
                    if (typeof n1 !== "number") break;
                    alert(`Su número al cuadrado es ${n1 ** 2}`);
                  }
                }
              }
            },
          },

          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const numberInput = document.querySelector(
                'input[name="number"]'
              );

              numberInput.value = "";
            },
          },
        },
      },
    },
    WHILE_NOT_CERO_EVEN_ODD: {
      TITLE: "Par o Impar",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese un número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number",
            },
          },
        },
        BUTTONS: {
          ADD_SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Calcular",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number");
              if (!firstNumber) return;

              let [n1] = validateNumbersData([firstNumber]);
              if (!n1) return;
              else {
                alert(`Su número es ${n1 % 2 !== 0 ? "impar" : "par"}`);

                if (n1 !== 0) {
                  while (n1 !== 0) {
                    const newNumber = prompt("Ingrese el número");
                    if (!newNumber) break;
                    [n1] = validateNumbersData([newNumber]);
                    if (typeof n1 !== "number") break;
                    if (!n1) break;
                    alert(`Su número es ${n1 % 2 !== 0 ? "impar" : "par"}`);
                  }
                }
              }
            },
          },

          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const numberInput = document.querySelector(
                'input[name="number"]'
              );

              numberInput.value = "";
            },
          },
        },
      },
    },

    WHILE_NOT_CERO_POSITIVE_NEGATIVE: {
      TITLE: "Número positivo o negativo",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese un número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number",
            },
          },
        },
        BUTTONS: {
          ADD_SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Calcular",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number");
              if (!firstNumber) return;

              let [n1] = validateNumbersData([firstNumber]);
              if (!n1) return;
              else {
                alert(`Su número es ${n1 < 0 ? "negativo" : "positivo"}`);

                if (n1 !== 0) {
                  while (n1 !== 0) {
                    const newNumber = prompt("Ingrese el número");
                    console.log(newNumber);
                    if (!newNumber) break;
                    [n1] = validateNumbersData([newNumber]);
                    if (typeof n1 !== "number") break;
                    alert(`Su número es ${n1 < 0 ? "negativo" : "positivo"}`);
                  }
                }
              }
            },
          },

          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const numberInput = document.querySelector(
                'input[name="number"]'
              );

              numberInput.value = "";
            },
          },
        },
      },
    },

    WHILE_NOT_CERO_RANDOM_NUMBER: {
      TITLE: "Adivine el número",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese un número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number",
            },
          },
        },
        BUTTONS: {
          ADD_SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Adivinar",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number");
              if (!firstNumber) return;

              let [n1] = validateNumbersData([firstNumber]);
              if (!n1) return;
              else {
                const randomNumber = Math.random() * 10;

                alert("Número incorrecto");
                if (n1 !== 0) {
                  while (n1 !== randomNumber) {
                    const newNumber = prompt("Ingrese el número");
                    if (!newNumber) break;
                    [n1] = validateNumbersData([newNumber]);
                    if (typeof n1 !== "number") break;
                    if (n1 === parseInt(randomNumber)) {
                      alert("¡Acertó!");
                      break;
                    }
                    alert("Número incorrecto");
                  }
                }
              }
            },
          },

          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const numberInput = document.querySelector(
                'input[name="number"]'
              );

              numberInput.value = "";
            },
          },
        },
      },
    },

    WHILE_NOT_CERO_PLUS_NUMBER: {
      TITLE: "Sumar números",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese un número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number",
            },
          },
        },
        BUTTONS: {
          ADD_SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Ingresar",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number");
              if (!firstNumber) return;
              let [n1] = validateNumbersData([firstNumber]);
              if (!n1) return;
              else {
                if (n1 !== 0) {
                  let total = n1;
                  while (n1 !== 0) {
                    const newNumber = prompt("Ingrese el número");
                    if (!newNumber) break;
                    [n1] = validateNumbersData([newNumber]);
                    if (typeof n1 !== "number") break;
                    if (n1 === 0) {
                      alert(`La suma total de sus numeros es ${total}`);
                      break;
                    }
                    total = total + n1;
                  }
                }
              }
            },
          },

          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const numberInput = document.querySelector(
                'input[name="number"]'
              );

              numberInput.value = "";
            },
          },
        },
      },
    },
  };

  window.addEventListener("DOMContentLoaded", () => {
    renderMain();
  });
})();

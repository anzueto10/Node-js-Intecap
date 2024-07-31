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
    ENTER_NUMBERS_AND_EQUALS_THEM: {
      TITLE: "Números Iguales",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese el primer número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number1",
            },
          },
          NUMBER_TWO: {
            TEXT: "Ingrese el segundo número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number2",
            },
          },
        },
        BUTTONS: {
          SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Ingresar el número.",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number1");
              const secondNumber = formData.get("number2");
              const convertedsNumbers = validateNumbersData([
                firstNumber,
                secondNumber,
              ]);
              if (!convertedsNumbers) return;
              else {
                if (convertedsNumbers[0] == convertedsNumbers[1])
                  alert(`Los números que ingresó son iguales`);
                else alert(`Los números que ingresó son distintos`);
              }
            },
          },
          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const number2Input = document.querySelector(
                'input[name="number1"]'
              );
              const number1Input = document.querySelector(
                'input[name="number2"]'
              );
              number1Input.value = "";
              number2Input.value = "";
            },
          },
        },
      },
    },
    ENTER_A_NUMER_AND_VALIDATE_IF_POSITIVE_OR_NEGATIVE: {
      TITLE: "Número positivo o negativo",
      FORMS: {
        LABELS: {
          NAME: {
            TEXT: "Ingrese el número",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number",
            },
          },
        },
        BUTTONS: {
          SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Validar el Número",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const number = formData.get("number");
              const convertedsNumbers = validateNumbersData([number]);
              if (!convertedsNumbers) return;
              else {
                if (number >= 0) alert("El número que ingresó es positivo");
                else alert("El número que ingresó es negativo");
              }
            },
          },
          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar número",
            FUNCTION: (e) => {
              e.preventDefault();
              const nameInput = document.querySelector('input[name="number"]');
              nameInput.value = "";
            },
          },
        },
      },
    },
    ENTER_NUMBERS_AND_ORDER_IT_TO_BIGER_TO_SMALLER_2: {
      TITLE: "Números en orden",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese el primer número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number1",
            },
          },
          NUMBER_TWO: {
            TEXT: "Ingrese el segundo número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number2",
            },
          },
        },
        BUTTONS: {
          SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Ingresar el número.",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number1");
              const secondNumber = formData.get("number2");
              const convertedsNumbers = validateNumbersData([
                firstNumber,
                secondNumber,
              ]);
              if (!convertedsNumbers) return;
              else {
                const orderedNumbers = showNumbersBiggerToSmaller({
                  numbers: convertedsNumbers,
                });
                alert(`Sus números en orden: \n ${orderedNumbers}`);
              }
            },
          },
          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const number2Input = document.querySelector(
                'input[name="number1"]'
              );
              const number1Input = document.querySelector(
                'input[name="number2"]'
              );
              number1Input.value = "";
              number2Input.value = "";
            },
          },
        },
      },
    },
    ENTER_NUMBERS_AND_ORDER_IT_TO_BIGER_TO_SMALLER_3: {
      TITLE: "Números en orden avanzado",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese el primer número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number1",
            },
          },
          NUMBER_TWO: {
            TEXT: "Ingrese el segundo número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number2",
            },
          },
          NUMBER_THREE: {
            TEXT: "Ingrese el tercer número.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "number3",
            },
          },
        },
        BUTTONS: {
          SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Ingresar el número.",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const firstNumber = formData.get("number1");
              const secondNumber = formData.get("number2");
              const thirdNumber = formData.get("number3");
              const convertedsNumbers = validateNumbersData([
                firstNumber,
                secondNumber,
                thirdNumber,
              ]);
              if (!convertedsNumbers) return;
              else {
                const orderedNumbers = showNumbersBiggerToSmaller({
                  numbers: convertedsNumbers,
                });
                alert(`Sus números en orden: \n ${orderedNumbers}`);
              }
            },
          },
          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar números.",
            FUNCTION: (e) => {
              e.preventDefault();
              const number1Input = document.querySelector(
                'input[name="number1"]'
              );
              const number2Input = document.querySelector(
                'input[name="number2"]'
              );
              const number3Input = document.querySelector(
                'input[name="number3"]'
              );
              number1Input.value = "";
              number2Input.value = "";
              number3Input.value = "";
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
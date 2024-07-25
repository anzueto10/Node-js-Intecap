(() => {
  const root = document.getElementById("root");
  const mainTitle = document.getElementById("main-title");
  const mainSection = document.getElementById("main-section");

  const buttonsRenders = document.querySelectorAll(".button-render");
  let actualExercice = null;

  root.getAttribute;

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

  const basicOperationsNumbers = ({ firstNumber, secondNumber }) => {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    const multiply = firstNumber * secondNumber;
    const minus = firstNumber - secondNumber;
    const plus = firstNumber + secondNumber;
    const dividedBy = firstNumber / secondNumber;

    return {
      multiply,
      minus,
      plus,
      dividedBy,
    };
  };

  const EXERCISES = {
    ENTER_NUMBERS: {
      TITLE: "Número ingresado",
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
              else
                alert(
                  `Los números que ingresó fueron estos: ${firstNumber} y ${secondNumber}`
                );
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
    ENTER_NAME: {
      TITLE: "Nombre ingresado",
      FORMS: {
        LABELS: {
          NAME: {
            TEXT: "Ingrese su nombre.",
            INPUTS: {
              TYPE: TYPE_INPUTS.TEXT,
              PLACEHOLDER: "Jorge...",
              NAME: "name",
            },
          },
        },
        BUTTONS: {
          SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Ingresar el nombre.",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const name = formData.get("name");

              if (!name) alert("Debe ingresar un nombre.");
              else {
                console.log(`Hola, buenas noches ${name}`);
                alert(
                  `Hola, buenas noches ${name}, por favor revisar la consola.`
                );
              }
            },
          },
          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar nombre.",
            FUNCTION: (e) => {
              e.preventDefault();
              const nameInput = document.querySelector('input[name="name"]');
              nameInput.value = "";
            },
          },
        },
      },
    },
    ENTER_NUMBERS_AND_MATH: {
      TITLE: "Calculadora básica",
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
                const { dividedBy, minus, multiply, plus } =
                  basicOperationsNumbers({ firstNumber, secondNumber });
                console.log(
                  `Las operaciones de ${firstNumber} y ${secondNumber} son: \n Suma: ${plus} \n Resta: ${minus} \n Multiplicación: ${multiply} \n División: ${dividedBy}`
                );
                alert(
                  "Por favor, mirar la consola para ver el resultado de sus operaciones."
                );
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
    DEGREES_FAHRENHEIT_TO_CELSIUS: {
      TITLE: "Convertor de temperaturas básica",
      FORMS: {
        LABELS: {
          NUMBER_ONE: {
            TEXT: "Ingrese cantidad de grados Celcius.",
            INPUTS: {
              TYPE: TYPE_INPUTS.NUMBER,
              PLACEHOLDER: "3,2,51,0...",
              NAME: "degrees",
            },
          },
        },
        BUTTONS: {
          SUBMIT: {
            TYPE: TYPE_BUTTONS.PRIMARY,
            TEXT: "Hacer conversión",
            FUNCTION: (e) => {
              e.preventDefault();
              const formData = new FormData(e.target.form);
              const degrees = formData.get("degrees");
              const convertedsNumbers = validateNumbersData([degrees]);
              if (!convertedsNumbers) return;
              else {
                const degreesCelciusToFarenheit = (degrees * 9) / 5 + 32;
                alert(
                  `${degrees} grados Celcius convertidos a Farenheit serían: ${degreesCelciusToFarenheit}`
                );
              }
            },
          },
          CANCEL: {
            TYPE: TYPE_BUTTONS.SECONDARY,
            TEXT: "Borrar número.",
            FUNCTION: (e) => {
              e.preventDefault();
              const numberInput = document.querySelector(
                'input[name="degrees"]'
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

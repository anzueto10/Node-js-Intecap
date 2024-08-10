(() => {
  const ammountPageData = document.getElementById("account-ammount");
  const datePageData = document.getElementById("account-created-at-date");
  const depositButton = document.getElementById("deposit-button");
  const withdrawButton = document.getElementById("withdraw-button");
  const ammountInput = document.getElementById("ammount");
  let banckAccount;
  class BankAccount {
    ammount = 0;
    constructor() {
      this.createdAt = new Date();
      this.ammount = this.ammount;
    }

    withdraw(ammount) {
      this.ammount -= ammount;
    }

    deposit(ammount) {
      this.ammount += ammount;
    }
  }

  const createBanckAccount = () => {
    banckAccount = new BankAccount();
  };

  const fillDocumentData = () => {
    ammountPageData.innerText = parseFloat(banckAccount.ammount).toFixed(2);
    datePageData.innerText = banckAccount.createdAt;
  };

  depositButton.addEventListener("click", () => {
    const ammount = new Number(ammountInput.value);
    if (!ammount) {
      alert("Por favor, ingrese un monto en el input");
      return;
    }
    if (ammount < 25) {
      alert("El monto debe ser mayor que Q 25.00");
      return;
    }
    banckAccount.deposit(ammount);
    fillDocumentData();
  });

  withdrawButton.addEventListener("click", () => {
    const ammount = new Number(ammountInput.value);
    if (!ammount) {
      alert("Por favor, ingrese un monto en el input");
      return;
    }
    if (ammount > banckAccount.ammount) {
      alert("Saldo Insuficiente para retirar");
      return;
    }
    banckAccount.withdraw(ammount);
    fillDocumentData();
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    createBanckAccount();
    fillDocumentData();
  });
})();

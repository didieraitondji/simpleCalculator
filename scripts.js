var answer = false;

var e1 = document.getElementById("e1");
var e2 = document.getElementById("e2");

var toucheC = document.querySelectorAll("#touchec");
var toucheeffaceTout = document.getElementById("toucheefface");

e1.addEventListener("", resultat);

toucheeffaceTout.addEventListener("click", () => {
  e1.innerHTML = "0";
  answer = false;
});

var toucheeffaceun = document.getElementById("toucheeffaceun");
toucheeffaceun.addEventListener("click", () => {
  if (e1.textContent.length !== 1) {
    e1.innerHTML = ChaineMoinsUn(e1.textContent);
  } else {
    if (e1.textContent !== "0") {
      e1.innerHTML = "0";
    }
  }
});

toucheC.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(e1.textContent);
    if (e1.textContent == "0") {
      e1.innerHTML = element.textContent;
    } else {
      e1.innerHTML = e1.textContent + element.textContent;
    }
  });
});

var toucheOp = document.querySelectorAll("#toucheop");
toucheOp.forEach((element) => {
  element.addEventListener("click", () => {
    if (e1.textContent[e1.textContent.length - 1] !== element.textContent) {
      if (answer) {
        e1.innerHTML = e2.textContent + element.textContent;
        answer = false;
      } else {
        if (isOperation(e1.textContent[e1.textContent.length - 1])) {
          e1.innerHTML = ChaineMoinsUn(e1.textContent) + element.textContent;
        } else {
          e1.innerHTML = e1.textContent + element.textContent;
        }
      }
    } else if (answer) {
      e1.innerHTML = e2.textContent + element.textContent;
      answer = false;
    }
  });
});

var toucheEgale = document.getElementById("toucheEgale");
toucheEgale.addEventListener("click", () => {
  var result = 0;
  if (isOperation(e1.textContent[e1.textContent.length - 1])) {
    result = eval(e1.textContent + "0");
  } else {
    result = eval(e1.textContent);
  }

  if (result !== Infinity) {
    e2.innerHTML = result;
    answer = true;
  } else {
    e2.innerHTML =
      '<span class="text-red-600 text-lg font-bold">Opération Invalide </span>';
  }
});

var touchpt = document.getElementById("touchpt");
touchpt.addEventListener("click", () => {
  if (!isVisgule(e1.textContent)) {
    e1.innerHTML = e1.textContent + touchpt.textContent;
  }
});

// fonctions

function resultat() {
  var result = 0;
  if (isOperation(e1.textContent[e1.textContent.length - 1])) {
    result = eval(ChaineMoinsUn(e1.textContent));
  } else {
    result = eval(e1.textContent);
  }
  e2.innerHTML = result;
  answer = true;

  //console.log(eval(e1.textContent));
}

function ChaineMoinsUn(element) {
  var tab = "";
  for (let i = 0; i < element.length - 1; i++) {
    tab = tab + element[i];
  }
  return tab;
}

function isOperation(element) {
  var tab = ["*", "-", "+", "/"];
  for (let i = 0; i < tab.length; i++) {
    let courant = tab[i];
    if (courant === element) {
      return true;
    }
  }

  return false;
}

function isVisgule(element) {
  var dedans = false;
  for (let i = 0; i < element.length; i++) {
    if (isOperation(element[i])) {
      dedans = false;
    } else if (element[i] === ".") {
      dedans = true;
    }
  }

  return dedans;
}

// mutation observer

const config = { childList: true, characterData: true, subtree: true };

const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      resultat();
    }
    /*else if (mutation.type === "characterData") {
      console.log("Le texte d'une balise a été modifié.");
    } */
  }
});

observer.observe(e1, config);

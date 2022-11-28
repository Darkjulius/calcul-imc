const BMIDATA = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

//Comportement par défaut du bouton Calculer un IMC donc le Submit et j'appelle la fonction calculateBMI().
const FORM = document.querySelector("form");
console.dir(FORM);
FORM.addEventListener("submit", handleform);
function handleform(e) {
  e.preventDefault();
  console.log(e);
  calculateBMI();
}

/**
 * Dans la fonction calculateBMI(), je récupère les valeurs (poids et taille) saisi par l'utilisateur. Je vérifie les valeurs saisies avec un if et si erreur. J'appelle la fonction handleError().
 * Si la saisie est correcte. Je fais le calcul et affecté le résultat la variable BMI.
 * J'affiche le résulat en appelant la fonction showResulyt() qui prends en paramètre BMI.
*/ 
const INPUTS = document.querySelectorAll("input");
console.log(INPUTS);
function calculateBMI() {
  const HEIGHT = INPUTS[0].value;
  const WEIGHT = INPUTS[1].value;
  console.log(`Value height: ${HEIGHT}Cm. Value weight: ${WEIGHT}Kg`);

  //Je vérifie que les données saisies sont corrects.
  if (!HEIGHT || !WEIGHT || HEIGHT <= 0 || WEIGHT <= 0) {
    handleError();
    return;
  }
  const BMI = (WEIGHT / Math.pow(HEIGHT / 100, 2)).toFixed(1);
  console.log(BMI);
  showResult(BMI);
}

/**
 * La fonction handleError() permet d'afficher un message avec un style CSS précis.
 */
const DISPLAYBMI = document.querySelector(".bmi-value");
const RESULT = document.querySelector(".result");
function handleError() {
  DISPLAYBMI.textContent = "Erreur(s) !!!";
  DISPLAYBMI.style.color = "inherit";
  RESULT.textContent = "Merci de contrôler votre saisie";
}

/**
 * la fonction showResult() va faire un comparatif des objets stockés dans BMIDATA en fonction du résultat du calcul.
 * J'affiche le résultat et je lui donne un style.
 */
function showResult(BMI) {
  const RANK = BMIDATA.find((data) => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  });
  console.log(RANK);
  DISPLAYBMI.textContent = BMI;
  DISPLAYBMI.style.color = `${RANK.color}`;
  RESULT.textContent = `Résultat : ${RANK.name}`;
}

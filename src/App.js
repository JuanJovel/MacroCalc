
function App() {
  const styleLabel = {
    marginTop: "0",
    marginBottom: "0",
    paddingTop: "0.2em"
  };

  const styleQuantity = {
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "normal"
  };


  return (
    <div className="App" >
      <h1 style={{ marginBottom: "0" }}>MacroCalc</h1>
      <div className="grid">
        <label>Calorie goal:
          <input id="calories" placeholder="0" onChange={(e) => { validateField(e); calculateMacros() }} />
        </label>
        <label>Weight:
          <input id="weight" placeholder="0" onChange={(e) => { validateField(e); calculateMacros() }} />
        </label>
      </div>




      <article style={{ paddingTop: "1em", marginTop: "1em" }}>
        <div className="grid">
          <label>
            <h3 style={styleLabel}>Protein</h3>
            <div className="grid">
              <h4 id="proteinInCals" style={styleQuantity}>0.00 cal</h4>
              <h4 id="proteinInGrams" style={styleQuantity}>0.00 g</h4>
            </div>
          </label>
          <label>
            <h3 style={styleLabel}>Fat</h3>
            <div className="grid">
              <h4 id="fatInCals" style={styleQuantity}>0.00 cal</h4>
              <h4 id="fatInGrams" style={styleQuantity}>0.00 g</h4>
            </div>
          </label>

          <label>

            <h3 style={styleLabel}>Carbs</h3>
            <div className="grid">
              <h4 id="carbsInCals" style={styleQuantity}>0.00 cal</h4>
              <h4 id="carbsInGrams" style={styleQuantity}>0.00 g</h4>
            </div>
          </label>

        </div>
      </article>
    </div>
  );
}



function validateField(event) {

  if (isNaN(event.target.value) || event.target.value === "") {
    event.target.setAttribute("aria-invalid", "true");
    return;
  }

  var val = parseFloat(event.target.value);

  if (val <= 0) {
    event.target.setAttribute("aria-invalid", "true");
    return;
  }

  event.target.setAttribute("aria-invalid", "false");


}

function calculateMacros() {

  const calories = document.getElementById("calories")
  const weight = document.getElementById("weight")

  var invalidCals = document.getElementById("calories").getAttribute("aria-invalid");
  var invalidWeight = document.getElementById("weight").getAttribute("aria-invalid");

  if (invalidCals === "true" || invalidWeight === "true") {
    return;
  }

  var caloriesVal = parseFloat(calories.value) || 0;
  var weightVal = parseFloat(weight.value) || 0;

  // More validation of input values
  if (caloriesVal === 0 || weightVal === 0) {
    return;
  }

  if (caloriesVal < weightVal) {
    calories.setAttribute("aria-invalid", "true");
    return;
  }

  // Calculations
  var proteinInGrams = weightVal
  var fatInGrams = weightVal * 0.3

  var proteinInCalories = proteinInGrams * 4

  var fatInCalories = fatInGrams * 9

  var carbsInCalories = caloriesVal - proteinInCalories - fatInCalories

  var carbsInGrams = carbsInCalories / 4

  // Verify calculations are not negative

  if (proteinInCalories < 0 || proteinInGrams < 0 || fatInCalories < 0 || fatInGrams < 0 || carbsInCalories < 0 || carbsInGrams < 0) {
    calories.setAttribute("aria-invalid", "true");
    weight.setAttribute("aria-invalid", "true");
    return;
  }


  // Update the UI

  document.getElementById("proteinInCals").innerText = proteinInCalories.toFixed(2) + " cal"
  document.getElementById("proteinInGrams").innerText = proteinInGrams.toFixed(2) + " g"

  document.getElementById("fatInCals").innerText = fatInCalories.toFixed(2) + " cal"
  document.getElementById("fatInGrams").innerText = fatInGrams.toFixed(2) + " g"

  document.getElementById("carbsInCals").innerText = carbsInCalories.toFixed(2) + " cal"
  document.getElementById("carbsInGrams").innerText = carbsInGrams.toFixed(2) + " g"

}

export default App;

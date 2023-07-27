// Limit Waktu
let TIME_LIMIT = 600;

// element yang dibutuhkan
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_button");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accurate");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  quoteNo = Math.floor(Math.random() * paragraphs.length);
  current_quote = paragraphs[quoteNo];

  //   separate karakter dan buat element
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });

  //   roll ke quote pertama
  if (quoteNo < paragraphs.length - 1) quoteNo++;
  else quoteNo = 0;
}

function processCurrentText() {
  // dapatkan inputan text dan menjadikan split
  curr_input = input_area.value;
  curr_input_array = curr_input.split("");

  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    // karakter tidak diketik
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
      //   karakter benar
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
      // karakter salah
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      errors++;
    }
  });

  //   display number error
  error_text.textContent = total_errors + errors;

  // update accuracy
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal);

  //   jika belum semua maka respektif eror
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // total error
    total_errors += errors;

    // clear input area

    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;

    timeElapsed++;

    timer_text.textContent = timeLeft + "s";
  } else {
    finishGame();
  }
}

function finishGame() {
  // stop timer
  clearInterval(timer);

  //   disale input area
  input_area.disabled = true;

  // menampilkan text
  quote_text.textContent = "klik pada area yang ditentukan";

  //   display restart button
  restart_btn.style.display = "block";

  //   cpm dan wpm kalkulate
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  //   update cpm dan wpm
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  //   display cpm dan wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}

function startGame() {
  resetValues();
  updateQuote();

  // hilangkan dan mulai waktu
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = "Klik pada area yang ditentukan";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

// define waktu pengerjaan
let TIME_LIMIT = 10;

// define yang dibutuhkan dalam html
let timer_text = document.querySelector(".timer-number");
let wpm_text = document.querySelector(".wpm-number");
let cpm_text = document.querySelector(".cpm-number");
let error_text = document.querySelector(".error-number");
let accurate_text = document.querySelector(".accurate-number");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accurate_group = document.querySelector(".accurate");
let input_area = document.querySelector(".input_area");
let quote_text = document.querySelector(".typing-text")
let restart_btn = document.querySelector(".reset_button");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quote_not = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = paragraphs[quote_not];

    // separate
    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    // roll ke quote pertama
    if (quote_not < paragraphs.length - 1)
    quote_not++;
    else
    quote_not = 0;
}

function processCurrentText() {

    // input user
    curr_Input = input_area.value;
    curr_Input_Array = curr_Input.split('');

    // increment total karakter
    characterTyped++;

    errors = 0

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_Input_Array[index]

        // karakter tidak diketik
        if( typedChar == null ) {
            char.classlist.remove('correct_char');
            char.classlist.remove('incorrect_char');

            // karakter benar
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.add('incorrect_char');

            // karakter salah
        } else {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } 

        // increment karakter erors
        errors++;
    });

    // menampilkan banyakya eror
    error_text.textContent = totalErrors + errors;

    // update akurasi text
    let correctCharacters = (characterTyped - (totalErrors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accurate_text.textContent = Math.round(accuracyVal);

    // jika teks telah terketik maka tidak melihatkan eror
    if(curr_Input.length == current_quote.length) {
        updateQuote();

        // update total eror
        totalErrors += errors;

        // menghapus input area
        input_area.value = "";
    }
};

function updateTimer() {
    if (timeLeft > 0) {

        // mengurangi waktu
        timeLeft--;

        // menambah waktu elapsed
        timeElapsed++;

        // update waktu
        timer_text.textContent = timeLeft + "s";
    } else {
        // finish game
        finishGame();
    }
}



function startGame(){
    resetValues();
    updateQuote();

    // menghapus yang lama dan membuat yang baru
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function finishGame() {
    // menghentikan waktu dari loop
    clearInterval(timer);

    // disable input area
    input_area.disabled = true;

    // text akhir
    quote_text.textContent = "click restart untuk bermain lagi";

    // memunculkan display restart
    restart_btn.style.display = "block";

    // kalkulasi cpm dan wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    // update cpm dan wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
    
    // display cpm wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    totalErrors = 0;
    accuracy = 0;
    characterTyped = 0;
    quote_not = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = "Klik pada area ditentukan untuk memulai...";
    accuracy.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}
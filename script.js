const startScreen    = document.querySelector('.secao-inicio')
const gameScreen     = document.querySelector('.secao-game')

const countLetter    = document.getElementById('countLetter')
const woedEl         = document.getElementById('hangmanWord')
const sortWord       = document.getElementById('sortWord')
const tip            = document.getElementById('hangmanTip')
const tipEl          = document.querySelector('.tip')
const btnStartEl     = document.querySelector('.btn-comecar')
const hangmanword    = document.querySelector('.hangman-word')
const playedLettersEl   = document.querySelector('.played-letters')

const ccountEl       = document.querySelector('.ccount')
const ecountEl       = document.querySelector('.ccount')

const winModalEl     = document.getElementById('myModal')
const winModal       = new bootstrap.Modal(winModalEl, {})

const wordList       = ['Porche', 'Gardenia', 'honintorinco', 'morango', 'Nabucodenozor', 'Nairob', 'Toquio', 'Mayame', 'Deus', 'Igreja', 'Trigronometria', 'Arteria', 'Cardio', 'Coracao', 'kinbely', 'Gucci', 'Tifany']
const randomWord     = () => Math.floor(Math.random() * (16 - 0)) + 0

let word           = []
let playedLetters  = [] 
let gameStarted    = false
let ccount         = 0
let ecount         = 0
let modalopened    = false

gameScreen.classList.add('d-none')

woedEl.addEventListener('keyup', e => {
    countLetter.textContent = woedEl.value.length
})

sortWord.addEventListener('click', () => {
    woedEl.disabled = sortWord.checked
    tip.disabled = sortWord.checked
})

let startGame = () => {

    if(woedEl.value.length > 0 || sortWord.checked){

        if(sortWord.checked){
            woedEl.value = wordList[randomWord()]
        }
   
        word = woedEl.value.toUpperCase().match(/[\w]/g)  

        word.forEach(letter => {
            hangmanword.innerHTML += `<div class="hangman-word-letter">
                                       <span class="hangman-word-letter-letter"></span>
                                    </div>`
                                
        })

        tipEl.textContent = tip.value

        startScreen.classList.add('d-none')
        gameScreen.classList.remove('d-none')

        gameStarted = true

    }
    
}
  
btnStartEl.addEventListener('click', startGame )

let verifyLetter = letter => {

    let haveInWord = word.filter(letra => letra == letter).length
    let havePlayedLetter = playedLetters.filter(l => l.letra == letter).length

    if(havePlayedLetter == 0){
        
        let objLetter = {"letra": letter, "tem": false}
    

        if(haveInWord > 0) {

            objLetter.tem = true

            word.forEach((l, i) => {
                if(letter == l){
                    document.querySelectorAll('.hangman-word-letter-letter')[i].textContent = l
                    ccount++
                }
            })
            
        }else {
            ecount++
        }

        playedLetters.push(objLetter)
        
        playedLettersEl.innerHTML = ''
        playedLetters.forEach(l => {
            if(l.tem){
                playedLettersEl.innerHTML += `<span class="mix-1 text-success">${l.letra}</span>`
            }else{
                playedLettersEl.innerHTML += `<span class="mix-1">${l.letra}</span>`
            }
        
        })

        ccountEl.textContent = ccount
        ecountEl.textContent = ecount

        if(ccount == word.length){

            winModalEl.querySelector('.modal-body').innerHTML = `<p>você acertou a palavra <span class="fw-bold">'${ word.value}'.</span>.</p>
            <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
            <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ccount}</span></p>`

            gameStarted = false

            winModal.show()

        }else if(ecount >= 7){

            winModalEl.querySelector('.modal-body').innerHTML = `<p>você perdeu a palavra era <span class="fw-bold">'${ word.value}'</span>.</p>
            <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ecount}</span></p>
            <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ecount}</span></p>`

            gameStarted = false

            winModal.show()
        }

    }
}

    document.addEventListener('keypress', e => {
        let key = e.key.toUpperCase()

        if(gameStarted){
            verifyLetter(key)
        }else if(key == 'ENTER' && !modalopened){
            startGame()
        }

    })

    winModalEl.addEventListener('show.bs.modal', () => {
        modalopened = true
    })

winModalEl.addEventListener('hide.bs.modal', () => {

    winModalEl.value = ''
    tipEl.value = ''

    startScreen.classList.remove('d-none')
    gameScreen.classList.add('d-none')

    word = []
    playedLetters = []
    gameStarted = false
    ccount = 0
    ecount = 0

    hangmanword.innerHTML = ''
    playedLettersEl.innerHTML = ''
    ccountEl.textContent = 0
    ecountEl.textContent = 0

    modalopened = false

})

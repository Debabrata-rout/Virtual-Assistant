let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe() { 
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning")
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon")
    } else {
        speak("Good Evening")
    }
}

window.addEventListener('load', () => {
    wishMe()
})

if ('webkitSpeechRecognition' in window) {
    let recognition = new webkitSpeechRecognition(); // Use webkitSpeechRecognition

    recognition.onstart = function () {
        console.log("You can speak");
    };

    recognition.onresult = function (event) {
        let currentIndex = event.resultIndex
        let transcript = event.results[currentIndex][0].transcript
        content.innerText = transcript

        takeCommand(transcript.toLowerCase())
    };

    let btn = document.getElementById("btn"); // Assuming you have a button with id "btn"
    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none"
        voice.style.display = "block"
    });
} else {
    console.log("Speech Recognition API is not supported in this browser.");
}

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello what can I help you")
    } else if (message.includes("who are you")) {
        speak("I am your assistant , created by Debabrata Sir")
    } else if (message.includes("open youtube")) {
        speak("opening youtube...")
        window.open("https://www.youtube.com/", "_blank")
    } else if (message.includes("open chrome")) {
        speak("opening chrome...")
        window.open("http://google.com/", "_blank")
    } else if (message.includes("open facebook")) {
        speak("opening facebook...")
        window.open("https://www.facebook.com/", "_blank")
    } else if (message.includes("open instagram")) {
        speak("opening instagram...")
        window.open("https://www.instagram.com/", "_blank")
    } else if (message.includes("open calculator")) {
        speak("opening calculator...")
        window.open("calculator://",)
    } else if (message.includes("open whatsapp")) {
        speak("opening whatsapp...")
        window.open("whatsapp://",)
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", })
        speak("The current time is " + time)
    }
    else if (message.includes("today's date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", })
        speak("The current date is " + date)
    }
    else if (message.includes("today's day")) {
        let day = new Date().toLocaleString(undefined, { weekday: "long" })
        speak("The current day is  " + day)
    }
    else {
        let finaltext = "this is what i found on internet regarding" + message.replace("shifra", "") || message.replace("shifra", "")
        speak(finaltext)
        window.open(`https://www.google.com/search?q=${message.replace("shifra", "")}`, "_blank")
    }
}

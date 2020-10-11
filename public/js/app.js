const fetchWeather = (location, messageOne, messageTwo) => {
  messageTwo.textContent = "Loading";
  fetch(`/weather?location=${location}`).then((response) => {
    response.json().then((data) => {
      messageTwo.textContent = "";
      if (data.result === "error") {
        messageOne.textContent = data.message;
        console.log(data.message);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.result;
        console.log(data.location);
        console.log(data.result);
      }
    });
  });
};

const form = document.querySelector("form");
const input = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = input.value;
  messageOne.textContent = "";
  messageTwo.textContent = "";
  fetchWeather(location, messageOne, messageTwo);
});

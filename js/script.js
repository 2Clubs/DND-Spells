$("form").on("submit", handleGetData);

function handleGetData(event) {
  event.preventDefault();
  userInput = $input.val()
  $.ajax({
    url: `https://www.dnd5eapi.co/api/spells/${userInput}`,
  }).then(
    (data) => {
      movieData = data;
      render();
    },
    (error) => {
      console.log("bad request: ", error);
    }
  );
}
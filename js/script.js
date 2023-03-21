let spellData, userInput;

const $spellNameHeader = $(`<h3>Name</h3>`);
const $spellName = $(`<p id="name"></p>`);
const $spellDescHeader = $(`<p>Description</p>`);
const $spellDescOne = $(`<p id="description-one"></p>`);
const $spellDescTwo = $(`<p id="description-two"></p>`);
const $spellLevelHeader = $(`<p>Level</p>`);
const $spellLevel = $(`<p id="level"></p>`);
const $main = $(`main`);
const $input = $(`input[type="text"]`);

$("form").on("submit", handleGetData);

function handleGetData(event) {
  event.preventDefault();
  userInput = $input.val().replace(/\s+/g, "-").toLowerCase(); //https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case
  $.ajax({
    url: `https://www.dnd5eapi.co/api/spells/${userInput}`,
  }).then(
    (data) => {
      spellData = data;
      render();
      $input.val("");
      console.log(spellData);
    },
    (error) => {
      console.log("bad request: ", error);
    }
  );
}

function render() {
  $main.append($spellNameHeader);
  $main.append($spellName);
  $spellName.text(spellData.name);
  // $spellDesc.text(spellData.desc)
  $main.append($spellDescHeader);
  $main.append($spellDescOne);
  $main.append($spellDescTwo);
  $spellDescOne.text(spellData.desc[0]);
  $spellDescTwo.text(spellData.desc[1]);
  // $spellLevel.text(spellData.level)
  $main.append($spellLevelHeader);
  $main.append($spellLevel);
  $spellLevel.text(spellData.level);
}

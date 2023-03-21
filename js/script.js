let spellData, userInput;

const $spellNameHeader = $(`<h3>Name</h3>`);
const $spellName = $(`<p id="name"></p>`);
const $spellDescHeader = $(`<p>Description</p>`);
const $spellDesc = $(`<p id="description"></p>`);
const $spellLevelHeader = $(`<p>Level</p>`);
const $spellLevel = $(`<p id="level"></p>`);
const $main = $(`main`);
const $input = $(`input[type="text"]`);

$("form").on("submit", handleGetData);

function handleGetData(event) {
  event.preventDefault();
  userInput = $input.val();
  $.ajax({
    url: `https://www.dnd5eapi.co/api/spells/${userInput}`,
  }).then(
    (data) => {
      spellData = data;
      render();
        $input.val('');
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
  $main.append($spellDesc);
  $spellDesc.text(spellData.desc);
  // $spellLevel.text(spellData.level)
  $main.append($spellLevelHeader);
  $main.append($spellLevel);
  $spellLevel.text(spellData.level);
}
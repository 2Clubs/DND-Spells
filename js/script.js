let spellData, userInput

const $spellNameHeader = $(`<h3>Name</h3>`);
const $spellName = $(`<p id="name"></p>`);
const $spellDescHeader = $(`<p>Description</p>`);
const $spellDesc = $(`<p></p>`)
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
      // console.log(spellData);
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
  // $spellDesc.text(spellData.desc)0
  $main.append($spellDescHeader);
  $spellDesc.empty()
  for(let i in spellData.desc){
    $spellDesc.append($(`<p></p>`).text(spellData.desc[i]));
    console.log($spellDesc)
  }
  $main.append($spellDesc)
  $main.append($spellLevelHeader);
  $main.append($spellLevel);
  $spellLevel.text(spellData.level);
}

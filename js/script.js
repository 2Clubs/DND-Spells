let spellData, userInput;

const $spellNameHeader = $(`<h3>Name</h3>`);
const $spellName = $(`<p id="name"></p>`);
const $spellDescHeader = $(`<h4>Description</h4>`);
const $spellDesc = $(`<p id="description"></p>`);
const $spellLevelHeader = $(`<h4 class="level">Level: </h4>`);
const $spellLevel = $(`<p class="level"></p>`);
const $spellRangeHeader = $(`<h4 class="range">Range: </h4>`);
const $spellRange = $(`<p class="range"></p>`);
const $spellSchoolHeader = $(`<h4>School: </h4>`)
const $spellSchool = $(`<p id="school"></p>`)
const $spellMaterialsHeader = $(`<h4 class="materials">Materials</h4>`)
const $spellMaterials = $(`<p class="materials"></p>`)
const $main = $(`main`);
const $input = $(`input[type="text"]`);

$("form").on("submit", handleGetData);

function handleGetData(event) {
  if ($input.val() === ""){return}
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
  $main.append($spellLevelHeader);
  $main.append($spellLevel);
  $spellLevel.text(spellData.level);
  $main.append($spellSchoolHeader)
  $main.append($spellSchool)
  $spellSchool.text(spellData.school.name)
  $main.append($spellRangeHeader);
  $main.append($spellRange);
  $spellRange.text(spellData.range);
  $main.append($spellMaterialsHeader)
  $main.append($spellMaterials)
  $spellMaterials.text(spellData.material)
  // $spellDesc.text(spellData.desc)0
  $main.append($spellDescHeader);
  $spellDesc.empty();
  for (let i in spellData.desc) {
    $spellDesc.append($(`<p></p>`).text(spellData.desc[i]));
    // console.log($spellDesc);
  }
  $main.append($spellDesc);
}

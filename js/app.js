const seats = buildSeats();
const venueElement = document.getElementById("venue");

function createSeatButton(seat) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "seat";
  button.dataset.seatId = seat.id;
  button.dataset.category = seat.categoryId;
  button.dataset.state = seat.unavailable ? "unavailable" : "available";
  button.textContent = seat.number;

  const status = seat.unavailable ? ", unavailable" : "";
  button.setAttribute(
    "aria-label",
    `${seat.levelName}, row ${seat.row}, seat ${seat.number}, ${seat.categoryName}, ${formatPrice(seat.price)}${status}`
  );

  return button;
}

function createBlock(level, row, block) {
  const blockElement = document.createElement("div");
  blockElement.className = "block";
  blockElement.dataset.block = block.id;

  seats
    .filter(seat => seat.levelId === level.id && seat.row === row && seat.blockId === block.id)
    .forEach(seat => blockElement.appendChild(createSeatButton(seat)));

  return blockElement;
}

function createRow(level, row) {
  const rowElement = document.createElement("div");
  rowElement.className = "row";
  rowElement.dataset.row = row;

  level.blocks.forEach(block => rowElement.appendChild(createBlock(level, row, block)));

  return rowElement;
}

function createLevel(level) {
  const levelElement = document.createElement("section");
  levelElement.className = "level";
  levelElement.dataset.level = level.id;

  const title = document.createElement("h3");
  title.className = "level-title";
  title.textContent = level.name;
  levelElement.appendChild(title);

  level.rows.forEach(row => levelElement.appendChild(createRow(level, row)));

  return levelElement;
}

function renderVenue() {
  VENUE.levels.forEach(level => venueElement.appendChild(createLevel(level)));
}

renderVenue();

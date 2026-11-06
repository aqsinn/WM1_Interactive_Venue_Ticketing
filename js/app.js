const seats = buildSeats();
const seatsById = new Map(seats.map(seat => [seat.id, seat]));
const seatButtons = new Map();
const venueElement = document.getElementById("venue");
const detailsElement = document.getElementById("seat-details");
const addToCartButton = document.getElementById("add-to-cart");

let inspectedSeatId = null;

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

  seatButtons.set(seat.id, button);

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

function createRowLabel(row) {
  const label = document.createElement("span");
  label.className = "row-label";
  label.textContent = row;
  label.setAttribute("aria-hidden", "true");
  return label;
}

function createRow(level, row) {
  const rowElement = document.createElement("div");
  rowElement.className = "row";
  rowElement.dataset.row = row;

  rowElement.appendChild(createRowLabel(row));
  level.blocks.forEach(block => rowElement.appendChild(createBlock(level, row, block)));
  rowElement.appendChild(createRowLabel(row));

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

function renderPriceLegend() {
  const legend = document.getElementById("price-legend");

  Object.values(PRICE_CATEGORIES)
    .sort((a, b) => b.price - a.price)
    .forEach(category => {
      const item = document.createElement("li");
      item.className = "price-pill";

      const dot = document.createElement("span");
      dot.className = "price-dot";
      dot.style.background = `var(${category.colorVar})`;

      item.appendChild(dot);
      item.appendChild(document.createTextNode(`${category.name} ${formatPrice(category.price)}`));
      legend.appendChild(item);
    });
}

function renderSeatDetails(seat) {
  const list = document.createElement("dl");
  list.className = "details-list";

  const fields = [
    ["Section", `${seat.levelName} ${seat.blockName}`],
    ["Row", seat.row],
    ["Seat", seat.number],
    ["Category", seat.categoryName],
    ["Status", seat.unavailable ? "Unavailable" : "Available"],
    ["Price", formatPrice(seat.price)]
  ];

  fields.forEach(([label, value]) => {
    const wrapper = document.createElement("div");

    const term = document.createElement("dt");
    term.textContent = label;

    const description = document.createElement("dd");
    description.textContent = value;

    if (label === "Status" && seat.unavailable) {
      description.className = "status-unavailable";
    }

    wrapper.appendChild(term);
    wrapper.appendChild(description);
    list.appendChild(wrapper);
  });

  detailsElement.replaceChildren(list);
}

function updateAddToCartButton(seat) {
  addToCartButton.disabled = !seat || seat.unavailable;
}

function setSeatState(seatId, state) {
  seatButtons.get(seatId).dataset.state = state;
}

function clearInspection() {
  if (!inspectedSeatId) {
    return;
  }

  const previousSeat = seatsById.get(inspectedSeatId);
  const previousButton = seatButtons.get(inspectedSeatId);

  if (previousSeat.unavailable) {
    delete previousButton.dataset.inspected;
  } else {
    setSeatState(inspectedSeatId, "available");
  }

  inspectedSeatId = null;
}

function inspectSeat(seatId) {
  const seat = seatsById.get(seatId);

  if (!seat || seatId === inspectedSeatId) {
    return;
  }

  clearInspection();
  inspectedSeatId = seatId;

  if (seat.unavailable) {
    seatButtons.get(seatId).dataset.inspected = "true";
  } else {
    setSeatState(seatId, "inspected");
  }

  renderSeatDetails(seat);
  updateAddToCartButton(seat);
}

venueElement.addEventListener("click", event => {
  const button = event.target.closest(".seat");

  if (button) {
    inspectSeat(button.dataset.seatId);
  }
});

renderVenue();
renderPriceLegend();

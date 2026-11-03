
const CURRENCY = "₼";

const PRICE_CATEGORIES = {
  vip:     { id: "vip",     name: "VIP",              price: 80, colorVar: "--tier-vip" },
  center:  { id: "center",  name: "Orchestra Center", price: 55, colorVar: "--tier-center" },
  side:    { id: "side",    name: "Orchestra Side",   price: 35, colorVar: "--tier-side" },
  balcony: { id: "balcony", name: "Balcony",          price: 20, colorVar: "--tier-balcony" }
};


const VENUE = {
  name: "Velvet Hall Theatre",
  levels: [
    {
      id: "orchestra",
      name: "Orchestra",
      rows: ["A", "B", "C", "D", "E", "F", "G", "H"],
      rowCategoryOverrides: { A: "vip", B: "vip" },
      blocks: [
        { id: "left",   name: "Left",   seats: 4, category: "side" },
        { id: "center", name: "Center", seats: 8, category: "center" },
        { id: "right",  name: "Right",  seats: 4, category: "side" }
      ]
    },
    {
      id: "balcony",
      name: "Balcony",
      rows: ["A", "B", "C", "D", "E", "F"],
      rowCategoryOverrides: {},
      blocks: [
        { id: "left",   name: "Left",   seats: 5,  category: "balcony" },
        { id: "center", name: "Center", seats: 10, category: "balcony" },
        { id: "right",  name: "Right",  seats: 5,  category: "balcony" }
      ]
    }
  ]
};


const UNAVAILABLE_SEATS = new Set([
  // Orchestra
  "orchestra-A7", "orchestra-A8", "orchestra-B3", "orchestra-B10", "orchestra-B11",
  "orchestra-B14", "orchestra-C5", "orchestra-C6", "orchestra-C7", "orchestra-D1",
  "orchestra-D12", "orchestra-D13", "orchestra-E8", "orchestra-E9", "orchestra-F4",
  "orchestra-F15", "orchestra-F16", "orchestra-G6", "orchestra-G7", "orchestra-H2",
  "orchestra-H10", "orchestra-H11", "orchestra-H12",
  // Balcony
  "balcony-A3", "balcony-A4", "balcony-A10", "balcony-A11", "balcony-B8",
  "balcony-B17", "balcony-B18", "balcony-C1", "balcony-C14", "balcony-C15",
  "balcony-D5", "balcony-D6", "balcony-D7", "balcony-E12", "balcony-E20",
  "balcony-F9", "balcony-F10"
]);


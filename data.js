var DATA = [
    { user : 'admin', money : 1000, win : 0, lose : 0, deck : [], alive : 1, cardRank : []},
    { user: '1', money : 1000, deck : [], alive : 1, cardRank : []},
    { user: '2', money : 1000,  deck : [], alive : 1, cardRank : []},
    { user: '3', money : 1000, deck : [], alive : 1, cardRank : []}
  ];

var moneyTotal = 0;

var cardRank = [
  'Dead',
  "No pair",
  "One pair",
  "Three Straight",
  "Two pair",
  'Four Straight',
  "Three Card",
  "Five Straight",
  "Four Card"
];
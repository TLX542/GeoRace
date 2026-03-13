const EPITECH_NANCY_ANCHOR = {
  lat: 48.692558,
  lng: 6.188261,
};

const PREFAB_GHOSTS = [
  {
    id: 'dummy-nancy',
    name: 'Nancy Dummy Race (~0.5 km)',
    paceMsPerKm: 390000,
    checkpoints: [
      { lat: 48.69250000, lng: 6.18800000 },
      { lat: 48.69219444, lng: 6.18708333 },
      { lat: 48.69338889, lng: 6.18613889 },
      { lat: 48.69288889, lng: 6.18458333 },
      { lat: 48.69338889, lng: 6.18422222 },
      { lat: 48.69350000, lng: 6.18338889 },
    ],
    // Cumulative ghost time (ms from race start) at each checkpoint,
    // computed from the checkpoint distances and paceMsPerKm above.
    // Values are in ms; approximate display: CP0=0:00, CP1≈0:29, CP2≈1:28, CP3≈2:17, CP4≈2:41, CP5≈3:05
    ghostCheckpointTimes: [0, 29429, 87924, 137507, 161555, 185918],
  },
  {
    id: 'dummy-crous',
    name: "J'ai faim (~0.7 km)",
    paceMsPerKm: 390000,
    checkpoints: [
      { lat: 48.69255556, lng: 6.18813889 },
      { lat: 48.69283333, lng: 6.18902778 },
      { lat: 48.69352778, lng: 6.19080566 },
      { lat: 48.69388889, lng: 6.19197222 },
      { lat: 48.69466667, lng: 6.19341667 },
      { lat: 48.69541667, lng: 6.19513889 },
      { lat: 48.69519454, lng: 6.19680556 },
    ],
    // Cumulative ghost time (ms from race start) at each checkpoint,
    // computed from checkpoint distances at paceMsPerKm=390000 ms/km.
    // Values are in ms; approximate display: CP0=0:00, CP1≈0:28, CP2≈1:27, CP3≈2:04, CP4≈2:57, CP5≈3:56, CP6≈4:45
    ghostCheckpointTimes: [0, 28152, 87288, 124171, 177530, 236590, 285261],
  },
];

export { EPITECH_NANCY_ANCHOR, PREFAB_GHOSTS };

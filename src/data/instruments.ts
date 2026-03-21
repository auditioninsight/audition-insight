export interface Position {
  id: string;
  name: string;
}

export interface Instrument {
  id: string;
  name: string;
  family: string;
  positions: Position[];
}

export const instrumentData: Instrument[] = [
  {
    id: "violin",
    name: "Violin",
    family: "Strings",
    positions: [
      { id: "concertmaster", name: "Concertmaster" },
      { id: "associate-concertmaster", name: "Associate Concertmaster" },
      { id: "assistant-concertmaster", name: "Assistant Concertmaster" },
      { id: "section-violin", name: "Section Violin" }
    ]
  },
  {
    id: "viola",
    name: "Viola",
    family: "Strings",
    positions: [
      { id: "principal-viola", name: "Principal Viola" },
      { id: "assistant-principal-viola", name: "Assistant Principal Viola" },
      { id: "section-viola", name: "Section Viola" }
    ]
  },
  {
    id: "cello",
    name: "Cello",
    family: "Strings",
    positions: [
      { id: "principal-cello", name: "Principal Cello" },
      { id: "assistant-principal-cello", name: "Assistant Principal Cello" },
      { id: "section-cello", name: "Section Cello" }
    ]
  },
  {
    id: "double-bass",
    name: "Double Bass",
    family: "Strings",
    positions: [
      { id: "principal-double-bass", name: "Principal Double Bass" },
      { id: "assistant-principal-double-bass", name: "Assistant Principal Double Bass" },
      { id: "section-double-bass", name: "Section Double Bass" }
    ]
  },
  {
    id: "flute",
    name: "Flute",
    family: "Woodwinds",
    positions: [
      { id: "principal-flute", name: "Principal Flute" },
      { id: "assistant-principal-flute", name: "Assistant Principal Flute" },
      { id: "second-flute", name: "Second Flute" },
      { id: "piccolo", name: "Piccolo" }
    ]
  },
  {
    id: "oboe",
    name: "Oboe",
    family: "Woodwinds",
    positions: [
      { id: "principal-oboe", name: "Principal Oboe" },
      { id: "assistant-principal-oboe", name: "Assistant Principal Oboe" },
      { id: "second-oboe", name: "Second Oboe" },
      { id: "english-horn", name: "English Horn" }
    ]
  },
  {
    id: "clarinet",
    name: "Clarinet",
    family: "Woodwinds",
    positions: [
      { id: "principal-clarinet", name: "Principal Clarinet" },
      { id: "assistant-principal-clarinet", name: "Assistant Principal Clarinet" },
      { id: "second-clarinet", name: "Second Clarinet" },
      { id: "bass-clarinet", name: "Bass Clarinet" }
    ]
  },
  {
    id: "bassoon",
    name: "Bassoon",
    family: "Woodwinds",
    positions: [
      { id: "principal-bassoon", name: "Principal Bassoon" },
      { id: "assistant-principal-bassoon", name: "Assistant Principal Bassoon" },
      { id: "second-bassoon", name: "Second Bassoon" },
      { id: "contrabassoon", name: "Contrabassoon" }
    ]
  },
  {
    id: "horn",
    name: "Horn",
    family: "Brass",
    positions: [
      { id: "principal-horn", name: "Principal Horn" },
      { id: "assistant-principal-horn", name: "Assistant Principal Horn" },
      { id: "third-horn", name: "Third Horn" },
      { id: "second-horn", name: "Second Horn" },
      { id: "fourth-horn", name: "Fourth Horn" }
    ]
  },
  {
    id: "trumpet",
    name: "Trumpet",
    family: "Brass",
    positions: [
      { id: "principal-trumpet", name: "Principal Trumpet" },
      { id: "assistant-principal-trumpet", name: "Assistant Principal Trumpet" },
      { id: "second-trumpet", name: "Second Trumpet" },
      { id: "third-trumpet", name: "Third Trumpet" }
    ]
  },
  {
    id: "trombone",
    name: "Trombone",
    family: "Brass",
    positions: [
      { id: "principal-trombone", name: "Principal Trombone" },
      { id: "assistant-principal-trombone", name: "Assistant Principal Trombone" },
      { id: "second-trombone", name: "Second Trombone" },
      { id: "bass-trombone", name: "Bass Trombone" }
    ]
  },
  {
    id: "tuba",
    name: "Tuba",
    family: "Brass",
    positions: [
      { id: "principal-tuba", name: "Principal Tuba" }
    ]
  },
  {
    id: "timpani",
    name: "Timpani",
    family: "Percussion",
    positions: [
      { id: "principal-timpani", name: "Principal Timpani" }
    ]
  },
  {
    id: "percussion",
    name: "Percussion",
    family: "Percussion",
    positions: [
      { id: "principal-percussion", name: "Principal Percussion" },
      { id: "section-percussion", name: "Section Percussion" }
    ]
  },
  {
    id: "harp",
    name: "Harp",
    family: "Other",
    positions: [
      { id: "principal-harp", name: "Principal Harp" }
    ]
  }
];

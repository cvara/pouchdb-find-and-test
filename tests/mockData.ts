export interface Character {
  name: string;
  affiliation: string;
}

export const characters = [
  {
    _id: '1',
    name: 'Darth Vader',
    affiliation: 'Sith',
    age: 30,
    likes: ['apples', 'bananas'],
  },
  {
    _id: '2',
    name: 'Yoda',
    affiliation: 'Jedi',
    age: 900,
    likes: ['oranges'],
  },
  {
    _id: '3',
    name: 'Darth Sidius',
    affiliation: 'Sith',
    age: 65,
    likes: ['bananas', 'strawberries'],
  },
  {
    _id: '4',
    name: 'Obi-Wan Kenobi',
    affiliation: 'Jedi',
    age: 68,
    likes: ['bananas', 'oranges'],
  },
  {
    _id: '5',
    name: 'Qui-Gon Jin',
    affiliation: 'Jedi',
    age: 38,
    likes: ['apples'],
  },
];

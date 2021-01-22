import { setup, teardown } from './helpers';
import { characters, Character } from './mockData';

describe('mango querying', () => {
  let db: PouchDB.Database<Character>;

  beforeAll(async done => {
    db = await setup(characters, 'characters');
    done();
  });

  afterAll(async done => {
    await teardown(db);
    done();
  });

  it('[expected] $and on different properties', async done => {
    const { docs } = await db.find({
      selector: {
        $and: [
          { name: { $regex: /darth vader/i } },
          { affiliation: { $eq: 'Sith' } },
        ],
      },
    });
    expect(docs.length).toBe(1);
    expect(docs[0].name).toBe('Darth Vader');

    const { docs: docs2 } = await db.find({
      selector: {
        $and: [
          { name: { $regex: /darth vader/i } },
          { affiliation: { $eq: 'Jedi' } },
        ],
      },
    });
    expect(docs2.length).toBe(0);

    done();
  });

  it('[expected] $and on same scalar property w/ different operators', async done => {
    const { docs } = await db.find({
      selector: {
        $and: [{ age: { $gt: 20 } }, { age: { $lt: 40 } }],
      },
    });
    expect(docs.length).toBe(2);
    done();
  });

  it('[expected] $or on same array property w/ same operator', async done => {
    const { docs } = await db.find({
      selector: {
        $or: [
          { likes: { $elemMatch: { $regex: /bananas/i } } },
          { likes: { $elemMatch: { $regex: /apples/i } } },
        ],
      },
    });

    expect(docs.length).toBe(4);

    done();
  });

  it('[unexpected] $and on same scalar property w/ same operator', async done => {
    const { docs } = await db.find({
      selector: {
        $and: [
          {
            name: { $regex: /vader/i },
          },
          {
            // 👇 overrides first condition, "vader" is ignored
            name: { $regex: /darth/i },
          },
        ],
      },
    });
    console.log(
      'Characters containing keywords "darth" AND "vader" in their name: \n',
      docs
    );
    // 👇 this fails, result contains all docs containing "darth"
    expect(docs.length).toBe(1);
    expect(docs[0].name).toBe('Darth Vader');
    done();
  });

  it('[unexpected] $and on same array property w/ same operator', async done => {
    // 1st query
    const { docs } = await db.find({
      selector: {
        $and: [
          {
            likes: { $elemMatch: { $regex: /bananas/i } },
          },
          {
            // 👇 overrides first condition, "bananas" is ignored
            likes: { $elemMatch: { $regex: /apples/i } },
          },
        ],
      },
    });
    console.log('Characters that like "bananas" AND "apples": \n', docs);
    // 👇 this fails, result contains characters that like just apples
    expect(docs.length).toBe(1);
    expect(docs[0].name).toBe('Darth Vader');

    done();
  });
});

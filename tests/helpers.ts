import PouchDB from 'pouchdb';
import memoryAdapter from 'pouchdb-adapter-memory';
import find from 'pouchdb-find';
import { Character } from './mockData';

PouchDB.plugin(memoryAdapter);
PouchDB.plugin(find);

export const setup = async (
  documents: any[],
  collectionName = 'test_collection'
) => {
  const db = new PouchDB<Character>(collectionName, {
    adapter: 'memory',
  });
  await db.bulkDocs(documents);
  return db;
};

export const teardown = async (db: PouchDB.Database): Promise<void> => {
  await db.destroy();
};

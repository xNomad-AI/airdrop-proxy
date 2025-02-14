export const DB_NAME = 'airdrop-proxy';

export const COLLECTIONS = [
  {
    db: DB_NAME,
    name: 'airdropPrograms',
    indexes: [{ name: 1 }],
    uniqueIndexes: [{ name: 1 }],
  },
] as const;

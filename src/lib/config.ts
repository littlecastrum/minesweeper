export const DBConfig = {
  name: 'Minesweeper  DB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'boards',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'board', keypath: 'board', options: { unique: true } },
        { name: 'window', keypath: 'window', options: { unique: true } },
        { name: 'mines', keypath: 'mines', options: { unique: true } }
      ]
    }
  ]
};
import {Realm, createRealmContext} from '@realm/react';

// Define your object model
export class Affirmation extends Realm.Object {
  static schema = {
    name: 'Affirmation',
    properties: {
      _id: 'int',
      message: 'string',
      goal: 'int',
      datas: { type: 'list', objectType: 'Data', default: [] },
      created_at: 'string',
    },
    primaryKey: '_id',
  };
}

class Data extends Realm.Object {
  static schema = {
    name: 'Data',
    properties: {
      date: 'string',
      success: { type: 'bool', default: false, },
    },
  };
}

export class Achievement extends Realm.Object {
  static schema = {
    name: 'Achievement',
    properties: {
      _id: 'int',
      date: 'string',
      success: 'bool',
    },
    primaryKey: '_id',
  };
}

export class Mode extends Realm.Object {
  static schema = {
    name: 'Mode',
    properties: {
      _id: 'int',
      name: 'string',
      value: 'bool',
    },
    primaryKey: '_id',
  };
}

const config = {
  schema: [Affirmation, Data, Achievement, Mode],
  schemaVersion: 2,
};

export const DBContext = createRealmContext(config);
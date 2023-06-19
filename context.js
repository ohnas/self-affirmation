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

const config = {
  schema: [Affirmation, Data],
};

export const DBContext = createRealmContext(config);
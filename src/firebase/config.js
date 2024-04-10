// firebaseConfig.js

import {
  apiKey,
  appId,
  measurementId,
  messagingSenderId,
  storageBucket,
  projectId,
  authDomain,
  databaseURL,
} from "@env";
export default {
  apiKey: apiKey?.toString(),
  authDomain: authDomain?.toString(),
  databaseURL: databaseURL?.toString(),
  projectId: projectId?.toString(),
  storageBucket: storageBucket?.toString(),
  messagingSenderId: messagingSenderId?.toString(),
  appId: appId?.toString(),
  measurementId: measurementId?.toString(),
};

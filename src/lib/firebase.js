import { initializeApp } from 'firebase/app';

import { firebaseConfig } from 'config/constants';

const app = initializeApp(firebaseConfig);

export default app;

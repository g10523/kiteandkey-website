import { createRequire } from 'module';
const require = createRequire(import.meta.url);
export default require('../backend/src/server.js');

import { dirname } from "path";
import { fileURLToPath } from "url";

// Define the root directory path using require.main.filename
// const mainDir = dirname(require.main.filename);

// Define the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the root directory path using the directory of the current module
export const ROOT_DIR = dirname(__dirname);

// Export the main directory path
// export default mainDir;

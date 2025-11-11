import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROMPT_DIR = path.join(__dirname, 'ACTUAL_PROMPTS_V5.4');
const CONFIG_FILE = path.join(PROMPT_DIR, 'system-prompt-config.yaml');
const OUTPUT_FILE = path.join(__dirname, 'full_prompt.txt');

function readFile(filePath) {
  const absolutePath = path.join(PROMPT_DIR, filePath);
  try {
    return fs.readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${absolutePath}`, error);
    return '';
  }
}

function processStructureItem(item) {
  let content = '';

  const fileContent = item.path ? readFile(item.path) : '';
  if (fileContent) {
    content = fileContent;
  }

  if (item.children) {
    const childrenContent = item.children.map((child) => processStructureItem(child)).join('\n');
    content += childrenContent;
  }

  if (item.wrapperTag && content) {
    content = `<${item.wrapperTag}>\n${content}\n</${item.wrapperTag}>`;
  }

  return content;
}

function constructSystemPrompt() {
  try {
    const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const config = yaml.load(configContent);

    if (!config || !config.structure) {
      console.error('Invalid or empty config file.');
      return '';
    }

    return config.structure
      .map((item) => processStructureItem(item))
      .filter(Boolean)
      .join('\n'); // Using a clear separator for readability
  } catch (error) {
    console.error('Error constructing system prompt:', error);
    return '';
  }
}

const finalPrompt = constructSystemPrompt();
fs.writeFileSync(OUTPUT_FILE, finalPrompt);
console.log(`Prompt successfully written to ${OUTPUT_FILE}`);

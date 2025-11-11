import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'yaml'

const CONFIG_FILE = join(__dirname, 'system-prompt-config.yaml')

interface StructureItem {
  path: string
  name: string
  wrapperTag?: string
  children?: StructureItem[]
}

interface Config {
  structure: StructureItem[]
}

function readFile(path: string): string | null {
  const filePath = join(__dirname, path)
  return readFileSync(filePath, 'utf-8')
}

function loadConfig(): Config {
  const configContent = readFileSync(CONFIG_FILE, 'utf-8')
  return parse(configContent)
}

function processStructureItem(item: StructureItem): string {
  let content = ''

  const fileContent = item.path ? readFile(item.path) : ''
  if (fileContent) {
    content = fileContent
  }

  if (item.children) {
    const childrenContent = item.children.map((child) => processStructureItem(child)).join('')
    content += childrenContent
  }

  if (item.wrapperTag && content) {
    content = `<${item.wrapperTag}>\n${content}\n</${item.wrapperTag}>\n`
  }

  return content
}

export function constructSystemPrompt(): string {
  const config = loadConfig()

  return config.structure
    .map((item) => processStructureItem(item))
    .filter(Boolean)
    .join('\n')
}

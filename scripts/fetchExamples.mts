import fs from 'fs';
import path from 'path';
import type { DirectoryInfo, FileInfo } from '../utils/exampleFileUtils';

const makeDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf8');
};

const writeFile = (path: string, content: string) => {
  fs.writeFile(path, content, 'utf8', function (error) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`[Success] Write file: ${path}`);
  });
};

const getDirectories = (dirPath: string): string[] => {
  const directories: string[] = [];
  fs.readdirSync(dirPath, { withFileTypes: true }) //
    .forEach((file) => {
      if (file.isDirectory()) {
        directories.push(path.join(dirPath, file.name));
      }
    });

  return directories;
};

const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  if (parts.length === 1 || (parts[0] === '' && parts.length === 2)) {
    return '';
  }
  return parts.pop() || '';
};

type ObjectType = {
  [key: string]: string;
};

const LANGUAGE_MAP: ObjectType = {
  ts: 'typescript',
  js: 'javascript',
  vue: 'javascript',
  jsx: 'jsx',
  tsx: 'tsx',
  html: 'markup',
  css: 'css',
  scss: 'scss',
  json: 'json',
  md: 'markdown',
  kt: 'kotlin',
  kts: 'kotlin',
  swift: 'swift',
};

const getFileLanguage = (filename: string): string => {
  const extension = getFileExtension(filename);
  return LANGUAGE_MAP[extension] || extension;
};

const getFileContent = (filePath: string): string => {
  const extension = getFileExtension(filePath);
  // NOTE(chacha912): Image file is not supported.
  if (extension === 'ico' || extension === 'png' || extension === 'jpg') {
    return '';
  }

  return readFile(filePath);
};

const getAbsoultePath = (fullPath: string, basePath: string): string => {
  return fullPath.replace(basePath, '') || '/';
};

const getDirectoryInfo = (dirPath: string, basePath?: string): DirectoryInfo => {
  const _basePath = basePath || dirPath;
  const directoryInfo: DirectoryInfo = {
    isFile: false,
    name: dirPath.split('/').pop()!,
    path: getAbsoultePath(dirPath, _basePath),
    children: [] as (FileInfo | DirectoryInfo)[],
  };
  fs.readdirSync(dirPath, { withFileTypes: true }) //
    .forEach((file) => {
      const path = `${dirPath}/${file.name}`;
      if (file.isDirectory()) {
        const childInfo = getDirectoryInfo(path, _basePath);
        directoryInfo.children.unshift(childInfo);
      } else {
        const childInfo: FileInfo = {
          isFile: true,
          isOpen: false,
          language: getFileLanguage(file.name),
          name: file.name,
          path: getAbsoultePath(path, _basePath),
          content: getFileContent(path),
        };
        directoryInfo.children.push(childInfo);
      }
    });
  return directoryInfo;
};

const EXAMPLES_PATH = path.join(process.cwd(), 'temp/examples');
const EXAMPLES_OUTPUT_PATH = path.join(process.cwd(), 'examples');

const fetchExamples = () => {
  const exampleDirectories = getDirectories(EXAMPLES_PATH);
  exampleDirectories.forEach((dirPath) => {
    const exampleName = dirPath.replace(EXAMPLES_PATH + '/', '');
    const info = getDirectoryInfo(dirPath);
    const contents =
      `import { DirectoryInfo } from '@/utils/exampleFileUtils';
        export const FILE_INFO: DirectoryInfo = ` + JSON.stringify(info);
    const exampleOutputPath = path.join(EXAMPLES_OUTPUT_PATH, exampleName);
    makeDirectory(exampleOutputPath);
    writeFile(path.join(exampleOutputPath, `/fileInfo.ts`), contents);
  });
};

fetchExamples();

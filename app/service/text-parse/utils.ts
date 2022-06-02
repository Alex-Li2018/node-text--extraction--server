export function escapeClassName(className: string) {
  return className?.replace(/[ .]+/g, '-').replace(/[&]+/g, 'and').toLowerCase();
}

export function splitPath(path: string): [string, string] {
  const si = path.lastIndexOf('/') + 1;
  const folder = si === 0 ? '' : path.substring(0, si);
  const fileName = si === 0 ? path : path.substring(si);

  return [ folder, fileName ];
}

export function resolvePath(path: string, base: string): string {
  try {
    const prefix = 'http://docx/';
    const url = new URL(path, prefix + base).toString();
    return url.substring(prefix.length);
  } catch {
    return `${base}${path}`;
  }
}

export function keyBy<T = any>(array: T[], by: (x: T) => any): Record<any, T> {
  return array.reduce((a, x) => {
    a[by(x)] = x;
    return a;
  }, {});
}

export function blobToBase64(blob: Blob): any {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) { return target; }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        const val = target[key] ?? (target[key] = {});
        mergeDeep(val, source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return mergeDeep(target, ...sources);
}

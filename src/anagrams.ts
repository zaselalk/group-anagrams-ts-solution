export default function groupAnagrams(strs: string[]): string[][] {
  if (strs.length <= 1) {
    return [strs];
  }

  const map = new Map<string, string[]>();
  for (const str of strs) {
    const sortedStr = str.split("").sort().join("");
    if (!map.has(sortedStr)) {
      map.set(sortedStr, []);
    }
    map.get(sortedStr)!.push(str);
  }

  return Array.from(map.values())
    .map((group) => group.sort())
    .sort((a, b) => a.length - b.length);
}

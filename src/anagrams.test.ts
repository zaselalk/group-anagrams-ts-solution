import { describe, expect, it } from "vitest";
import groupAnagrams from "./anagrams";
describe("groupAnagrams", () => {
  it("should group anagrams together", () => {
    const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const expectedOutput = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
    expect(groupAnagrams(input)).toEqual(expectedOutput);
  });

  it("should return an empty array when given an empty array", () => {
    const input: string[] = [];
    const expectedOutput: string[][] = [[]];
    expect(groupAnagrams(input)).toEqual(expectedOutput);
  });

  it("should return the original array when given an array with one string", () => {
    const input = ["hello"];
    const expectedOutput = [["hello"]];
    expect(groupAnagrams(input)).toEqual(expectedOutput);
  });
});

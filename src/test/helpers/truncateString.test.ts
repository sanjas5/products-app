import { truncateString } from "../../app/helpers/truncateString";

describe("truncateString", () => {
  test("should return the string as is when its length is less than or equal to the specified number", () => {
    expect(truncateString("Hello", 10)).toBe("Hello");
    expect(truncateString("Hello", 5)).toBe("Hello");
  });

  test("should truncate the string and add '...' when its length exceeds the specified number", () => {
    expect(truncateString("Hello, World!", 5)).toBe("Hello...");
    expect(truncateString("This is a long sentence.", 10)).toBe(
      "This is a ..."
    );
  });

  test("should return the string as is if the limit is 0", () => {
    expect(truncateString("Hello", 0)).toBe("...");
  });
});

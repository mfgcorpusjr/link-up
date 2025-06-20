type Obj = Record<string, any>;

export const replaceEmptyWithNull = <T extends Obj>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  ) as T;
};

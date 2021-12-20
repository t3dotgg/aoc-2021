// deno-lint-ignore-file no-explicit-any

export const identity = <T>(x: T): T => x;

export function sumBy(array: ArrayLike<number>): number;

export function sumBy<T>(
  array: ArrayLike<T>,
  validator: (elt: T, index: number) => number | boolean
): number;

export function sumBy<T>(
  array: ArrayLike<T>,
  validator: (elt: any, index: number) => number | boolean = identity
): number {
  return Array.prototype.reduce.call(
    array,
    (accum: unknown, element: T, index: number) =>
      (accum as number) + (validator(element, index) as number),
    0
  ) as number;
}

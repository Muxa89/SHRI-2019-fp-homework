/*
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если функции будут написаны руками (без использования библиотеки) это не является ошибкой, например:
 *
 * const greaterThenOne = x => x > 1;
 * const length = x => x.length;
 * const lengthGreaterThenOne = compose(greaterThenOne, length);
 * Это — ок.
 *
 * Вот такая запись не очень хорошая, все таки потренируйтесь составлять композиции:
 * const lengthGreaterThenOne = x => x.length > 1;
 */

import { replace, length, compose, test, anyPass, allPass, not } from "ramda";

const replaceNumbers = replace(/[^0-9]/g, "");

const getNumbersCount = compose(
  length,
  replaceNumbers
);

const containsOnlyEng = test(/^[a-zA-Z0-9.+]+$/);

const lessThan = number => x => x < number;
const greaterThan = number => x => x > number;

const lessThanTwo = lessThan(2);
const lessThanFour = lessThan(4);
const lessThanFive = lessThan(5);
const lessThanEight = lessThan(8);
const lessThanTen = lessThan(10);

const greaterThanOne = greaterThan(1);
const greaterThanTwo = greaterThan(2);
const greaterThanThree = greaterThan(3);
const greaterThanFour = greaterThan(4);
const greaterThanFive = greaterThan(5);
const greaterThanEight = greaterThan(8);

/**
 * Функции для проверки выполнения условий с количеством цифр в строке
 */
const numberCountGreaterThanTwo = compose(
  greaterThanTwo,
  getNumbersCount
);

const numberCountLessThanTwo = compose(
  lessThanTwo,
  getNumbersCount
);

const numberCountLessThanFive = compose(
  lessThanFive,
  getNumbersCount
);

const numberCountGreaterThanOne = compose(
  greaterThanOne,
  getNumbersCount
);

const numberCountGreaterThanThree = compose(
  greaterThanThree,
  getNumbersCount
);

const numberCountGreaterThanFour = compose(
  greaterThanFour,
  getNumbersCount
);

/**
 * Функции для проверки выполнения условий с длиной строки
 */
const lengthLessThanFour = compose(
  lessThanFour,
  length
);

const lengthLessThanFive = compose(
  lessThanFive,
  length
);

const lengthLessThanEigth = compose(
  lessThanEight,
  length
);

const lengthLessThanTen = compose(
  lessThanTen,
  length
);

const lengthGreaterThanFive = compose(
  greaterThanFive,
  length
);

const lengthGreaterThanEight = compose(
  greaterThanEight,
  length
);

/**
 * Функции для проверки наличия конкретного символа в строке
 */
const containsFour = test(/4/);

const notContainsFour = compose(
  not,
  containsFour
);

const containsSeven = test(/7/);

// 1. Длина < 5 и кол-во цифр > 2 шт.
export const validateFieldN1 = allPass([
  lengthLessThanFive,
  numberCountGreaterThanTwo
]);

// 2. Длина < 5 и кол-во цифр < 2 шт.
export const validateFieldN2 = allPass([
  lengthLessThanFive,
  numberCountLessThanTwo
]);

// 3. Длина > 5 или кол-во цифр > 1 шт.
export const validateFieldN3 = anyPass([
  lengthGreaterThanFive,
  numberCountGreaterThanOne
]);

// 4. Длина < 10 и кол-во цифр > 2 шт. и одна из цифр равна "4"
export const validateFieldN4 = allPass([
  lengthLessThanTen,
  numberCountGreaterThanTwo,
  containsFour
]);

// 5. Длина < 10 и кол-во цифр > 1 шт. и ни одна из цифр не равна "4"
export const validateFieldN5 = allPass([
  lengthLessThanTen,
  numberCountGreaterThanOne,
  notContainsFour
]);

// 6. Длина > 5, или одна из цифр равна "7"
export const validateFieldN6 = anyPass([lengthGreaterThanFive, containsSeven]);

// 7. Длина > 8 и кол-во цифр > 3 шт. и только англ
export const validateFieldN7 = allPass([
  lengthGreaterThanEight,
  numberCountGreaterThanThree,
  containsOnlyEng
]);

// 8. Кол-во цифр < 5 шт. или только англ или одна из цифр равна "7"
export const validateFieldN8 = anyPass([
  numberCountLessThanFive,
  containsOnlyEng,
  containsSeven
]);

// 9. Длина < 8, кол-во цифр > 4 шт. только англ
export const validateFieldN9 = allPass([
  lengthLessThanEigth,
  numberCountGreaterThanFour,
  containsOnlyEng
]);

// 10. Длина < 4 или кол-во цифр > 2 шт. или только англ
export const validateFieldN10 = anyPass([
  lengthLessThanFour,
  numberCountGreaterThanTwo,
  containsOnlyEng
]);

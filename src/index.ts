import { Solution } from './model/Solution';

const fs = require('fs');

async function solve(day: any, part: any, debug: boolean): Promise<void> {
  if (typeof day !== 'number' || day < 0 || day > 24) throw new Error('Invalid input day!');
  if (typeof part !== 'number' || part < 0 || part > 2) throw new Error('Invalid input part!');

  const dayFixed = day.toString().padStart(2, '0');

  const importPath = `./solutions/Day${dayFixed}${part}`;
  const importData = await import(importPath);
  const importConstructors: any[] = Object.values(importData).filter(it => typeof it === 'function');

  if (!importConstructors.length) throw new Error(`Invalid import file '${importPath}'!`);

  const solution: Solution<any> = new importConstructors[0](debug);

  // Solve with tests

  console.log();
  console.log(`Test day ${day}:`);

  let testCounter = 0;
  for (const test of solution.tests) {
    testCounter += 1;

    const baseTestName = `Test ${testCounter}`;
    const testName = test.name ? `${baseTestName} ${test.name}` : baseTestName;

    try {
      const parsedInput = solution.parse(test.input);

      const output = solution.solve(parsedInput);

      if (output === test.expected) {
        console.error(`- Success: ${testName} passed. ✅`);
        continue;
      }

      console.error(`- AssertionError: ${testName} failed! ❌`);
      console.error(`  Expected '${test.expected}', got '${output}'.`);
    } catch (e) {
      console.error(`- ERROR: ${testName} failed! ❌`);
      console.error(e);
    }
  }

  console.log();

  // Solve with real input data

  const dataInputPath = `./src/data/${dayFixed}.txt`;

  if (!fs.existsSync(dataInputPath)) throw new Error(`Input data missing for day '${dayFixed}'!`);

  const realInput = fs.readFileSync(dataInputPath).toString();

  const realInputParsed = solution.parse(realInput);

  const realOutput = solution.solve(realInputParsed);

  console.log();
  console.log(`SOLUTION day ${day}: '${realOutput}'`);
  console.log();
}

(async () => {
  const argDay = process.argv.length > 2 ? parseInt(process.argv[2]) : 0;
  const argPart = process.argv.length > 3 ? parseInt(process.argv[3]) : 0;

  if (argDay && argPart) {
    await solve(argDay, argPart, true);

    return;
  }

  const parts = [1, 2];

  if (argDay) {
    for (const part of parts) {
      await solve(argDay, part, false);
    }

    return;
  }

  for (let day = 1; day <= 24; day++) {
    for (const part of parts) {
      await solve(day, part, false);
    }
  }
})();

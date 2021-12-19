import * as fs from 'fs';

function loadOutput(baseDataPath: string, part: number): string {
  const path = `${baseDataPath}/output${part}.txt`;

  if (!fs.existsSync(path)) return '';

  return fs.readFileSync(path).toString().trim();
}

async function loadAndSolve(day: any, part: any): Promise<void> {
  if (typeof day !== 'number' || day < 0 || day > 24) throw new Error('Invalid input day!');
  if (typeof part !== 'number' || part < 0 || part > 2) throw new Error('Invalid input part!');

  const dayFixed = day.toString().padStart(2, '0');

  const importPath = `./solutions/${dayFixed}`;
  const parseInputImportData = await import(`${importPath}/parseInput`);
  const partImportData = await import(`${importPath}/part${part}`);

  if (typeof parseInputImportData?.parseInput !== 'function') throw new Error(
    `Invalid parseInput file for day ${day}!`,
  );
  if (typeof partImportData?.tests !== 'object') throw new Error(
    `Invalid part file for day ${day}:${part}! Tests invalid.`,
  );
  if (typeof partImportData?.solve !== 'function') throw new Error(
    `Invalid part file for day ${day}:${part}! Solve function invalid.`,
  );

  const parseInput = parseInputImportData.parseInput;
  const tests = partImportData.tests;
  const solve = partImportData.solve;

  // Solve with tests

  console.log();
  console.log(`Test day ${day}:`);

  let testCounter = 0;
  for (const test of tests) {
    testCounter += 1;

    const baseTestName = `Test ${testCounter}`;
    const testName = test.name ? `${baseTestName} ${test.name}` : baseTestName;

    try {
      const parsedInput = parseInput(test.input);

      const output = solve(parsedInput);

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

  const baseDataPath = `./src/data/${dayFixed}`;
  const dataInputPath = `${baseDataPath}/input.txt`;

  if (!fs.existsSync(dataInputPath)) throw new Error(`Input data missing for day '${dayFixed}'!`);

  const expected = loadOutput(baseDataPath, part);

  const realInput = fs.readFileSync(dataInputPath).toString();

  const realInputParsed = parseInput(realInput);

  const realOutput = solve(realInputParsed);

  if (expected && expected != realOutput) {
    console.error(`SOLUTION day ${day}: AssertionError: expected: '${expected}', got '${realOutput}'! ❌`);
  } else {
    console.log(`SOLUTION day ${day}: '${realOutput}' ${expected ? '✅' : ''}`);
  }
  console.log();
  console.log();
}

(async () => {
  const argDay = process.argv.length > 2 ? parseInt(process.argv[2]) : 0;
  const argPart = process.argv.length > 3 ? parseInt(process.argv[3]) : 0;

  if (argDay && argPart) {
    (global as any).verbose = true;

    await loadAndSolve(argDay, argPart);

    return;
  }

  const parts = [1, 2];

  if (argDay) {
    for (const part of parts) {
      await loadAndSolve(argDay, part);
    }

    return;
  }

  for (let day = 1; day <= 24; day++) {
    for (const part of parts) {
      await loadAndSolve(day, part);
    }
  }
})();

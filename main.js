const arr = new Array(1e8).fill(1);

function forIteratorWithoutCache() {
  return new Promise((resolve) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    resolve("");
  });
}
function forIteratorWithCache() {
  return new Promise((resolve) => {
    let sum = 0;
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      sum += arr[i];
    }
    resolve("");
  });
}

function forEachFunc() {
  return new Promise((resolve) => {
    let sum = 0;
    arr.forEach((item) => (sum += item));
    resolve("");
  });
}

function forOfFunc() {
  return new Promise((resolve) => {
    let sum = 0;
    for (const item of arr) {
      sum += item;
    }
    resolve("");
  });
}

async function test(funcToBeCalled, type) {
  const start = Date.now();
  await funcToBeCalled();
  const end = Date.now();
  console.log(`Execution Time of ${type} : ${end - start}ms`);
}

async function testAll(times) {
  for (let i = 0; i < times; i++) {
    console.log(`Trial #${i + 1}`);

    await Promise.allSettled([
      test(forIteratorWithoutCache, "for-iterator without cache"),
      test(forIteratorWithCache, "for-iterator with cached"),
      test(forEachFunc, "for-each"),
      test(forOfFunc, "for-of"),
    ]);
  }
}

function repeatTest(times) {
  testAll(times);
}

repeatTest(3);

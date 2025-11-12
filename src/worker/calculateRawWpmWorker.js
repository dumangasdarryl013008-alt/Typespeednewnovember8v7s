// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  const { rawKeyStrokes, countDownConstant, countDown } = e.data;

  const timeElapsed = countDownConstant - countDown;
  const timeInMinutes = timeElapsed > 0 ? timeElapsed / 60.0 : 1 / 60.0;
  const roundedRawWpm = Math.round((rawKeyStrokes / 5) / timeInMinutes);

  postMessage(roundedRawWpm);
};

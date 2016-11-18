/**
 * Created by jrue on 16/11/18.
 */

import {
  Dimensions,
  PixelRatio,
} from 'react-native';

const XS = 'XS'; // 4S
const S = 'S'; // 5, 5S, 5C, SE
const M = 'M'; // 6, 6S
const L = 'L'; // 6+, 6s+

const kSortArray = [XS, S, M, L];

const kScales = {
  [XS]: 0.72,
  [S]: 0.85,
  [M]: 1,
  [L]: 1.1,
};

const kScreenSize = function () {
  const { width, height } = Dimensions.get('window');
  const W = Math.min(width, height);
  const H = Math.max(width, height);
  if (W < 320 || H < 560) {
    return XS; // 320x480
  }
  if (W < 360 || H < 640) {
    return S; // 320x568
  }
  if (W < 400 || H < 712) {
    return M; // 375x667
  }
  return L; // 414x736
}();

if (__DEV__) console.log(`Screen: ${kScreenSize} ${JSON.stringify(Dimensions.get('window'))}`);

module.exports = {
  size: kScreenSize,

  select(obj) {
    if (typeof obj === 'object') {
      const N = kSortArray.length;
      const index = kSortArray.indexOf(kScreenSize);
      const count = Math.max(index + 1, N - index);
      for (let i = 0; i < count; i++) {
        if (index + i < N) {
          const key = kSortArray[index + i];
          if (obj.hasOwnProperty(key)) {
            return obj[key];
          }
        }
        if (i > 0 && index - i >= 0) {
          const key = kSortArray[index - i];
          if (obj.hasOwnProperty(key)) {
            return obj[key];
          }
        }
      }
    }
    if (__DEV__) console.warn(`Screen: Unable to select ${obj}`);
    return obj;
  },

  scale(value4M) {
    if (typeof value4M === 'number') {
      return PixelRatio.roundToNearestPixel(value4M * kScales[kScreenSize]);
    }
    if (__DEV__) console.warn(`Screen: Unable to scale ${value4M}`);
    return value4M;
  },
};

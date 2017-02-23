/**
 * 描述： 对网络传输的封装
 * Created by jrue on 17/2/23.
 */
const URL_HOST = 'https://wac.jrue.cn';

const URL_BASE = `${URL_HOST}/api/v0/phone/oauth`;
const SIGN_WA = '#$1578ucuc-=';
const SIGN_BZ = '#$122uc-=';

function toBodyText(params, sign = SIGN_WA) {
  const bodyArray = Array.from(params);
  if (sign) {
    const signArray = bodyArray.map(item => String(item[1]));
    if (sign === SIGN_WA) {
      signArray.sort();
    }
    signArray.push(sign);
    bodyArray.push(['sign', signArray.join('&')]);
  }
  return bodyArray.map(
    array => array.map(
      item => encodeURIComponent(String(item))
    ).join('=')
  ).join('&');
}

function _post(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': body && body.length,
    },
    body,
  })
    .then((response) => response.text())
    .then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return Promise.reject(e);
      }
    });
}

module.exports = {
  // 示例：
  userInfo({ openId, token, type }) {
    const body = toBodyText([
      ['token', token],
      ['type', type],
      ['openid', openId],
    ]);
    return _post(`${URL_BASE}/userInfo`, body);
  },
};
/**
 * Copyright 2017 Google Inc., PhantomJS Authors All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(async() => {

const {Browser} = require('puppeteer');
const browser = new Browser();

const page = await browser.newPage();
await page.evaluateOnNewDocument(sniffDetector);
await page.goto('https://www.google.com', {waitUntil: 'networkidle'});
console.log('Sniffed: ' + (await page.evaluate(() => !!navigator.sniffed)));
browser.close();

})();

function sniffDetector() {
  let userAgent = window.navigator.userAgent;
  let platform = window.navigator.platform;

  window.navigator.__defineGetter__('userAgent', function() {
    window.navigator.sniffed = true;
    return userAgent;
  });

  window.navigator.__defineGetter__('platform', function() {
    window.navigator.sniffed = true;
    return platform;
  });
}
/*
* @Author: eleven
* @E-mail: eleven.image@gmail.com
* @Date:   2016-10-25 15:47:16
* @Last Modified by:   eleven
* @Last Modified time: 2016-12-28 22:05:07
*/

'use strict';

export function createSign(request) {
	let singStr;
    let watingSignStr = typeof request === 'string' ? request : JSON.stringify(request);
    watingSignStr = watingSignStr == "" ? watingSignStr : watingSignStr + watingSignStr.substr(watingSignStr.length % 2 == 0 ? watingSignStr.length / 2 : watingSignStr.length / 3);
    return singStr = md5(watingSignStr);
}

export function urlParam(label) {
	let url = {};
    window.location.search.slice(1).split('&').forEach( function(element, index) {
        let temp = element.split('=');
        url[temp[0]] = temp[1];
    });
	return url[label];
}
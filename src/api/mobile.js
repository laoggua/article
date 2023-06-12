import request from '../tool/request';

export function elogin(data){
    return request({
        url: 'api/api/mobile/elogin',
		method: 'post',
        data
    });
}
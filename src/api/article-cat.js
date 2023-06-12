import request from '../tool/request';

export function articleCat_add(data){
    return request({
        url: `api/api/articleCat/add`,
		method: 'post',
        data
    });
}

export function articleCat_all(){
    return request({
        url: `api/api/articleCat/all`,
		method: 'get',
    });
}

export function articleCat_cateName(data){
    return request({
        url: `api/api/articleCat/check/${data}`,
		method: 'get',
    });
}

export function articleCat_delete(data){
    return request({
        url: `api/api/articleCat/delete?id=${data}`,
		method: 'get',
    });
}

export function articleCat_edit(data){
    return request({
        url: `api/api/articleCat/edit`,
		method: 'post',
        data
    });
}

export function articleCat_one(data){
    return request({
        url: `api/api/articleCat/one?id=${data}`,
		method: 'get',
    });
}

export function articleCat_colums(data){
    return request({
        url: `api/api/articleCat?colums=${data}`,
		method: 'get',
    });
}

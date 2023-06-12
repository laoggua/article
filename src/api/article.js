import request from '../tool/request';

export function article_add(data){
    return request({
        url: 'api/api/article/add',
		method: 'post',
        data
    });
}

export function article_all(){
    return request({
        url: `api/api/article/all`,
		method: 'get',
    });
}

export function article_delete(data){
    return request({
        url: `api/api/article/delete/${data}`,
		method: 'get',
    });
}

export function article_edit(data){
    return request({
        url: 'api/api/article/edit',
		method: 'post',
        data
    });
}

export function article_getArticles(data){
    return request({
        url: `api/api/article/getArticles/${data}`,
		method: 'get',
    });
}

export function article_one(data){
    return request({
        url: `api/api/article/one?id=${data}`,
		method: 'get',
    });
}

export function article_page(data){
    return request({
        url: `api/api/article/page`,
		method: 'post',
        data
    });
}

export function article_cateId(data){
    return request({
        url: `api/api/article/${data}`,
		method: 'get',
    });
}

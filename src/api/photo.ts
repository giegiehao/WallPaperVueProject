import request from '@/utils/request'

export const wallPaper = (tag) => {
    // console.log("tag="+tag)
    let url = "/wallpaper";
    if (tag != "全部"){
        url += "?tags=" + tag
    }

    return request.get(url)
}

export const sortWallPaper = (tag) => {
    let url = "/wallpaper?tags=" + tag; 
    return request.get(url)
}

export const collectionWallPaper = (params) => request.post('/saveTheImage', params)

export const paginatedQueries = (params) => request.post('/paginatedQueries', params)
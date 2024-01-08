import request from '@/utils/request'

export const userLoginService = (username, password) => request.post('/user/login', {username, password})

export const userRegisterService = (username, password, email) => request.post('/user/register', {username, password, email})

export const uploaderInformation = (photold) => request.get('/wallpaper/queryByPhotoId?photoId='+photold)
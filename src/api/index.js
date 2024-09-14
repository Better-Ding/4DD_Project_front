import request from '@/utils/request'

// 例子
export function getOneDataResult(data) {
    return request({
      url: '/getModelRes',
      method: 'post',
      data: data
    })
}
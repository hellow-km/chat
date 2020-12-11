class DataUtil {

  public isSuccess(data: any) {
    if (data && data.info) {
      const info = data.info;
      if (info && info.success) {
        return true
      } else {
        return false
      }
    }
  }

  public getBody(data: any) {
    if (data && data.body) {
      const body = data.body
      return body
    } else {
      return data
    }
  }
}
export default new DataUtil()
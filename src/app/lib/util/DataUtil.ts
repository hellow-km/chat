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

}
export default new DataUtil()
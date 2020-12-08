export class AppSettings {
  // API url
  public static ROOT_API = 'http://localhost:8080/rms/api';
  // public static ROOT_API = Config.API + '/dev';
  public static API_LOGIN = AppSettings.ROOT_API + '/login';
  public static LOGIN_ROUTE = '/login';

  //nhanvien
  public static API_GET_NHANVIEN = AppSettings.ROOT_API + '/nhanvien/list-nhanvien';
  public static API_UPDATE_NHANVIEN = AppSettings.ROOT_API + '/nhanvien/update';

  //khachhang
  public static API_GET_KHACHHANG = AppSettings.ROOT_API + '/khachhang/list';
  public static API_UPDATE_KHACHHANG = AppSettings.ROOT_API + '/khachhang/update';

  //monan
  public static API_GET_MONAN = AppSettings.ROOT_API + '/monan/list';

  //hanghoa
  public static API_GET_HANGHOA = AppSettings.ROOT_API + '/hanghoa/list';
  public static API_UPDATE_HANGHOA = AppSettings.ROOT_API + '/hanghoa/update';
  public static API_UPDATE_SLHANGHOA = AppSettings.ROOT_API + '/hanghoa/editsoluong';

  //dvt
  public static API_GET_DONVITINH = AppSettings.ROOT_API + '/donvitinh/list';

  //nhacungcap
  public static API_GET_NHACUNGCAP = AppSettings.ROOT_API + '/nhacungcap/list';
  public static API_UPDATE_NHACUNGCAP = AppSettings.ROOT_API + '/nhacungcap/update';

  //datban
  public static API_GET_DATBAN = AppSettings.ROOT_API + '/datban/list';
  public static API_UPDATE_DATBAN = AppSettings.ROOT_API + '/datban/update';
  public static API_ADD_DATBAN = AppSettings.ROOT_API + '/datban/add';

  //ban
  public static API_GET_BAN = AppSettings.ROOT_API + '/ban/list';

  //ctmenu
  public static API_GET_CTMENU = AppSettings.ROOT_API + '/ctmenu/list';
  public static API_ADD_CTMENU = AppSettings.ROOT_API + '/ctmenu/add';

  //hoadon
  public static API_GET_HOADON = AppSettings.ROOT_API + '/hoadon/list';
  public static API_ADD_HOADON = AppSettings.ROOT_API + '/hoadon/add';
  public static API_UPDATE_HOADON = AppSettings.ROOT_API + '/hoadon/update';

  //menu
  public static API_ADD_MENU = AppSettings.ROOT_API + '/menu/add';

  //dondathang
  public static API_GET_DONDATHANG = AppSettings.ROOT_API + '/dondathang/list';
  public static API_ADD_DONDATHANG = AppSettings.ROOT_API + '/dondathang/add';
  public static API_UPDATE_DONDATHANG = AppSettings.ROOT_API + '/dondathang/update';

  //ctdondathang
  public static API_GET_CTDONDATHANG = AppSettings.ROOT_API + '/ctdondathang/list';
  public static API_ADD_CTDONDATHANG = AppSettings.ROOT_API + '/ctdondathang/add';

  //phieu nhap
  public static API_GET_PHIEUNHAP = AppSettings.ROOT_API + '/phieunhap/list';
  public static API_ADD_PHIEUNHAP = AppSettings.ROOT_API + '/phieunhap/add';

  //CT phieu nhap
  public static API_ADD_CTPHIEUNHAP = AppSettings.ROOT_API + '/ctphieunhap/add';
  public static API_GET_CTPHIEUNHAP = AppSettings.ROOT_API + '/ctphieunhap/list';


}

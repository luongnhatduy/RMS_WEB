export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'DashBoard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'banhang',
        data: {
          menu: {
            title: 'Bán Hàng',
            icon: 'ion-easel',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'datban',
            data: {
              menu: {
                title: 'Đặt bàn',
              }
            }
          },
          {
            path: 'hoadon',
            data: {
              menu: {
                title: 'Hóa Đơn',
              }
            }
          }
        ]
      },
      {
        path: 'hethong',
        data: {
          menu: {
            title: 'Quản Lý Hệ Thống',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'nhanvien',
            data: {
              menu: {
                title: 'Quản Lý Nhân Viên',
              }
            }
          },
          {
            path: 'khachhang',
            data: {
              menu: {
                title: 'Quản Lý Khách Hàng',
              }
            }
          },
          {
            path: 'thucdon',
            data: {
              menu: {
                title: 'Quản Lý Thực Đơn',
              }
            }
          },
          {
            path: 'monan',
            data: {
              menu: {
                title: 'Quản Lý Món Ăn',
              }
            }
          },
          {
            path: 'hanghoa',
            data: {
              menu: {
                title: 'Quản Lý Hàng Hóa',
              }
            }
          },
          {
            path: 'dathang',
            data: {
              menu: {
                title: 'Quản Lý Đặt Hàng',
              }
            }
          },
          {
            path: 'nhacungcap',
            data: {
              menu: {
                title: 'Quản Lý Nhà Cung Cấp',
              }
            }
          },
          {
            path: 'khuyenmai',
            data: {
              menu: {
                title: 'Quản Lý Khuyến Mãi',
              }
            }
          },
          {
            path: 'chung',
            data: {
              menu: {
                title: 'Quản Lý Chung',
              }
            }
          },
        ]
      },
      {
        path: 'baocao',
        data: {
          menu: {
            title: 'Báo Cáo',
            icon: 'ion-ios-list-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'doanhthu',
            data: {
              menu: {
                title: 'Doanh Thu',
              }
            }
          },
          {
            path: 'hanghoa',
            data: {
              menu: {
                title: 'Hàng Hóa',
              }
            }
          }
        ]
      },

      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'general.menu.login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'general.menu.register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Website',
            url: 'http://google.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];

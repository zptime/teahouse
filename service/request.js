const baseURL = "https://tea.qingnian8.com";

export function request(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + params.url,
      method: params.method || "POST",
      data: params.data || {},
      header: {
        "content-type": "application/json",
      },
      success: (res) => {
        if (res.data.errCode != 0) {
          reject(res.data);
          wx.showToast({
            title: res.data.errMsg,
            mask: true,
            icon: "error",
          });
          return;
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

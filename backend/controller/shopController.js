const uploadImageToShop = (request, data, path) => {
  const { file } = request;

  if (file) {
    data.other_orders.map(() => {});
    //   data.other_orders[path] = file.filename;
  }
  return data;
};

module.exports = {
  uploadImageToShop,
};

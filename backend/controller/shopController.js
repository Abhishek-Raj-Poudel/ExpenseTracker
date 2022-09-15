const uploadImageToShop = (request, data, path) => {
  const { file } = request;

  if (file) {
    data.other_orders.map(() => {});
  }
  return data;
};

module.exports = {
  uploadImageToShop,
};

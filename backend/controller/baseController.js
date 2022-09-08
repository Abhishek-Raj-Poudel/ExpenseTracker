const { default: mongoose } = require("mongoose");

let successOutput, errorOutput;

const fs = require("fs");
const imagePath = process.cwd() + "/public/images/";

//Internal Output giving functions
function successResponse(response, success) {
  response.json({ data: success, status: 200, msg: successOutput });
}
function errorResponse(response, error) {
  response.json({ data: error, status: 400, msg: errorOutput });
}

//functions that are exported
function getAllData(response, Model, outputName) {
  successOutput = `All ${outputName} found`;
  errorOutput = ` Error finding ${outputName}`;
  Model.find()
    .then((success) => {
      successResponse(response, success);
    })
    .catch((error) => {
      errorResponse(response, error);
    });
}

function addData(response, Model, outputName) {
  successOutput = `Success Adding ${outputName}`;
  errorOutput = ` Error adding ${outputName}`;
  Model.save()
    .then((success) => {
      successResponse(response, success);
    })
    .catch((error) => {
      errorResponse(response, error);
    });
}

function getDataById(request, response, Model, outputName) {
  successOutput = `${outputName} found successfully`;
  errorOutput = ` Error finding ${outputName}`;
  Model.findOne({
    _id: request.params.id,
  })
    .then((success) => {
      successResponse(response, success);
    })
    .catch((error) => {
      errorResponse(response, error);
    });
}

function updateDataById(request, response, Model, data, outputName) {
  successOutput = `${outputName} updated successfully`;
  errorOutput = ` Error updating ${outputName}`;
  const { id: id } = request.params;
  const { old_image } = request.body;
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (old_image) {
      fs.unlink(imagePath + old_image, (error) => {
        if (error) {
          response.json({ msg: `No such image ${old_image}` });
        }

        console.log("File deleted successfully");
      });
    }
    Model.updateOne({ _id: id }, { $set: data }, { upsert: true })
      .then((success) => {
        successResponse(response, success);
      })
      .catch((error) => {
        errorResponse(response, error);
      });
  } else {
    return response.status(404).json({ msg: `No order with id:${id}` });
  }
}

async function deleteDataById(request, response, Model, outputName) {
  successOutput = `${outputName} deleted successfully`;
  errorOutput = ` Error deleting ${outputName}`;
  const { id: id } = request.params;

  try {
    await Model.deleteOne({
      _id: id,
    });
    successResponse(response, true);
  } catch (error) {
    errorResponse(response, error);
  }
}

const deleteOrder = async (request, response, Model, outputName) => {
  successOutput = `${outputName} deleted successfully`;
  errorOutput = ` Error deleting ${outputName}`;
  const { id: id } = request.params;

  try {
    const order = await Model.findById(id);

    const image = order.image;
    if (image) {
      fs.unlinkSync(imagePath + image);
    }

    await Model.deleteOne({ _id: id });
    successResponse(response, true);
  } catch (error) {
    console.log(error);
    errorResponse(response, error);
  }
};

//Admin Dashboard
function adminDashboard(request, response, next) {
  successOutput = `Welcome to admin ${request.user.name}`;
  response.json(successResponse(response, request.user));
}

//after uploading image this will look at fieldname of uploaded file and assign filename to the uploaded file
//
const uploadImage = (request, data, path) => {
  const { file } = request;
  // console.log(request.file);
  if (file) {
    data[path] = file.filename;
  }
  return data;
};

const updateImage = (request, data, path) => {
  const { files } = request;
  if (files) {
    let old_images = data.image;
    let images = [];
    if (old_images) {
      console.log("here " + old_images);
      images = old_images.split(",");
    }

    for (file in files) {
      for (i = 0; i < path.length; i++) {
        for (j = 0; j < files[file].length; j++) {
          if (files[file][j].fieldname == path[i]) {
            if (files[file].length > 1) {
              images.push(files[file][j].filename);
            } else {
              data[path[i]] = files[file][j].filename;
              console.log("here");
            }
          }
        }

        data[path[i]] = images;
      }
    }
  }
  return data;
};

module.exports = {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
  adminDashboard,
  uploadImage,
  updateImage,
  deleteOrder,
};

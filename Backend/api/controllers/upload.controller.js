const multer = require('multer')
const httpStatus = require('http-status')
const { buildResponse } = require('../utils/buildResponse')
const { handleError } = require('../utils/handleError')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

/**
 * Uploads a file
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'No file uploaded' })
    }
    res.status(httpStatus.CREATED).json(buildResponse('FILE_UPLOADED', { file: req.file }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { uploadFile, upload }

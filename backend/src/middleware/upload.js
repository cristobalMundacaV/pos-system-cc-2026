const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storageDriver = process.env.STORAGE_DRIVER || 'local';

const buildUniqueName = (originalName) => {
  const extension = path.extname(originalName).toLowerCase();
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
};

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const extensionValid = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowed.test(file.mimetype);

  if (!extensionValid || !mimeValid) {
    return cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
  }

  cb(null, true);
};

const buildLocalStorage = () => {
  const uploadDir = path.join(__dirname, '..', '..', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, buildUniqueName(file.originalname)),
  });
};

const buildS3Storage = () => {
  const { S3Client } = require('@aws-sdk/client-s3');
  const multerS3 = require('multer-s3');

  const required = ['AWS_BUCKET_NAME', 'AWS_REGION'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Faltan variables de almacenamiento S3: ${missing.join(', ')}`);
  }

  const credentials =
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined;

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_S3_ENDPOINT || undefined,
    forcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
    credentials,
  });

  return multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_req, file, cb) => {
      cb(null, `uploads/${buildUniqueName(file.originalname)}`);
    },
  });
};

const storage = storageDriver === 's3'
  ? buildS3Storage()
  : buildLocalStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(process.env.UPLOAD_MAX_SIZE_MB || 5) * 1024 * 1024,
  },
});

module.exports = upload;
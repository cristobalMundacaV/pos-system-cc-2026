function getUploadedFileUrl(file) {
  if (!file) return null;

  // S3 / R2 / storage compatible
  if (file.location) {
    return file.location;
  }

  // Cuando se use CDN o dominio público personalizado
  if (file.key && process.env.STORAGE_PUBLIC_URL) {
    return `${process.env.STORAGE_PUBLIC_URL.replace(/\/$/, '')}/${file.key}`;
  }

  // Local development
  if (file.filename) {
    return `/uploads/${file.filename}`;
  }

  return null;
}

module.exports = { getUploadedFileUrl };
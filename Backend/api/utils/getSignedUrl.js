const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

/**
 * Generates a signed URL for an S3 object
 * @param {string} bucket - S3 bucket name
 * @param {string} key - S3 object key
 * @param {number} expiresIn - Expiration time in seconds
 */
const generateSignedUrl = async (bucket, key, expiresIn = 3600) => {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  })

  return await getSignedUrl(client, command, { expiresIn })
}

module.exports = { generateSignedUrl }

import { uploadData, getUrl, downloadData, list, remove } from 'aws-amplify/storage';

// S3 Storage operations
export const storage = {
  // Upload files to S3
  async uploadFile(file: File, key?: string) {
    try {
      const fileName = key || file.name;
      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          contentType: file.type
        }
      }).result;
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Get file from S3
  async getFile(key: string) {
    try {
      const result = await downloadData({
        key: key
      });
      return result;
    } catch (error) {
      console.error('Error getting file:', error);
      throw error;
    }
  },

  // Get file URL
  async getFileUrl(key: string) {
    try {
      const url = await getUrl({
        key: key
      });
      return url;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  },

  // List files in S3
  async listFiles(prefix?: string) {
    try {
      const result = await list({
        prefix: prefix || ''
      });
      return result;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  },

  // Delete file from S3
  async deleteFile(key: string) {
    try {
      const result = await remove({
        key: key
      });
      return result;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

export default storage;

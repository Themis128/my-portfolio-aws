import { Storage } from 'aws-amplify';

// S3 Storage operations
export const storage = {
  // Upload files to S3
  async uploadFile(file: File, key?: string) {
    try {
      const fileName = key || file.name;
      const result = await Storage.put(fileName, file, {
        contentType: file.type,
        progressCallback(progress) {
          console.log(`Upload progress: ${progress.loaded}/${progress.total}`);
        }
      });
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Get file from S3
  async getFile(key: string) {
    try {
      const result = await Storage.get(key, {
        download: true
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
      const url = await Storage.get(key);
      return url;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  },

  // List files in S3
  async listFiles(prefix?: string) {
    try {
      const result = await Storage.list(prefix || '');
      return result;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  },

  // Delete file from S3
  async deleteFile(key: string) {
    try {
      const result = await Storage.remove(key);
      return result;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

export default storage;

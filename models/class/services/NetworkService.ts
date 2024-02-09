import ConfigManager from '../db/ConfigManager.ts';

export const fetchBaseUrl = async () => {
  const configManager: ConfigManager = new ConfigManager();
  const idConfig = 'CFG7001';

  try {
    const configData = await configManager.findById(idConfig);
    if (configData) {
      return configData.baseUrl;
    }
  } catch (error) {
    console.error('error fetching baseUrl');
  }
};

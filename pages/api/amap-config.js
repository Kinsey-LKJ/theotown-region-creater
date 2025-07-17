// 高德地图配置API - 安全地提供客户端所需的配置
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    res.status(200).json({
      securityCode: process.env.AMAP_SECURITY_CODE,
      webKey: process.env.AMAP_WEB_KEY
    });
  } catch (error) {
    console.error('获取地图配置失败:', error);
    res.status(500).json({ 
      message: '获取配置失败',
      error: error.message 
    });
  }
}
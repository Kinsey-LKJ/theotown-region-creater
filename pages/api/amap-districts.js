// 高德地图行政区域API代理
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { keywords = '100000', subdistrict = '3', adcode } = req.query;

  // 使用传入的adcode或默认keywords
  const searchParam = adcode ? `keywords=${adcode}&subdistrict=0` : `keywords=${keywords}&subdistrict=${subdistrict}`;

  try {
    const response = await fetch(
      `https://restapi.amap.com/v3/config/district?${searchParam}&key=${process.env.AMAP_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`高德地图API请求失败: ${response.status}`);
    }

    const data = await response.json();
    
    // 返回数据给客户端
    res.status(200).json(data);
  } catch (error) {
    console.error('高德地图API请求错误:', error);
    res.status(500).json({ 
      message: '获取地图数据失败',
      error: error.message 
    });
  }
}
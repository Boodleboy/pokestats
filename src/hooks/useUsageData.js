import { useEffect, useState } from 'react'

const useUsageData = (options) => {
  const [data, setData] = useState({ loading: true })
  useEffect(() => {
    fetch('/data/byMonth/gen9ou/2023-11/0.json')
      .then((response) => response.json())
      .then((data) => {
        setData({
          ...data,
          loading: false
        });
      })
      .catch((error) => {
        console.error('Error fetching the JSON data:', error);
        setData({
          loading: false,
          error: error
        })
      });
  }, [options]);

  return data
}

export default useUsageData

import { useEffect, useState } from 'react'

const useUsageData = (options) => {
  const [data, setData] = useState({ loading: true })
  useEffect(() => {
    setData({ loading: true })
    let fetchString = '/data/'
    if (options.graphMode === 'bar') {
      fetchString += 'byMonth/' + 
        options.format + '/' +
        options.month + '/' +
        options.elo + '.json'
    } else {
      fetchString += 'byPokemon/' +
        options.format + '/' +
        options.pokemon + '/' +
        options.elo + '.json'
    }
    fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        setData({
          body: data,
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

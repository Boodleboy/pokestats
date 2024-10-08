import { useEffect, useState } from 'react'

const useUsageData = (options, setOptions) => {
  const [data, setData] = useState({ loading: true })
  useEffect(() => {
    setOptions({ ...options, loading: true })
    let fetchString = '/data/'
    const body = options.body
    if (body.graphMode === 'bar') {
      fetchString += 'byMonth/' + 
        body.gen + '/' +
        body.format + '/' +
        body.month + '/' +
        body.elo + '.json'
    } else {
      fetchString += 'byPokemon/' +
        body.gen + '/' +
        body.format + '/' +
        body.pokemon + '.json'
    }
    fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        setData({
          body: data
        });
        setOptions({ ...options, loading: false })
      })
      .catch((error) => {
        console.error('Error fetching the JSON data:', error);
        setData({
          error: error
        })
        setOptions({ ...options, loading: false })
      });
  }, [options.body]);

  return data
}

export default useUsageData

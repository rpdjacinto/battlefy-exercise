const API_BASE_URL = 'http://localhost:8080'

export const getMatchHistory = async (summonerName: String) => {
  const response = await fetch(
    `${API_BASE_URL}/summoners/${summonerName}/match-history`,
    {
      method: "GET"
    })
      .then((response) => response.json())
      .catch((error) => {
          console.error(error);
    })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
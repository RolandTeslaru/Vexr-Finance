import React, {useEffect, useState} from 'react'

const HighLowIndicator = ({currentPrice, high, low}: any) => {

  const [green, setGreen] = useState<number>(0)

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone))
    console.log("GREEN ZONEW", greenZone)
  }, [currentPrice, high, low])

  return (
    <div style={{width: "100%", height: "10px", marginTop: "auto", marginBottom: "auto",display: "flex", flexDirection: "row"}}>
        <span style={{backgroundColor: "red", content: "", height: "4px", borderRadius: "10px",
        display: "flex",
        width: `${100 - green}%`
      }}></span>
        <span style={{backgroundColor: "green", content: "", height: "4px", borderRadius: "10px",  display: "flex",
        width: `${green}%`
      }}></span>
    </div>
  )
}

export default HighLowIndicator
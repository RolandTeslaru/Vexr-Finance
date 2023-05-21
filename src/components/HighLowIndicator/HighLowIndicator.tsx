import React from 'react'

const HighLowIndicator = ({currentPrice, high, low}: any) => {
  return (
    <>
        <span style={{color: "red", content: "", height: "10px", borderRadius: "10px", }}></span>
        <span style={{color: "green", content: "", height: "10px", borderRadius: "10px", }}></span>
    </>
  )
}

export default HighLowIndicator
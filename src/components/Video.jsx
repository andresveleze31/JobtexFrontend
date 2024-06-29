import React from 'react'
import ReactPlayer from 'react-player/lazy'
function Video({url}) {
  return (
    <div className='w-full'>
        <ReactPlayer controls={true} height={"400px"} width={"750px"} url={url} />
    </div>
  )
}

export default Video

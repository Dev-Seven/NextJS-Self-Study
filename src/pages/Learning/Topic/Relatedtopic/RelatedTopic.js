import React from 'react'

// import Table from './Table'
import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const RelatedTopic = ({ topicById }) => {
  return (
    <div>
      <Table topicById={topicById} />
    </div>
  )
}

export default RelatedTopic

import QuestionsForms from '@/components/forms/QuestionsForms'
import React from 'react'

function AskAQuestions() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <QuestionsForms />
      </div>
    </>
  )
}

export default AskAQuestions

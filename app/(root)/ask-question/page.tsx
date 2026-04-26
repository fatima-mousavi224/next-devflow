import { auth } from '@/auth'
import QuestionsForms from '@/components/forms/QuestionsForms'
import { redirect } from 'next/navigation';


async function AskAQuestions() {
  const session = await auth();
  if(!session) return redirect('/sign-in')

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

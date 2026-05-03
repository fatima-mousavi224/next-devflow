import { auth } from '@/auth'
import QuestionsForms from '@/components/forms/QuestionsForms'
import ROUTES from '@/constants/routes';
import { getQuestion } from '@/lib/actions/question.action';
import { RouteParams } from '@/types/global';
import { notFound, redirect } from 'next/navigation';


async function EditQuestion({params}: RouteParams) {

    const {id} = await params;

    if(!id) return notFound();
  const session = await auth();
  if(!session) return redirect('/sign-in');

  const {data: question, success} = await getQuestion({questionId: id})
  if(!success) return notFound();

  if(question?.author.toString() !== session.user?.id) redirect(ROUTES.QUESTION(id))
  return (
    <main>
        <QuestionsForms question={question} isEdit/>
    </main>
  )
}

export default EditQuestion


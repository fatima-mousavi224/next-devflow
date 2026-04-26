import { RouteParams } from "@/types/global"

const QuestionDetails =async ({params}: RouteParams) =>  {
  const {id} = await params;

  return (
    <div>
      question datails page
    </div>
  )
}

export default QuestionDetails

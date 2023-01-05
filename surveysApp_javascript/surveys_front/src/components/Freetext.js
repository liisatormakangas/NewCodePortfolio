import { useSurveyContext } from '../contexts/SurveyContext.js';
 
const Freetext = () => {
    const { selectedSurvey } = useSurveyContext();
 
    const freetextQuestions = selectedSurvey.surveyTitle ?
        selectedSurvey.questions.filter(q => q.questionType === "freetext")
        : (null);    
 
    return (
        <>
            {selectedSurvey.surveyTitle ? freetextQuestions.map(q => {
                const answers = selectedSurvey.answers.map(answ => answ[q.questionId])

                return (
                    <div key={q.questionId} style={{ borderStyle: "solid", borderColor: "#227174", borderWidth: "2px", padding: "10px", marginBottom: "10px"}}>
                        <h5 className="m-3">{q.questionTitle}</h5>
                        {answers.map((ans, index) => {
                            return <ul key={index} style={{ listStylePosition: "inside", padding: "0 1em" }}><li>{ans}</li></ul>
                        })
                        }
                    </div>
                );
            })
            : (null)}
        </>
    )
}
 
export default Freetext;
 
 


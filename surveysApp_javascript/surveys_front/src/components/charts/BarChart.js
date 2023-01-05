import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useSurveyContext } from '../../contexts/SurveyContext.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {

    const { selectedSurvey } = useSurveyContext();

    const selectedQuestion = selectedSurvey.questions.filter(q => q.questionId === props.question);
    const type = selectedQuestion[0].questionType;

    let surveyAnswers = []
    type === "dropdown" ?
        surveyAnswers = selectedSurvey.answers.map(a => a[props.question])
        : surveyAnswers = selectedSurvey.answers.map(a => {
            if (a[props.question] !== undefined) {
                surveyAnswers = [...surveyAnswers, ...a[props.question]];
            }
            return surveyAnswers
        });

    let multipleChoiceAnswers = []
    if (type === "multiple-choice") {
        multipleChoiceAnswers = surveyAnswers.pop().filter(answ => answ !== null);
    }

    let answerLabels = []
    type === "dropdown" ? answerLabels = [...new Set(surveyAnswers)] : answerLabels = [...new Set(multipleChoiceAnswers)];

    let answerCounts = []
    type === "dropdown" ?
        answerCounts = answerLabels.map(label => {
            const filtered = surveyAnswers.filter(answer => answer === label);
            return filtered.length;
        })
        
        : answerCounts = answerLabels.map(label => {
            const filtered = multipleChoiceAnswers.filter(answer => answer === label);
            return filtered.length
        });

    const labels = answerLabels;

    const data = {
        labels,
        datasets: [
            {
                label: 'answers',
                data: answerCounts,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };
    return (
        <>
            <Bar data={data} />
        </>
    )
};

export default BarChart;
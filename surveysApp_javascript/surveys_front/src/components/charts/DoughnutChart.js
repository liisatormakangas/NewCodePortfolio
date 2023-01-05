import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSurveyContext } from '../../contexts/SurveyContext.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {

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

  const data = {
    labels: answerLabels,
    datasets: [
      {
        label: '# of Votes',
        data: answerCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.8)',
        ],
        borderWidth: 1
      },
    ],
  };
  return(
    <Doughnut data={data} />
  )
};

export default DoughnutChart;



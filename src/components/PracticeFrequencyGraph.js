import React from 'react';
import { Line } from 'react-chartjs-2';
import { auth, firestore } from '../utils/firebase';

const DAYS = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

function PracticeFrequencyGraph() {
  const [frequencyData, setFrequencyData] = React.useState();
  const [loading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFrequencyData = async () => {
      const ans = [];
      const frequencyDocs = await firestore
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('practice-frequency-per-day')
        .get();

      frequencyDocs.docs.map((doc) => ans.push([doc.id, doc.data().frequency]));
      let orderedFrequencyArray = orderDaysAscending(ans);
      setFrequencyData(orderedFrequencyArray);
      setIsLoading(false);
    };

    fetchFrequencyData();
  }, []);

  const orderDaysAscending = (unorderedArray) => {
    let temp = [];
    unorderedArray.map((elem) => temp.push([DAYS[elem[0]], elem[1]]));
    temp.sort();
    let onlyFrequencies = [];
    temp.map((elem) => onlyFrequencies.push(elem[1]));
    return onlyFrequencies;
  };

  const data = {
    labels: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    datasets: [
      {
        label: '# of flashcards practiced this week',
        data: frequencyData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const LineChart = () => (
    <>
      <div className='header'>
        <h1 className='title'>Line Chart</h1>
        <div className='links'></div>
      </div>
      <Line data={data} options={options} />
    </>
  );
  return (
    <>
      <div className='header'>
        <h1 className='title'>Line Chart</h1>
        <div className='links'></div>
      </div>
      {!loading ? (
        <Line data={data} options={options} width={20} height={8} />
      ) : null}
    </>
  );
}
export default PracticeFrequencyGraph;

const testData = [
  ['tuesday', 1],
  ['monday', 3],
  ['wednesday', 8],
  ['thursday', 2],
  ['friday', 5],
  ['saturday', 0],
  ['sunday', 1],
];
const test = [1, 3, 8, 2, 5, 0, 1];

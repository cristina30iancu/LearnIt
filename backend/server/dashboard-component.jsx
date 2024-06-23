import React, { useEffect, useState } from 'react';
import { Box, H3, Text } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Înregistrează toate elementele necesare pentru Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [averageScore, setAverageScore] = useState(0);
    const [mostFrequentQuiz, setMostFrequentQuiz] = useState('');
    const [quizData, setQuizData] = useState([]);

    const api = new ApiClient();

    useEffect(() => {
        const fetchData = async () => {
            // Preia numărul total de utilizatori
            const userResponse = await api.resourceAction({ resourceId: 'User', actionName: 'list' });
            setUserCount(userResponse.data.meta.total);

            // Preia toate scorurile
            const scoreResponse = await api.resourceAction({ resourceId: 'Score', actionName: 'list' });
            const scores = scoreResponse.data.records;
            const totalScores = scores.reduce((sum, record) => sum + record.params.score, 0);
            setAverageScore((totalScores / scores.length).toFixed(2));

            // Numără de câte ori a fost rezolvat fiecare quiz
            const quizCount = {};
            scores.forEach(score => {
                const quizId = score.params.quizId;
                if (quizCount[quizId]) {
                    quizCount[quizId]++;
                } else {
                    quizCount[quizId] = 1;
                }
            });

            // Identifică quiz-ul cel mai frecvent rezolvat
            const mostFrequentQuizId = Object.keys(quizCount).reduce((a, b) => quizCount[a] > quizCount[b] ? a : b, '');
            let arrayQuiz;
            if (mostFrequentQuizId) {
                arrayQuiz = await api.resourceAction({ resourceId: 'Quiz', actionName: 'list' });
                const mostFrequentQuizResponse = arrayQuiz.data.records.find(r => r.id == mostFrequentQuizId)?.title
                setMostFrequentQuiz(mostFrequentQuizResponse);
            }
            const quizDataArray = arrayQuiz.data.records.map(quiz => {
                return { subject: quiz.title, count: quizCount[quiz.id] };
            });
            setQuizData(quizDataArray);
        };

        fetchData();
    }, []);

    const chartData = {
        labels: quizData.map(data => data.subject),
        datasets: [
            {
                label: 'Număr de rezolvări',
                data: quizData.map(data => data.count),
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    };

    return (
        <Box variant="grey">
            <H3>Statistici</H3>
            <Box variant="white" p="xl">
                <Text>Număr total de utilizatori: {userCount}</Text>
                <Text>Media generală a scorurilor: {averageScore}</Text>
                <Text>Cel mai frecventat quiz rezolvat: {mostFrequentQuiz}</Text>
            </Box>
            <Box variant="white" p="xl" mt="xl">
                <Bar data={chartData} />
            </Box>
        </Box>
    );
};

export default Dashboard;

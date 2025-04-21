import {useState, useEffect} from 'react';
import {DatePicker, Row, Col, Typography, Spin} from 'antd';
import dayjs, {Dayjs} from 'dayjs';

import MemberSummaryCard from '../components/book/MemberSummaryCard';
import { getBooksPerUserByMonth } from '../services/book/getMemberBookService';

const {Title} = Typography;

const HomePage = () => {
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
    const [userSummaries, setUserSummaries] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchSummaries = async() => {
            setLoading(true);
            try {
            const summaries = await getBooksPerUserByMonth(selectedMonth);
            setUserSummaries(summaries);
            } catch (error) {
                console.log("멤버 요약 로딩 실패: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummaries();
    }, [selectedMonth]);

    return (
        <div>
            <Title level={2}></Title>
            <DatePicker 
                picker="month"
                value={selectedMonth}
                onChange={(date)=>date && setSelectedMonth(date)}
            />

            {loading ? (<Spin size="large"/>) :
            (
                <Row gutter={[16, 16]}>
                    {userSummaries.map((user)=>(
                        <Col span={6} key={user.userId}>
                            <MemberSummaryCard name={user.name} count={user.count}/>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    )

}

export default HomePage;
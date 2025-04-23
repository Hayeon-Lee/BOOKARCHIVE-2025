import { Typography } from 'antd';

const { Title } = Typography;

const Footer = () => {
  return (
    <div
      style={{
        background: '#577aaf',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Title level={5}>
        <span style={{ marginRight: 12 }}>
          관리자: papepopepe@naver.com / 01066075071
        </span>
      </Title>
    </div>
  );
};

export default Footer;

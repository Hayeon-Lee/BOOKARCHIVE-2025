import React, {useState} from 'react';
import requestPasswordReset from '../../services/auth/changePasswordService';
import AuthButton from '../../components/auth/AuthButton';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
    const [nickname, setNickname] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleRequest = async (e:React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await requestPasswordReset(nickname, newPassword);
            setSuccess(true);
            navigate("/information");
        } catch (err) {
            setError((err as Error).message);
            setSuccess(false);
        }
    }

    return (
        <form>
            <input 
                type="text"
                placeholder="오픈 채팅방 닉네임"
                value={nickname}
                required
                onChange={(e)=>setNickname(e.target.value)}
            />
            <input
                type="text"
                placeholder="바꿀 비밀번호"
                value={newPassword}
                required
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <AuthButton onClick={handleRequest} label="관리자에게 요청하기"/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default ChangePasswordPage;
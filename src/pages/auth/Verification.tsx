import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthBtn, BackBtn } from '../../components/buttons/ExportBtn';
import OtpInput from '../../components/inputs/OtpInput';
import { useDispatch, useSelector } from 'react-redux';
import { verifyLogin } from '../../redux/slice/authSlice';
import { Dispatch } from '../../redux/store';




const Verification = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<Dispatch>();
    
    const [otp, setOtp] = useState('');
    const [adminId, setAdminId] = useState<string | null>(null);
    
    const handleOtpChange = (val: string) => {
        setOtp(val);
    };
    
    const isButtonEnabled = otp.length === 4;

    useEffect(() => {
        const loginDataString = localStorage.getItem('loginData');
        if (loginDataString) {
            const loginData = JSON.parse(loginDataString);
            setAdminId(loginData.id);
        }
    }, []);


    const { status } = useSelector((state: any) => state.auth)


    const verifyOtp = async () => {
        dispatch(verifyLogin({otp, adminId}))
    }


  return (
    <div className='rounded-3xl shadow-lg bg-bgWhite p-[3rem] flex flex-col justify-center items-center gap-[1rem]'>
        <div className="flex gap-3 items-center">
            <img src="/frame.svg" alt="" className="" />
            <h1 className="text-5xl font-semibold">Two-Factor <br /> Authentication</h1>
        </div>

        <p className='text-lg text-[#000] text-center'>Check your email inbox for a 4-digit OTP. Enter it below</p>

        <div className="flex flex-col gap-1">
            <OtpInput className={`${status === 'failed' ? 'text-[crimson]' : 'text-[#026E78] '}`} onChange={handleOtpChange}/>
            <div className="flex items-center">
                { status === 'failed' &&
                <>
                     <span className='text-red-400'>Incorrect OTP</span>
                     {/* <span className="text-lg text-[#6922D1] cursor-pointer font-semibold flex ml-auto" onClick={verifyOtp}>Resend OTP</span> */}
                </>
                }
            </div>
        </div>

        <div className="flex justify-between w-full">
            <BackBtn onClick={() => navigate('/auth/login')} text='Go Back'/>

            <AuthBtn 
                loading={status}
                onClick={verifyOtp} 
                text={status === 'pending' ? 'Verifying...': 'Continue'}  
                disabled={!isButtonEnabled}/>
        </div>
    </div>
  )
}

export default Verification;
